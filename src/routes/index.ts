import { Router } from 'express'
import appointmentRouter from './appointment.routes'
import barberRouter from './barber.routes'
import clientRouter from './client.routes'
import serviceRouter from './service.routes'
import userRouter from './user.routes'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/client', clientRouter)
routes.use('/service', serviceRouter)
routes.use('/barber', barberRouter)
routes.use('/appointment', appointmentRouter)

export default routes
