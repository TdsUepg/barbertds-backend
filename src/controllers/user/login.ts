import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import authConfig from '../../config/auth'
import db from '../../db'
import AppError from '../../errors/AppError'
import { Client, Barber, LoginRequest, isBarber } from './types'

const login = async (request: Request, response: Response) => {
    const { email, password }: LoginRequest = request.body
    let role = 'client'

    const userDocRef = db.collection('User').doc(email)
    const userDoc = await userDocRef.get()
    const userData = userDoc.data()

    if (!userDoc.exists || !userData.password) {
        throw new AppError('Incorrect email/password')
    }

    const passwordMatched = await compare(password, userData.password)

    if (!passwordMatched) {
        throw new AppError('Incorrect email/password')
    }

    let docRef = await db.collection('Client').where('email', '==', email).get()

    if (docRef.empty) {
        docRef = await db.collection('Barber').where('email', '==', email).get()

        role = 'barber'
    }

    const userId = docRef.docs[0].id
    const loginUserDoc = docRef.docs[0].data() as Client | Barber

    if (isBarber(loginUserDoc) && !loginUserDoc.accessAuthorization) {
        throw new AppError('Not authorized user')
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ id: userId, role }, secret, {
        subject: userId,
        expiresIn,
    })

    response.json({
        user: loginUserDoc,
        token,
        role,
    })
}

export default login
