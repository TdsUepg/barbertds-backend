import { Request, Response } from 'express'
import db from '../../db'
import type { CreateServiceRequest } from './types'

const createService = async (request: Request, response: Response) => {
    const { user, ...service }: CreateServiceRequest = request.body

    const serviceDocRef = db.collection('Service')

    const newService = await serviceDocRef.add({ ...service })

    const barberServiceDocRef = db.collection('Barber_has_Service')

    await barberServiceDocRef.add({
        serviceId: newService.id,
        barberId: user.id,
    })

    return response.json({ result: true })
}

export default createService
