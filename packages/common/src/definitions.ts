import {EzBackend} from '@ezbackend/core'
import {Connection, ConnectionOptions} from 'typeorm'
import {FastifyInstance, FastifyLoggerOptions} from "fastify"
import { EzModelMeta } from '.'

export interface IOptions {
    server?: {
        port?: number
        logger?:FastifyLoggerOptions
    }
    orm?: ConnectionOptions
    
}

declare module '@ezbackend/core' {
    interface EzBackend {
        orm: Connection,
        server: FastifyInstance
        models: Array<EzModelMeta>
    }
}

