import { Request, Response } from 'express'
import { hash } from 'bcryptjs'
import db from '../../db'
import AppError from '../../errors/AppError'
import * as Types from './types'

const createClient = async (request: Request, response: Response) => {
    const barber: Types.BarberRequest = request.body

    const barberDocRef = db
        .collection('Barber')
        .where('email', '==', barber.email)

    const barberDoc = await barberDocRef.get()

    if (!barberDoc.empty) {
        throw new AppError('Barber already exists')
    }

    const userDocRef = db.collection('User').doc(barber.email)

    const userDoc = await userDocRef.get()

    if (userDoc.exists) {
        throw new AppError('User already exists')
    }

    const hashedPassword = await hash(barber.password, 9)

    await userDocRef.set({
        email: barber.email,
        password: hashedPassword,
    })

    const { password: _, user: __, ...barberWithoutPassword } = barber

    const newBarberDocRef = db.collection('Barber').doc()

    await newBarberDocRef.set({
        ...barberWithoutPassword,
        accessAuthorization: true,
    })

    return response.json(barberWithoutPassword)
}

export default createClient
