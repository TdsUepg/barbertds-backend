import { Router } from 'express'
import clientRouter from './client.routes'
import serviceRouter from './service.routes'
import userRouter from './user.routes'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/client', clientRouter)
routes.use('/service', serviceRouter)

export default routes
