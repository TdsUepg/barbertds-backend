import { Router } from 'express'
import clientRouter from './client.routes'
import userRouter from './user.routes'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/client', clientRouter)

export default routes
