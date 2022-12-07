import { Router } from 'express'
import barberController from '../controllers/barber'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const barberRouter = Router()

barberRouter.post('/', ensureAuthenticated, barberController.createBarber)

barberRouter.get('/:id', barberController.getBarberByEmail)

barberRouter.get(
    '/service/:id',
    ensureAuthenticated,
    barberController.fetchBarbersByService
)

barberRouter.get(
    '/:id/day/:day/hours',
    ensureAuthenticated,
    barberController.fetchBarberAvailableHours
)

export default barberRouter
