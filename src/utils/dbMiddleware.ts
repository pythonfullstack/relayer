import type { PrismaClient } from '@prisma/client'

export const middleware = (prisma: PrismaClient) => {
    /**
     * middleware to get query running time
     */
    prisma.$use(async (params: any, next: any) => {
        const before = Date.now()

        const result = await next(params)

        const after = Date.now()

        console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)

        return result
    })

    prisma.$use(async (params: any, next: any) => {
        // custom middleware
    })
}
