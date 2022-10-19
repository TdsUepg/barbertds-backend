import { Request, Response } from 'express'
import db from '../../db'
import type { Service } from './types'

const fetchServices = async (request: Request, response: Response) => {
    const serviceDocRef = db.collection('Service')

    const serviceDoc = await serviceDocRef.get()

    if (serviceDoc.empty) {
        response.json({ services: [] })
    }

    const services: Service[] = []

    serviceDoc.forEach((doc) => {
        services.push(doc.data() as Service)
    })

    response.json({ services })
}

export default fetchServices
