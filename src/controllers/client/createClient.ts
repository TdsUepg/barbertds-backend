import { Request, Response } from 'express'
import { hash } from 'bcryptjs'
import db from '../../db'
import AppError from '../../errors/AppError'
import * as Types from './types'

const createClient = async (request: Request, response: Response) => {
    const client: Types.ClientRequest = request.body

    const clientDocRef = db.collection('Client').doc(client.cpf)

    const clientDoc = await clientDocRef.get()

    if (clientDoc.exists) {
        throw new AppError('Client already exists')
    }

    const userDocRef = db.collection('User').doc(client.email)

    const userDoc = await userDocRef.get()

    if (userDoc.exists) {
        throw new AppError('User already exists')
    }

    const hashedPassword = await hash(client.password, 9)

    await userDocRef.set({
        email: client.email,
        password: hashedPassword,
    })

    const { password: _, ...clientWithoutPassword } = client

    await clientDocRef.set({
        ...clientWithoutPassword,
    })

    return response.json(clientWithoutPassword)
}

export default createClient
