import { Request, Response, NextFunction } from 'express'
import { TLoginUserInput, TRefreshTokenInput } from '../schema/user.schema'
import { AuthenticationService } from '../services/auth.service'

export class AuthenticationController {
    private authenticationService: AuthenticationService
    constructor() {
        this.authenticationService = new AuthenticationService()
    }

    signIn = async (req: Request<{}, {}, TLoginUserInput>, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body
            const tokens = await this.authenticationService.userSignIn(email, password)
            res.status(200).json({ data: tokens })
        } catch (err) {
            next(err)
        }
    }

    recreateAccessToken = async (req: Request<{}, {}, TRefreshTokenInput>, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body
            const accessToken = await this.authenticationService.recreateAccessToken(refreshToken)

            res.status(200).json({ data: { accessToken } })
        } catch (err) {
            next(err)
        }
    }

    recoverPassword = async (req: Request, res: Response, next: NextFunction) => {}

    verifyPasswordToken = async (req: Request, res: Response, next: NextFunction) => {}

    changePassword = async (req: Request, res: Response, next: NextFunction) => {}
}
