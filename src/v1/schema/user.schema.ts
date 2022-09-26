import { object, string, TypeOf, z } from 'zod'

export const createUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Password must be more than 8 characters'),
    }),
})

export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Invalid email or password'),
    }),
})

export const refreshTokenSchema = object({
    body: object({
        refreshToken: string({
            required_error: 'Refresh token is required',
        }).min(100, 'Invalid refresh token'),
    }),
})

export type TCreateUserInput = TypeOf<typeof createUserSchema>['body']
export type TLoginUserInput = TypeOf<typeof loginUserSchema>['body']
export type TRefreshTokenInput = TypeOf<typeof refreshTokenSchema>['body']
