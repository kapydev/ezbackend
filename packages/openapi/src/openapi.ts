import { SwaggerOptions, fastifySwagger } from 'fastify-swagger'

import { EzApp } from "@ezbackend/common"
import { EzBackendOpts } from "@ezbackend/common"
import type { FastifyRegisterOptions } from 'fastify'
import { PluginScope } from "@ezbackend/core"

declare module '@ezbackend/common' {
    interface EzBackendOpts {
        openAPI: FastifyRegisterOptions<SwaggerOptions> | undefined
    }
}

const defaultConfig: EzBackendOpts['openAPI'] = {
    prefix: "/docs",
    routePrefix: "/docs",
    exposeRoute: true,
    //TODO: Figure out why its logging so much
    logLevel: 'warn',
    openapi: {
        info: {
            title: "EzBackend API",
            description: "Automatically generated documentation for EzBackend",
            version: "1.0.0",
        },
        externalDocs: {
            url: "https://github.com/kapydev/ezbackend",
            description: "Find more info here",
        }
    },
}

export class EzOpenAPI extends EzApp {
    constructor() {
        super()

        this.setDefaultOpts(defaultConfig)

        this.setHandler('Add Swagger Plugin', async (instance, fullOpts) => {

            const opts = this.getOpts('openAPI', fullOpts)

            instance.server.register(fastifySwagger,opts)
        })

        this.scope = PluginScope.PARENT
    }
}