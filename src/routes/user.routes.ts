import { Router } from 'express'
import userResolver from '../resolvers/user'

const userRouter = Router()

userRouter.post('/', userResolver.createUser)

userRouter.get('/', userResolver.authUser)

export default userRouter
