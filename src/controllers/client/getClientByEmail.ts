import { Request, Response } from 'express'
import db from '../../db'
import AppError from '../../errors/AppError'

const getClientByEmail = async (request: Request, response: Response) => {
    const { id: email } = request.params

    if (email) {
        const clientDocRef = db.collection('Client')

        const clientDoc = await clientDocRef.where('email', '==', email).get()

        if (clientDoc.empty) {
            throw new AppError('Client does not exists')
        }

        response.json({
            ...clientDoc.docs[0].data(),
            id: clientDoc.docs[0].id,
        })
    }
}

export default getClientByEmail
