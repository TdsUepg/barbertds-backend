import * as express from 'express'
import md5 from 'md5'
import db from '../../db'
import * as Types from './types'

const createClient = async (
    request: express.Request,
    response: express.Response
) => {
    try {
        const client: Types.ClientRequest = request.body
        const cryptoPassword = client.password.concat(process.env.CRYPTO_KEY)

        const clientDocRef = db.collection('Cliente').doc(client.cpf)

        const clientDoc = await clientDocRef.get()

        if (clientDoc.exists) {
            throw new Error('Client already exists')
        }

        const userDocRef = db.collection('Usuario').doc(client.email)

        const userDoc = await userDocRef.get()

        if (userDoc.exists) {
            throw new Error('User already exists')
        }

        await userDocRef.set({
            email: client.email,
            password: md5(cryptoPassword),
        })

        await clientDocRef.set({
            firstName: client.firstName,
            lastName: client.lastName,
            cpf: client.cpf,
            email: client.email,
        })

        response.json(true)
    } catch (error) {
        return response.status(400).json({
            errorType: error.type,
            message: error.message,
        })
    }
}

export default createClient
