import { Router } from 'express'
import serviceController from '../controllers/service'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const serviceRouter = Router()

serviceRouter.post('/', ensureAuthenticated, serviceController.createService)

serviceRouter.put('/:id', ensureAuthenticated, serviceController.updateService)

serviceRouter.get('/', ensureAuthenticated, serviceController.fetchServices)

serviceRouter.get(
    '/barber/:barberId',
    ensureAuthenticated,
    serviceController.fetchServicesByBarber
)

export default serviceRouter
