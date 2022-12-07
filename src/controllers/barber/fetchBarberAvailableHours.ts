import { Request, Response } from 'express'
import db from '../../db'
import type { Appointment } from './types'
import { availableHours } from './constants'
import { formatISO } from 'date-fns'

const fetchBarbersByService = async (request: Request, response: Response) => {
    const { id, day } = request.params
    let hour = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    })
    const now = formatISO(new Date(), {
        representation: 'date',
    })

    if (day > now) {
        hour = '00:00'
    }

    const appointmentDocRef = db
        .collection('Appointment')
        .where('barberId', '==', id)
        .where('serviceStatus', '==', 'WAITING')
        .where('date', '==', day)
        .where('startTime', '>=', hour)

    const appointmentDoc = await appointmentDocRef.get()

    if (appointmentDoc.empty || !appointmentDoc.docs.length) {
        if (day > now) {
            return response.json({
                hours: availableHours,
            })
        }

        return response.json({
            hours: availableHours.filter(
                (availableHour) => availableHour > hour
            ),
        })
    }

    const responseHours = availableHours

    appointmentDoc.docs.map((doc) => {
        const appointmentData = doc.data() as Appointment

        const startWindow = availableHours.findIndex(
            (hour) => hour === appointmentData.startTime
        )

        const endWindow = availableHours.findIndex(
            (hour) => hour === appointmentData.endTime
        )

        if (startWindow > -1 && endWindow > -1) {
            const numberToDelete = endWindow + 1 - startWindow

            responseHours.splice(startWindow, numberToDelete)
        }
    })

    return response.json({
        hours: responseHours.filter((availableHour) => availableHour > hour),
    })
}

export default fetchBarbersByService
