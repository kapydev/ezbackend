import { SerializeFunction } from "fastify-passport/dist/Authenticator"
import { DeserializeFunction } from "fastify-passport/dist/Authenticator"
import { AnyStrategy } from "fastify-passport/dist/strategies"
import { RouteOptions, FastifyInstance } from "fastify"
import fastifyPassport from 'fastify-passport'
import { EzApp } from '@ezbackend/common'

export abstract class BaseProvider extends EzApp {

    providerName: string
    modelName: string

    constructor(providerName: string, modelName: string) {
        super()
        this.providerName = providerName
        this.modelName = modelName

        this.setHandler(`Add ${this.providerName} Auth Provider`, async (instance, opts) => {
            this.addProvider(instance, opts)
        })
    }

    abstract addStrategy(instance, server, opts): [name: string, Strategy: AnyStrategy]
    abstract registerUserSerializer(instance, opts): SerializeFunction<unknown, unknown>
    abstract registerUserDeserializer(instance, opts): DeserializeFunction<any, any>
    abstract getLoginRoute(instance, opts): RouteOptions
    abstract getLogoutRoute(instance, opts): RouteOptions
    abstract getCallbackRoute(instance, opts): RouteOptions
    //TODO: Implement this security scheme in the swagger spec
    // abstract getSecurityScheme():{[name:string]:OpenAPIV3.SecuritySchemeObject}

    addProvider(instance, opts) {
        const providerOpts = opts.auth[this.providerName]

        instance.server.register(async (server, opts) => {
            fastifyPassport.use(...this.addStrategy(instance, server, providerOpts))
            fastifyPassport.registerUserSerializer(this.registerUserSerializer(instance, providerOpts))
            fastifyPassport.registerUserDeserializer(this.registerUserDeserializer(instance, providerOpts))
            server.route(this.getLoginRoute(server, providerOpts))
            server.route(this.getLogoutRoute(server, providerOpts))
            server.route(this.getCallbackRoute(server, providerOpts))
        })

    }

    getRoutePrefixNoPrePostSlash(server: FastifyInstance) {
        const fullRoute = `auth/${this.providerName}`
        return fullRoute
    }

    getFullRoutePrefixNoPrePostSlash(server:FastifyInstance) {
        const encapsulatedPrefix = server.prefix.replace(/^\//,"")
        const fullRoute = `${encapsulatedPrefix}/${this.getRoutePrefixNoPrePostSlash(server)}`
        return fullRoute
    }

    getCallbackURLNoPreSlash(server: FastifyInstance) {
        return `${this.getFullRoutePrefixNoPrePostSlash(server)}/callback`
    }
}