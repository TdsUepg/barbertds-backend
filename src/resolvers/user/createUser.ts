import * as express from 'express'
import md5 from 'md5'
import db from '../../db'

const createUser = async (
    request: express.Request,
    response: express.Response
) => {
    try {
        const { email, password } = request.body

        if (email) {
            const docRef = db.collection('Usuario').doc(email)

            await docRef.set({
                email,
                password: md5(password),
            })
        }

        response.send(email)
    } catch (error) {
        response.send(error)
    }
}

export default createUser
