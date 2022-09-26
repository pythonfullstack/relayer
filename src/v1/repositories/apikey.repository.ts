import { APIKey, PrismaClient } from '@prisma/client'
import { ApplicationProcessError } from '../../classes/errorHandlers'
import { generateRandomString } from '../../helper/string.helper'
const prisma = new PrismaClient()

export const getAllUserAPIKeys = async (userId: string): Promise<Array<APIKey> | null> => {
    return await prisma.aPIKey.findMany({ where: { userId } })
}

export const createUserAPIKey = async (userId: string): Promise<APIKey | null> => {
    const key = generateRandomString()
    return await prisma.aPIKey.create({ data: { userId, key } })
}

export const revokeUserAPIKey = async (userId: string, key: string) => {
    const apiKey = await prisma.aPIKey.findUnique({
        where: { key },
        include: { user: true },
    })
    if (!apiKey) throw new ApplicationProcessError("APIkey doesn't exist", 404)
    if (apiKey.user?.id !== userId)
        throw new ApplicationProcessError('You are not authorized to revoke this APIKey', 403)
    return await prisma.aPIKey.update({ where: { id: apiKey.id }, data: { revoked: true } })
}
