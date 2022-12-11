import { Request, Response } from 'express'
import db from '../../db'
import AppError from '../../errors/AppError'
import type { Service } from './types'

const updateService = async (request: Request, response: Response) => {
    const { id } = request.params
    const { id: serviceId, user, ...serviceRequest }: Service = request.body

    const serviceDocRef = db.collection('Service').doc(id)

    const serviceDoc = await serviceDocRef.get()

    if (!serviceDoc.exists) {
        throw new AppError('Service does not exists')
    }

    await serviceDocRef.update(serviceRequest)

    return response.json({ result: true })
}

export default updateService
