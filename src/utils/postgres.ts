import { PrismaClient } from '@prisma/client'
import { middleware } from './dbMiddleware'

const db = new PrismaClient()

export default middleware(db)
