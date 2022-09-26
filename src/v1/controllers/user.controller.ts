import type { NextFunction, Request, Response } from 'express'
import { getUserByEmail } from '../repositories/user.repository'
import { TCreateUserInput } from '..//schema/user.schema'
import { createUserAccount } from '../services/user.service'
import { ApplicationProcessError } from '../../classes/errorHandlers'

export const createUser = async (req: Request<{}, {}, TCreateUserInput>, res: Response, next: NextFunction) => {
    try {
        const user = await createUserAccount(req.body)
        res.status(201).json({
            message: 'Account successfully created',
            data: {
                id: user.id,
                email: user.email,
            },
        })
    } catch (err) {
        next(err)
    }
}

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserByEmail(res.locals.user.email, true)
        console.log('user', user?.wallet?.id)
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            res.status(200).json({
                data: {
                    id: user.id,
                    email: user.email,
                    wallet: {
                        id: user.wallet?.id,
                        ethereum: user.wallet?.ethereum,
                    },
                },
            })
        }
    } catch (err) {
        next(err)
    }
}
