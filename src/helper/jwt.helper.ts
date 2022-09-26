import jwt from 'jsonwebtoken'
import { Constants } from '../utils'
import { ApplicationProcessError } from '../classes/errorHandlers'
import { User } from '@prisma/client'

export const createAccessToken = (userData: User): string => {
    return jwt.sign({ ...userData }, Constants.AppConfig.server.jwtSecret, {
        expiresIn: Constants.AppConfig.server.jwtAccessTokenExpiry || '5m',
    })
}

export const createRefreshToken = (data: any) => {
    return jwt.sign({ ...data }, Constants.AppConfig.server.jwtSecret, {
        expiresIn: Constants.AppConfig.server.jwtRefreshTokenExpiry || '10d',
    })
}

export const verifyJWT = (token: string): any => {
    try {
        const userPayload = jwt.verify(token, Constants.AppConfig.server.jwtSecret)
        return userPayload
    } catch (error: any) {
        if (error.message === 'jwt expired') {
            throw new ApplicationProcessError('Token has been expired.', 401)
        } else {
            throw new ApplicationProcessError(
                'Oops!, Something went wrong on our end. Please login again.',
                401,
                error.message,
            )
        }
    }
}
