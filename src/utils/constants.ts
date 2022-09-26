import clone from 'lodash.clonedeep'
import { Common } from 'local-types'
import config from 'config'

const server: Common.IServerConfig = clone(config.get('server'))

const appConfig: Common.GlobalConfig = {
    server,
}

export { appConfig as AppConfig }
