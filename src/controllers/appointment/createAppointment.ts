import { Request, Response } from 'express'
import db from '../../db'
import AppError from '../../errors/AppError'
import * as Types from './types'

const createAppointment = async (request: Request, response: Response) => {
    const appointment: Types.AppointmentRequest = request.body
    const { client, barber, service, user, ...appointmentData } = appointment

    const clientDocRef = db.collection('Client').doc(client.id)

    const barberDocRef = db.collection('Barber').doc(barber.id)

    const serviceDocRef = db.collection('Service').doc(service.id)

    const [clientDoc, barberDoc, serviceDoc] = await Promise.all([
        clientDocRef.get(),
        barberDocRef.get(),
        serviceDocRef.get(),
    ])

    if (!clientDoc.exists || !barberDoc.exists || !serviceDoc.exists) {
        throw new AppError('Client, Barber or Service does not exists')
    }

    const appoinmentDocRef = db.collection('Appointment')

    const appointmentWindow = await appoinmentDocRef
        .where('date', '==', appointmentData.date)
        .where('startTime', '>=', appointmentData.startTime)
        .where('startTime', '<=', appointmentData.endTime)
        .where('barberId', '==', barber.id)
        .get()

    if (appointmentWindow.empty) {
        const newAppointment = {
            ...appointmentData,
            serviceId: service.id,
            barberId: barber.id,
            clientId: client.id,
            serviceStatus: Types.ServiceStatus.WAITING,
        }

        await appoinmentDocRef.add(newAppointment)

        return response.json(newAppointment)
    }

    throw new AppError('Appointment hour already taken')
}

export default createAppointment
