import { Response, Request, NextFunction } from 'express'
import { logger } from '../../utils/logger'

export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('err.message', err.message)
    if (err.message) logger.error(err.message)
    if (err.responseMessage) logger.error(err.responseMessage)
    if (err.processMessage) logger.error(err.processMessage)

    if (!err.statusCode) {
        const str = err.stack?.toString()
        const idx = str?.indexOf('\n')
        err.statusCode = 500
        err.responseMessage = str?.substr(0, idx) || err.responseMessage
        err.responseMessage = err.message
    }

    res.status(err.statusCode).send({
        message: err.responseMessage,
        data: err.data,
    })
}
