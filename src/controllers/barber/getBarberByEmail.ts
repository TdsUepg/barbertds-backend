import { Request, Response } from 'express'
import db from '../../db'
import AppError from '../../errors/AppError'

const getBarberByEmail = async (request: Request, response: Response) => {
    const { id: email } = request.params

    if (email) {
        const barberDocRef = db.collection('Barber')

        const barberDoc = await barberDocRef.where('email', '==', email).get()

        if (barberDoc.empty) {
            throw new AppError('Barber does not exists')
        }

        response.json({
            ...barberDoc.docs[0].data(),
            id: barberDoc.docs[0].id,
        })
    }
}

export default getBarberByEmail
