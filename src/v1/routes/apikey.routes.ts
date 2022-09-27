import { Router } from 'express'
import { getAPIKeys, createAPIKey, revokeAPIKey } from '../controllers/apikey.controller'

const router = Router()

router.get('/', getAPIKeys)
router.post('/create', createAPIKey)
router.post('/revoke', revokeAPIKey)

export const APIKeyRouter = router
