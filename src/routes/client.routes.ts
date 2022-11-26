import { Router } from 'express'
import clientController from '../controllers/client'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const clientRouter = Router()

clientRouter.get('/:id', ensureAuthenticated, clientController.getClientByEmail)
clientRouter.post('/', clientController.createClient)

export default clientRouter
