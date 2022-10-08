import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
    console.log(`[${request.method}] - ${request.url}`)
    next()
})

app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    console.log('Erro', err)
    if (err) {
        return response.status(500).json({
            status: 'error',
            message: err.message,
        })
    }

    return response.status(500).json({
        static: 'error',
        message: 'Erro interno.',
    })
})

app.listen(process.env.PORT, () => {
    return console.log(
        `Server is listening at http://localhost:${process.env.PORT}`
    )
})
