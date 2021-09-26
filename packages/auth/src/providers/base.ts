import { SerializeFunction } from "fastify-passport/dist/Authenticator"
import { DeserializeFunction } from "fastify-passport/dist/Authenticator"
import { AnyStrategy } from "fastify-passport/dist/strategies"
import { RouteOptions, FastifyInstance } from "fastify"
import fastifyPassport from 'fastify-passport'
import {EzApp} from '@ezbackend/common'
import type {OpenAPIV3} from 'openapi-types'

export abstract class BaseProvider extends EzApp {

    providerName: string
    modelName: string

    constructor(providerName: string, modelName: string){
        super()
        this.providerName = providerName
        this.modelName = modelName

        this.setHandler(`Add ${this.providerName} Auth Provider`,async (instance,opts) => {
            this.addProvider(instance,opts)
        })
    }

    abstract addStrategy(instance,opts):[name:string, Strategy:AnyStrategy]
    abstract registerUserSerializer(instance,opts):SerializeFunction<unknown, unknown>
    abstract registerUserDeserializer(instance,opts):DeserializeFunction<any,any>
    abstract getLoginRoute(instance,opts):RouteOptions
    abstract getLogoutRoute(instance,opts):RouteOptions
    abstract getCallbackRoute(instance,opts):RouteOptions
    //TODO: Implement this security scheme in the swagger spec
    abstract getSecurityScheme():{[name:string]:OpenAPIV3.SecuritySchemeObject}

    addProvider(instance, opts) {
        const providerOpts = opts.auth[this.providerName]
        fastifyPassport.use(...this.addStrategy(instance,providerOpts))
        fastifyPassport.registerUserSerializer(this.registerUserSerializer(instance,providerOpts))
        fastifyPassport.registerUserDeserializer(this.registerUserDeserializer(instance,providerOpts))

        instance.server.register(async(server,opts) => {
            server.route(this.getLoginRoute(instance,providerOpts))
            server.route(this.getLogoutRoute(instance,providerOpts))
            server.route(this.getCallbackRoute(instance,providerOpts))
        })
        
    }

    getRoutePrefixNoPrePostSlash() {
        return `${this.modelName}/auth/${this.providerName}`
    }

    getCallbackURLNoPreSlash () {
        return `${this.getRoutePrefixNoPrePostSlash()}/callback`
    }
}