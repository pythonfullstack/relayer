import { Router } from 'express'
import { getAPIKeys, createAPIKey } from '../controllers/apikey.controller'
import { verifyJWTToken } from '../middlewares/authorization'

const router = Router()

router.get('/', verifyJWTToken, getAPIKeys)
router.post('/create', verifyJWTToken, createAPIKey)

export const APIKeyRouter = router
