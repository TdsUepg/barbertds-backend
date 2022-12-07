import { Request, Response } from 'express'
import db from '../../db'
import AppError from '../../errors/AppError'

const updateAppointment = async (request: Request, response: Response) => {
    const { id } = request.params

    const appoinmentDocRef = db.collection('Appointment').doc(id)

    const appointmentDoc = await appoinmentDocRef.get()

    if (!appointmentDoc.exists) {
        throw new AppError('Client, Barber or Service does not exists')
    }

    await appoinmentDocRef.update({
        serviceStatus: 'ATTENDED',
    })

    return response.json({ result: true })
}

export default updateAppointment
