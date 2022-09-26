import { User } from '@prisma/client'
import { Request, Response, NextFunction, response } from 'express'
import { verifyJWT } from '../../helper/jwt.helper'

export const verifyJWTToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearer = req.headers['authorization']
        if (bearer) {
            const components = bearer?.split(' ')
            if (components[0] != 'Bearer') {
                res.status(403).json({ message: 'Invalid authorization details' })
            } else {
                const token = components[1]
                const user: User = verifyJWT(token)
                res.locals.user = user
                next()
            }
        } else {
            res.status(401).json({ message: 'Invalid authorization details' })
        }
    } catch (error) {
        next(error)
    }
}
