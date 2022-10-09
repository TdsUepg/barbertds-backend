import { Router } from 'express'
import clientController from '../controllers/client'

const clientRouter = Router()

clientRouter.post('/', clientController.createClient)

export default clientRouter
