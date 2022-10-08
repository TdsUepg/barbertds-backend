import * as express from 'express'
import md5 from 'md5'
import db from '../../db'
import * as Types from './types'

const createUser = async (
    request: express.Request,
    response: express.Response
) => {
    try {
        const { email, password }: Types.CreateUserRequestBody = request.body

        if (email) {
            const docRef = db.collection('Usuario').doc(email)
            const cryptoPassword = password.concat(process.env.CRYPTO_KEY)

            await docRef.set({
                email,
                password: md5(cryptoPassword),
            })
        }

        response.json(email)
    } catch (error) {
        response.send(error)
    }
}

export default createUser
