import { Request, Response } from 'express'
import db from '../../db'
import type { Appointment } from './types'

const listAppointmentByBarber = async (
    request: Request,
    response: Response
) => {
    const { id: email, day } = request.params

    const barberDoc = await db
        .collection('Barber')
        .where('email', '==', email)
        .get()

    const appointmentDocRef = db
        .collection('Appointment')
        .where('barberId', '==', barberDoc.docs[0].id)
        .where('date', '==', day)
        .where('serviceStatus', '==', 'WAITING')

    const appointmentDoc = await appointmentDocRef.get()

    if (appointmentDoc.empty || !appointmentDoc.docs.length) {
        return response.json({ appointments: [] })
    }

    const appointments = appointmentDoc.docs.map((appointment, index) => {
        const { clientId, barberId, serviceId, ...appointmentData } =
            appointment.data() as Appointment

        return {
            ...appointmentData,
            id: appointmentDoc.docs[index].id,
        }
    })

    return response.json({ appointments })
}

export default listAppointmentByBarber
