import { createLogger, format, LoggerOptions, transports } from 'winston'
import path from 'path'
import { Common } from 'local-types'

const loggerOptions: LoggerOptions = {
    exitOnError: false,
    format: format.combine(
        format.label({ label: path.basename(process.mainModule ? process.mainModule.filename : '') }),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        // Format the metadata object
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    ),
    defaultMeta: {},
    transports: [],
    // transports: [new Sentry(sentryOptions)],
}

const logger: Common.ConsoleLogger = createLogger(loggerOptions)
const logFormat = format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

logger.add(
    new transports.Console({
        level: 'silly',
        format: format.combine(format.colorize(), logFormat),
    }),
)

export { logger }
