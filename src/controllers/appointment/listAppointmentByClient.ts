import { Request, Response } from 'express'
import db from '../../db'
import type { Appointment } from './types'

async function getServiceAppointment(serviceId: string, appointmentId: string) {
    const service = await db.collection('Service').doc(serviceId).get()

    const serviceData = service.data()

    return { service: serviceData, appointmentId }
}

const listAppointmentByClient = async (
    request: Request,
    response: Response
) => {
    const { id: email } = request.params

    const clientDoc = await db
        .collection('Client')
        .where('email', '==', email)
        .get()

    const appointmentDocRef = db
        .collection('Appointment')
        .where('clientId', '==', clientDoc.docs[0].id)
        .where('serviceStatus', '==', 'WAITING')

    const appointmentDoc = await appointmentDocRef.get()

    if (appointmentDoc.empty || !appointmentDoc.docs.length) {
        return response.json({ barbers: [] })
    }

    const serviceDocsPromises = appointmentDoc.docs.map((appointment) => {
        const { serviceId } = appointment.data() as Appointment

        return getServiceAppointment(serviceId, appointment.id)
    })

    const services = await Promise.all(serviceDocsPromises)

    const appointments = appointmentDoc.docs.map((appointment, index) => {
        const { barberId, clientId, serviceId, ...appointmentData } =
            appointment.data() as Appointment

        const { appointmentId, ...serviceData } = services.find(
            (service) => service.appointmentId === appointment.id
        )

        return {
            ...appointmentData,
            service: serviceData.service,
            id: appointmentDoc.docs[index].id,
        }
    })

    return response.json({ appointments })
}

export default listAppointmentByClient
