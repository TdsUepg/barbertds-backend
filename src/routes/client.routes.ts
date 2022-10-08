import { Router } from 'express'
import clientResolver from '../resolvers/client'

const clientRouter = Router()

clientRouter.post('/', clientResolver.createClient)

export default clientRouter
