import { Request, Response } from 'express'
import db from '../../db'
import type { Service } from './types'

const fetchServices = async (request: Request, response: Response) => {
    const serviceDocRef = db.collection('Service')

    const serviceDoc = await serviceDocRef.get()

    if (serviceDoc.empty) {
        return response.json({ services: [] })
    }

    const services: Service[] = []

    serviceDoc.forEach((doc) => {
        services.push({ id: doc.id, ...(doc.data() as Service) })
    })

    return response.json({ services })
}

export default fetchServices
