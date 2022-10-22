import { Request, Response } from 'express'
import db from '../../db'
import type { Barber, BarberDocuments } from './types'

const fetchBarbersByService = async (request: Request, response: Response) => {
    const { id } = request.params

    const barberServiceDocRef = db
        .collection('Barber_has_Service')
        .where('serviceId', '==', id)

    const barberServiceDoc = await barberServiceDocRef.get()

    if (barberServiceDoc.empty || !barberServiceDoc.docs.length) {
        return response.json({ barbers: [] })
    }

    const barberPromises: Promise<unknown>[] = []

    barberServiceDoc.forEach((doc) => {
        const barberId = doc.data().barberId

        const barberDoc = db.collection('Barber').doc(barberId).get()

        barberPromises.push(barberDoc)
    })

    const barberDocs = (await Promise.all(barberPromises)) as BarberDocuments[]

    const barbers = barberDocs.map((barber) => {
        const {
            accessAuthorization,
            cpf,
            email,
            cellPhone: _,
            ...toSendbarber
        } = barber.data() as Barber

        return { id: barber.id, ...toSendbarber }
    })

    return response.json({ barbers })
}

export default fetchBarbersByService
