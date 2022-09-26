import app from './server'
import { Constants } from './utils'
import { logger } from './utils/logger'

const runServer = async () => {
    const server = app.listen(Number(app.get('port')), () => {
        logger.info(`Server works at ${app.get('url')}:${app.get('port')}`)
    })

    if (Constants.AppConfig.server.env === 'production') {
        // (Browser) <====120 sec keep-alive====> (ELB) <====130 sec keep-alive ====> (Server)
        // elb timeout < keepAliveTimeout < headersTimeout

        server.keepAliveTimeout = 130 * 1000
        server.headersTimeout = 140 * 1000
    }
    return server
}

const runServerAsPromise = runServer()

export default runServerAsPromise
