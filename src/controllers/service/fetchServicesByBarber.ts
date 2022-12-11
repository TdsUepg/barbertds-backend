import { Request, Response } from 'express'
import db from '../../db'
import type { Service } from './types'

const fetchServicesByBarber = async (request: Request, response: Response) => {
    const { barberId } = request.params

    const serviceDocRef = db
        .collection('Barber_has_Service')
        .where('barberId', '==', barberId)

    const serviceDoc = await serviceDocRef.get()

    if (serviceDoc.empty) {
        return response.json({ services: [] })
    }

    const promises = []

    serviceDoc.forEach((doc) => {
        const { serviceId } = doc.data()

        promises.push(serviceId)
    })

    const serviceDocs = await Promise.all(
        promises.map((promise) => db.collection('Service').doc(promise).get())
    )

    const services = []

    serviceDocs.forEach((doc) => {
        services.push({ id: doc.id, ...(doc.data() as Service) })
    })

    return response.json({ services })
}

export default fetchServicesByBarber
