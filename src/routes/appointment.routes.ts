import { Router } from 'express'
import appointmentController from '../controllers/appointment'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentRouter = Router()

appointmentRouter.post(
    '/',
    ensureAuthenticated,
    appointmentController.createAppointment
)
appointmentRouter.get(
    '/client/:id',
    ensureAuthenticated,
    appointmentController.listAppointmentByClient
)

export default appointmentRouter
