import { ApplicationProcessError } from '../../classes/errorHandlers'
import { isUserRevoked } from '../repositories/user.repository'
import { createUserAPIKey, revokeUserAPIKey } from '../repositories/apikey.repository'

export class APIKeyService {
    private canUserCreateAPIKey = async (userId: string): Promise<boolean> => {
        return !(await isUserRevoked(userId))
    }
    createAPIKey = async (userId: string) => {
        if (await this.canUserCreateAPIKey(userId)) return await createUserAPIKey(userId)
        else throw new ApplicationProcessError('You are not allowed to create API key.', 403)
    }

    revokeAPIKey = async (userId: string, key: string) => {
        if (await this.canUserCreateAPIKey(userId)) return await revokeUserAPIKey(userId, key)
        else throw new ApplicationProcessError('You are not allowed to revoke API key.', 403)
    }
}
