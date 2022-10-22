import { Router } from 'express'
import barberController from '../controllers/barber'

const barberRouter = Router()

barberRouter.get('/service/:id', barberController.fetchBarbersByService)

export default barberRouter
