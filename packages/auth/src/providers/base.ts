import { SerializeFunction } from "fastify-passport/dist/Authenticator"
import { DeserializeFunction } from "fastify-passport/dist/Authenticator"
import { AnyStrategy } from "fastify-passport/dist/strategies"
import { RouteOptions, FastifyInstance } from "fastify"
import fastifyPassport from 'fastify-passport'
import { EzApp, EzBackendInstance, EzBackendServer, EzBackendOpts } from '@ezbackend/common'

declare module '@ezbackend/common' {
    interface EzBackendOpts {
        auth: {
            secretKeyPath:string
            google?: {
                googleClientId: string,
                googleClientSecret: string,
                backendURL: string,
                scope: Array<string>,
                successRedirectURL: string,
                failureRedirectURL: string,
            }
        }
    }
}

type ProviderName = Exclude<keyof EzBackendOpts['auth'],'secretKeyPath'>

export abstract class BaseProvider extends EzApp {

    providerName: ProviderName
    modelName: string

    constructor(providerName: ProviderName, modelName: string) {
        super()
        this.providerName = providerName
        this.modelName = modelName

        this.setHandler(`Add ${this.providerName} Auth Provider`, async (instance, opts) => {
            this.addProvider(instance, opts)
        })
    }

    //URGENT TODO: Add type for provider opts
    abstract addStrategy(instance: EzBackendInstance, server: FastifyInstance, opts:any): [name: string, Strategy: AnyStrategy]
    abstract registerUserSerializer(instance:EzBackendInstance, opts:any): SerializeFunction<unknown, unknown>
    abstract registerUserDeserializer(instance:EzBackendInstance, opts:any): DeserializeFunction<any, any>
    abstract getLoginRoute(server:FastifyInstance, opts:any): RouteOptions
    abstract getLogoutRoute(server:FastifyInstance, opts:any): RouteOptions
    abstract getCallbackRoute(server:FastifyInstance, opts:any): RouteOptions
    //TODO: Implement this security scheme in the swagger spec
    // abstract getSecurityScheme():{[name:string]:OpenAPIV3.SecuritySchemeObject}

    addProvider(instance:EzBackendInstance, opts:EzBackendOpts) {
        const providerOpts = opts.auth[this.providerName]!

        instance.server.register(async (server, opts) => {
            fastifyPassport.use(...this.addStrategy(instance, server, providerOpts))
            fastifyPassport.registerUserSerializer(this.registerUserSerializer(instance, providerOpts))
            fastifyPassport.registerUserDeserializer(this.registerUserDeserializer(instance, providerOpts))
            //TODO: Fix these typescript errors
            server.route(this.getLoginRoute(server as any, providerOpts) as any)
            server.route(this.getLogoutRoute(server as any, providerOpts) as any)
            server.route(this.getCallbackRoute(server as any, providerOpts) as any)
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