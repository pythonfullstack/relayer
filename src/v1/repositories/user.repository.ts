import { PrismaClient, Prisma, User, Wallet } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { TUserWallet } from '../../types/local-types'
const prisma = new PrismaClient()

export const getUserByEmail = async (email: string, withWallet: Boolean = false): Promise<TUserWallet | null> => {
    const include = withWallet ? { wallet: true } : { wallet: false }
    return await prisma.user.findUnique({ where: { email }, include })
}

export const getOrCreateUser = async (
    email: string,
    password: string,
): Promise<{
    user: User
    isCreated: boolean
}> => {
    let user
    user = await getUserByEmail(email)
    if (user) return { user, isCreated: false }

    user = await createUser(email, password)
    return { user, isCreated: true }
}

export const createUser = async (email: string, password: string): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 12)
    const walletId = await createWallet()
    const user = await prisma.user.create({ data: { email, password: hashedPassword, walletId } })
    return user
}
export const updateUser = async (data: any) => {}

export const isUserRevoked = async (userId: string): Promise<boolean> => {
    const tokens = await prisma.refreshToken.findFirst({ where: { userId }, select: { revoked: true } })
    return !!tokens?.revoked
}

const createWallet = async (): Promise<string> => {
    const wallet = await prisma.wallet.create({ data: {} })
    return wallet.id
}
