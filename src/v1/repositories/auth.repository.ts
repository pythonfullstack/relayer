import { PrismaClient, User } from '@prisma/client'
import { createRefreshToken } from '../../helper/jwt.helper'
import { v4 as uuid } from 'uuid'
import { ApplicationProcessError } from '../../classes/errorHandlers'
const prisma = new PrismaClient()

export const addRefreshTokenToUser = async (user: User): Promise<string> => {
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } })
    const jti = uuid()
    const hashedToken = createRefreshToken({ user, jti })
    const refreshToken = await prisma.refreshToken.create({ data: { id: jti, hashedToken, userId: user.id } })
    return refreshToken.hashedToken
}

export const checkRefreshToken = async (jti: string) => {
    const tokenData = await prisma.refreshToken.findUnique({
        where: { id: jti },
        select: { user: true, revoked: true },
    })
    if (!tokenData) throw new ApplicationProcessError('Please SignIn Again', 404)
    if (tokenData && tokenData.revoked) {
        throw new ApplicationProcessError('Token has been revoked.', 404)
    }
}
