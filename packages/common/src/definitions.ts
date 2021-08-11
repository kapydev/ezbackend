import {EzBackend as EzBackendBase} from '@ezbackend/core'
import {Sequelize} from "sequelize"
import {FastifyInstance} from "fastify"

export interface IOptions {
    server?: {
        port?: number
    }
    orm?: {}
    
}

//TODO: Think about programatically adding types
export class EzBackend extends EzBackendBase {
    sequelize: Sequelize
    server: FastifyInstance
    options: IOptions
}