import { getOrCreateUser } from '../repositories/user.repository'
import { ApplicationProcessError } from '../../classes/errorHandlers'

import { TCreateUserInput } from 'v1/schema/user.schema'
import { User } from '@prisma/client'

export const createUserAccount = async (account: TCreateUserInput): Promise<User> => {
    const { email, password } = account
    const { user, isCreated } = await getOrCreateUser(email, password)
    if (!isCreated) throw new ApplicationProcessError('The email is already in use', 400)
    return user
}
