import { PluginScope } from "@ezbackend/core"
import { EzApp } from "@ezbackend/common"
import { fastifySwagger, SwaggerOptions } from 'fastify-swagger'
import { EzBackendOpts } from "@ezbackend/common"
import type { FastifyRegisterOptions } from 'fastify'

declare module '@ezbackend/common' {
    interface EzBackendOpts {
        ezOpenAPI: FastifyRegisterOptions<SwaggerOptions> | undefined
    }
}

const defaultConfig: EzBackendOpts['ezOpenAPI'] = {
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
    constructor(openAPIopts?: EzBackendOpts['ezOpenAPI']) {
        super()

        this.setDefaultOpts(defaultConfig)

        this.setHandler('Add Swagger Plugin', async (instance, fullOpts) => {

            const opts = this.getOpts('ezOpenAPI', fullOpts, openAPIopts)

            instance.server.register(fastifySwagger,opts)
        })

        this.scope = PluginScope.PARENT
    }
}