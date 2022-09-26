import bcrypt from 'bcryptjs'
import { getUserByEmail } from '../repositories/user.repository'
import { ApplicationProcessError } from '../../classes/errorHandlers'
import { createAccessToken, verifyJWT } from '../../helper/jwt.helper'
import { addRefreshTokenToUser, checkRefreshToken } from '../repositories/auth.repository'

export class AuthenticationService {
    userSignIn = async (email: string, password: string) => {
        const user = await getUserByEmail(email)
        if (!user) {
            throw new ApplicationProcessError('The email is not registered yet.', 404)
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new ApplicationProcessError("Email and Password doesn't match", 400)
        }

        const accessToken = createAccessToken(user)
        const refreshToken = await addRefreshTokenToUser(user)
        return { accessToken, refreshToken }
    }

    recreateAccessToken = async (refreshToken: string): Promise<string> => {
        const { user, jti } = verifyJWT(refreshToken)
        await checkRefreshToken(jti)

        const token = createAccessToken(user)
        return token
    }
}
