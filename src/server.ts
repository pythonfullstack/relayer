import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { Constants } from './utils'
import { v1 } from './v1'
import { handleError } from './v1/middlewares/errorHandlers'
import { allowFromAnywhere } from './v1/middlewares/cors'

const healthStatus = (req: Request, res: Response, next: NextFunction) => {
    try {
        const status: 'HEALTHY' | 'UNHEALTHY' = 'HEALTHY'
        res.send({
            context: Constants.AppConfig.server.context,
            env: Constants.AppConfig.server.env,
            status,
        })
    } catch (err) {
        next(err)
    }
}

const limiter = rateLimit({
    windowMs: 60000, // one minute window
    max: 20, // 20 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Sorry we cannot process your request right now' },
})

const app = express()

app.set('port', Constants.AppConfig.server.port)
app.set('env', Constants.AppConfig.server.env)
app.set('url', Constants.AppConfig.server.url)

// 1.Body Parser
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === 'specific URL') {
        next()
    } else {
        express.json({ limit: '10mb' })(req, res, next)
    }
})

// 2. Cookie Parser
app.use(cookieParser())

// 2. Cors
app.use(allowFromAnywhere())

app.use('/relayer/v1', limiter)
app.use('/relayer/v1', v1)

app.use('/health', healthStatus)

// UNHANDLED ROUTES
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
        error: 'Invalid Not Found',
    })
})

app.use(handleError)

export default app
