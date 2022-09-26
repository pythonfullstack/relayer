export class RaidError extends Error {
    statusCode: number
    responseMessage: string | undefined
    processMessage: string | undefined
    description: string | undefined
    error: any
    constructor(message?: string, statusCode?: number, processMessage?: string, error?: any, description?: string) {
        super()
        this.responseMessage = message
        this.statusCode = statusCode || 500
        this.processMessage = processMessage
        this.description = description
        this.error = error
        if (message) {
            this.message = message
        }
    }
}

export class ApplicationProcessError extends RaidError {}
