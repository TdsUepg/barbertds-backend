import { Router } from 'express'
import serviceController from '../controllers/service'

const serviceRouter = Router()

serviceRouter.get('/', serviceController.fetchServices)

export default serviceRouter
