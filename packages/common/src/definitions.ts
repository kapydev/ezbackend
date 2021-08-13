import {EzBackend as EzBackendBase} from '@ezbackend/core'
import {Sequelize,Options as SequelizeOptions} from "sequelize"
import {FastifyInstance, FastifyLoggerOptions} from "fastify"

export interface IOptions {
    server?: {
        port?: number
        logger?:FastifyLoggerOptions
    }
    orm?: SequelizeOptions
    
}

//TODO: Think about programatically adding types
export class  EzBackend extends EzBackendBase {
    sequelize: Sequelize
    server: FastifyInstance
}