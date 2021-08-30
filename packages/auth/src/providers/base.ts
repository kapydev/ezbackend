import { SerializeFunction } from "fastify-passport/dist/Authenticator"
import { DeserializeFunction } from "fastify-passport/dist/Authenticator"
import { AnyStrategy } from "fastify-passport/dist/strategies"
import { RouteOptions } from "fastify"
import fastifyPassport from 'fastify-passport'
import { EzBackend } from "@ezbackend/core"
import type {OpenAPIV3} from 'openapi-types'

export abstract class BaseProvider {

    providerOptions: any
    providerName: string
    model: any

    constructor(providerName: string, model: any, providerOptions: any){
        this.providerName = providerName
        this.model = model
        this.providerOptions = providerOptions
    }

    abstract addStrategy():[name:string, Strategy:AnyStrategy]
    abstract registerUserSerializer():SerializeFunction<unknown, unknown>
    abstract registerUserDeserializer():DeserializeFunction<any,any>
    abstract getLoginRoute():RouteOptions
    abstract getLogoutRoute():RouteOptions
    abstract getCallbackRoute():RouteOptions
    //TODO: Implement this security scheme in the swagger spec
    abstract getSecurityScheme():{[name:string]:OpenAPIV3.SecuritySchemeObject}

    addProvider() {
        const ezb = EzBackend.app()
        fastifyPassport.use(...this.addStrategy())
        fastifyPassport.registerUserSerializer(this.registerUserSerializer())
        fastifyPassport.registerUserDeserializer(this.registerUserDeserializer())
        //TODO: Figure out why this is throwing a type error, something to do with fastify passport authenticate
        //@ts-ignore
        ezb.server.route(this.getLoginRoute())
        //@ts-ignore
        ezb.server.route(this.getLogoutRoute())
        //@ts-ignore
        ezb.server.route(this.getCallbackRoute())
    }

    getRoutePrefixNoPrePostSlash() {
        return `${this.model.name}/auth/${this.providerName}`
    }

    getCallbackURLNoPreSlash () {
        return `${this.getRoutePrefixNoPrePostSlash()}/callback`
    }
}