import { Router } from 'express'
import { verifyJWTToken } from '../middlewares/authorization'
import { getMe } from '../controllers/user.controller'

const router: Router = Router()

router.get('/me', verifyJWTToken, getMe)

export const userRouter = router
