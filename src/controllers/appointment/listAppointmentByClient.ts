import { Request, Response } from 'express'
import db from '../../db'
import type { Appointment } from './types'

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

    const appointmentDoc = await appointmentDocRef.get()

    if (appointmentDoc.empty || !appointmentDoc.docs.length) {
        return response.json({ barbers: [] })
    }

    const appointments = appointmentDoc.docs.map((appointment, index) => {
        const { barberId, clientId, serviceId, ...appointmentData } =
            appointment.data() as Appointment

        return {
            ...appointmentData,
            id: appointmentDoc.docs[index].id,
        }
    })

    return response.json({ appointments })
}

export default listAppointmentByClient
