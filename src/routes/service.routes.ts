import { Router } from 'express'
import serviceController from '../controllers/service'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const serviceRouter = Router()

serviceRouter.get('/', ensureAuthenticated, serviceController.fetchServices)

export default serviceRouter
