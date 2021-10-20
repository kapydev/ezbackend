import { EzApp, EzBackendServer } from "./ezapp";
import fastify, { FastifyInstance } from "fastify";
import fastifyBoom from 'fastify-boom'
import { Connection, createConnection, EntitySchema, ObjectLiteral, Repository } from "typeorm";
import { PluginScope } from "@ezbackend/core";
import _ from 'lodash'
import path from 'path'
import dotenv from 'dotenv'
import { InjectOptions } from "light-my-request";

export interface EzBackendInstance {
    entities: Array<EntitySchema>
    server: EzBackendServer
    _server: FastifyInstance
    repo: Repository<ObjectLiteral>
    orm: Connection
}

export interface EzBackendOpts {
    port: number
    orm: Parameters<typeof createConnection>[0]
    server: Parameters<typeof fastify>[0]
}

//TODO: Check if emojis will break instance names
//URGENT TODO: Strict types for instance, opts
async function addErrorSchema(instance: EzBackendInstance, opts: EzBackendOpts) {
    instance.server.addSchema({
        "$id": "ErrorResponse",
        type: 'object',
        properties: {
            statusCode: { type: 'number' },
            error: { type: 'string' },
            message: { type: 'string' }
        }
    })
}

//URGENT TODO: Make running this optional in the default config
dotenv.config()

const defaultConfig = {
    port: 8000,
    server: {
        logger: {
            prettyPrint: {
                translateTime: "SYS:HH:MM:ss",
                ignore: "pid,hostname,reqId,responseTime,req,res",
                messageFormat: "[{req.method} {req.url}] {msg}",
            },
        },
    },
    orm: {
        type: "better-sqlite3",
        database: ":memory:",
        synchronize: true
    },
    auth: {
        secretKeyPath: path.join(process.cwd(), 'secret-key'),
        successRedirectURL: "http://localhost:8000/db-ui",
        failureRedirectURL: "http://localhost:8000/db-ui",
        google: {
            googleClientId: process.env.GOOGLE_CLIENT_ID,
            googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: ['profile'],
        }
    },
    // cors: {
    //     origin: (origin: string, cb: Function) => {
    //         if (/localhost/.test(origin)) {
    //             //  Request from localhost will pass
    //             cb(null, true)
    //             return
    //         }
    //         // Generate an error on other origins, disabling access
    //         cb(new Error("Not allowed"))
    //     }
    // }
}

/**
 * Child of EzApp. This is where you set up your backend setup tasks.
 */
export class EzBackend extends EzApp {

    constructor() {
        super()

        this.setInit('Create Entities Container', async (instance, opts) => {
            instance.entities = []
        })
        this.setPostInit('Create Database Connection', async (instance, opts) => {
            instance.orm = await createConnection(
                {
                    ...opts.orm,
                    entities: instance.entities
                }
            )
        })

        this.setHandler('Add Fastify Boom', async (instance, opts) => {
            instance.server.register(fastifyBoom)
        })
        this.setHandler('Add Error Schema', addErrorSchema)

        this.setPostHandler('Create Fastify Server', async (instance, opts) => {
            instance._server = fastify(opts.server)
        })

        this.setPostHandler('Register Fastify Plugins', async (instance, opts) => {
            this.registerFastifyPlugins(instance._server, this)
        })

        this.setRun('Run Fastify Server', async (instance, opts) => {
            await instance._server.listen(opts.port)
        })

        this.scope = PluginScope.PARENT

    }

    getInternalInstance() {
        //TODO: Figure if there is a better way of getting this data
        //@ts-ignore
        const lastPlugin = this.instance._lastUsed
        if (lastPlugin === null) {
            throw new Error("Server is still undefined, have you called app.start() yet?")
        }
        return lastPlugin.server as EzBackendInstance
    }

    getInternalServer() {
        return this.getInternalInstance()._server
    }

    async inject(injectOpts: string | InjectOptions) {
        const server = this.getInternalServer()
        return server.inject(injectOpts)
    }

    printRoutes() {
        return this.getInternalServer().printRoutes()
    }

    printPlugins() {
        return this.getInternalServer().printPlugins()
    }

    //URGENT TODO: Remove temporary any fix
    async start(opts?: any) {
        opts = _.merge(defaultConfig, opts)
        await super.start(opts)
    }

}