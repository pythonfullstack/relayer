import { Router } from 'express'
import { AuthenticationController } from '../controllers/auth.controller'
import { createUser } from '../controllers/user.controller'
import { validate } from '../middlewares/validate'
import { createUserSchema, refreshTokenSchema } from '../schema/user.schema'

const router: Router = Router()

const authController = new AuthenticationController()
router.post('/login', authController.signIn)
router.post('/register', validate(createUserSchema), createUser)
router.post('/recreate-access-token', validate(refreshTokenSchema), authController.recreateAccessToken)
// router.post('/recover-password', authController.recoverPassword)
// router.patch('/verify/password-token', authController.verifyPasswordToken)
// router.patch('/change/password', authController.changePassword)

export const authRouter = router
