import { Router } from 'express'
import barberController from '../controllers/barber'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const barberRouter = Router()

barberRouter.get(
    '/service/:id',
    ensureAuthenticated,
    barberController.fetchBarbersByService
)

export default barberRouter
