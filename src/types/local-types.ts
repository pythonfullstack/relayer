import { Logger } from 'winston'
import { User as UserType, Wallet } from '@prisma/client'
export namespace Common {
    export interface IServerConfig {
        context: string
        url: string
        env: string
        port: number
        dbUri: string
        jwtSecret: string
        jwtSaltRounds: number
        jwtAccessTokenExpiry: string
        jwtRefreshTokenExpiry: string
        iscToken: string
    }
    export interface GlobalConfig {
        server: IServerConfig
    }
    export interface ConsoleLogger extends Logger {}
}

export namespace User {
    export interface IWallet {
        id: string
    }

    export interface IUserProfile {
        id: string
        email: string
    }
}
export type TUserWallet = UserType & { wallet?: Wallet }
