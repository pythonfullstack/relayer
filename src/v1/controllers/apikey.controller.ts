import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { getAllUserAPIKeys } from '../repositories/apikey.repository'
import { createUserAPIKey, revokeUserAPIKey } from '../repositories/apikey.repository'

export const getAPIKeys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = res.locals.user
        const allUserAPIKeys = await getAllUserAPIKeys(user.id)
        res.status(200).json({ data: allUserAPIKeys })
    } catch (err) {
        next(err)
    }
}

export const createAPIKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = res.locals.user
        const key = await createUserAPIKey(user.id)
        res.status(201).json({
            message: 'The API Key has been successfully created.',
            data: key,
        })
    } catch (err) {
        next(err)
    }
}

export const revokeAPIKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = res.locals.user
        const { apiKey } = req.body
        const key = await revokeUserAPIKey(user.id, apiKey)
        res.status(202).json({
            message: 'The API Key has been revoked.',
        })
    } catch (err) {
        next(err)
    }
}
