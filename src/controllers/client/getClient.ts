import { Request, Response } from 'express'
import db from '../../db'
import AppError from '../../errors/AppError'
import * as Types from './types'

const getClient = async (request: Request, response: Response) => {
    const client: Types.ClientRequest = request.body

    const clientDocRef = db.collection('Client').doc(client.cpf)

    const clientDoc = await clientDocRef.get()

    if (!clientDoc.exists) {
        throw new AppError('Client does not exists')
    }
}

export default getClient
