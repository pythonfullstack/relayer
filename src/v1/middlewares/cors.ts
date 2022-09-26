import cors from 'cors'
import type { RequestHandler } from 'express'

export const allowFromAnywhere = (): RequestHandler => {
    return cors()
}
