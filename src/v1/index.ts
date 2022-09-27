import { Router } from 'express'
import { userRouter } from './routes/user.routes'
import { authRouter } from './routes/auth.routes'
import { APIKeyRouter } from './routes/apikey.routes'
import { verifyJWTToken } from './middlewares/authorization'

const router: Router = Router()

router.use('/users', userRouter)
router.use('/', authRouter)
router.use('/api-keys', verifyJWTToken, APIKeyRouter)
export const v1 = router
