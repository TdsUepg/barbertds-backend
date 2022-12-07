import { Router } from 'express'
import appointmentController from '../controllers/appointment'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentRouter = Router()

appointmentRouter.post(
    '/',
    ensureAuthenticated,
    appointmentController.createAppointment
)

appointmentRouter.put(
    '/:id',
    ensureAuthenticated,
    appointmentController.updateAppointment
)

appointmentRouter.get(
    '/client/:id',
    ensureAuthenticated,
    appointmentController.listAppointmentByClient
)

appointmentRouter.get(
    '/barber/:id/day/:day',
    ensureAuthenticated,
    appointmentController.listAppointmentByBarber
)

export default appointmentRouter
