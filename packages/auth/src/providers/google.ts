import { BaseProvider } from './base'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import fastifyPassport from 'fastify-passport'
import { AnyStrategy } from 'fastify-passport/dist/strategies'
import { EzBackend } from '@ezbackend/core'
import { RouteOptions } from 'fastify'
import { DeserializeFunction, SerializeFunction } from 'fastify-passport/dist/Authenticator'
import {OpenAPIV3} from 'openapi-types'
import '@ezbackend/common'

interface IGoogleProviderOptions {
    googleClientId: string
    googleClientSecret: string
    backendURL: string
    successRedirectURL: string
    failureRedirectURL: string
    //TODO: Strict typechecking for allowed google scopes
    scope: Array<string>
}

export class GoogleProvider extends BaseProvider {

    constructor(model) {
        const ezb = EzBackend.app()
        //TODO: Expand the namespace to avoid having to use ts-ignore`
        //@ts-ignore
        const providerOptions: IGoogleProviderOptions = ezb.config.auth['google']
        super('google', model, providerOptions)
    }

    addStrategy(): [name: string, Strategy: AnyStrategy] {

        const that = this

        return [this.providerName, new GoogleStrategy({
            clientID: this.providerOptions.googleClientId,
            clientSecret: this.providerOptions.googleClientSecret,
            //URGENT TODO: Single source of truth for making model names kebab case for website URL
            callbackURL: `${this.providerOptions.backendURL}/${this.getCallbackURLNoPreSlash()}`
        }, function (accessToken, refreshToken, profile, cb) {
            const model = new that.model()
            //@ts-ignore
            model[`${that.providerName}Id`] = profile.id
            //@ts-ignore
            model[`${that.providerName}Data`] = profile
            const ezb = EzBackend.app()
            ezb.orm.manager.save(model).then(
                () => {
                    cb(undefined, profile.id)
                }
            )
            //URGENT TODO: Make it such that I don't need to make my fields allow null, and so that it doesnt throw an error
        })]
    }

    getLoginRoute(): RouteOptions {
        const ezb = EzBackend.app()
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash()}/login`,
            // preValidation: fastifyPassport.authenticate('google', { scope: this.providerOptions.scope }),
            handler: fastifyPassport.authenticate('google', { scope: this.providerOptions.scope }),
            schema: {
                //TODO: Figure out how to import types for summary
                //@ts-ignore
                summary: `Login for model '${this.model.name}' with provider ${this.providerName}`,
                //@ts-ignore
                description: `# 🔑 [Click here](/${this.getRoutePrefixNoPrePostSlash()}/login) to login
                1. Creates/Updates '${this.model.name}' on login
                2. Provider ${this.providerName}
                3. Scopes: ${this.providerOptions.scope.toString()}` 
            }
        }
    }

    getLogoutRoute(): RouteOptions {
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash()}/logout`,
            handler: async function (req, res) {
                req.logout()
                return { loggedIn: false }
            },
            schema: {
                //TODO: Figure out how to import types for summary
                //@ts-ignore
                summary: `Logout for model '${this.model.name}' with provider ${this.providerName}`,
                //@ts-ignore
                description: `# 🔑 [Click here](/${this.getRoutePrefixNoPrePostSlash()}/logout) to logout`
            }
        }
    }

    getCallbackRoute(): RouteOptions {
        return {
            method: 'GET',
            url: `/${this.getCallbackURLNoPreSlash()}`,
            preValidation: fastifyPassport.authenticate('google', {
                scope: this.providerOptions.scope,
                successRedirect: this.providerOptions.successRedirectURL,
                failureRedirect: this.providerOptions.failureRedirectURL
            }),
            handler: async function (req, res) {
                //URGENT TODO: Figure about the security implications of this
                return { user: req.user }
            }
        }
    }

    registerUserSerializer(): SerializeFunction<unknown, unknown> {
        const that = this
        return async function serializer(id, req) {
            //@ts-ignore
            return `${that.providerName}-${id}`
        }
    }

    //URGENT TODO: When failed to deserialize user because of database reset, think about logging the user out
    registerUserDeserializer(): DeserializeFunction<any, any> {
        const that = this
        return async function deserializer(providerAndId: string, req) {
            if (providerAndId.startsWith(`${that.providerName}-`)) {
                //TODO: Consider the security implications of not checking that the replacement starts at 'google-'
                const id = providerAndId.replace(`${that.providerName}-`, '')
                const ezb = EzBackend.app()
                const userRepo = ezb.orm.getRepository(that.model)
                const fullUser = await userRepo.findOne({ [`${that.providerName}Id`]: id })
                return fullUser
            } else {
                throw 'pass'
            }

        }
    }

    getSecurityScheme() {
        const that = this
        const securityScheme: OpenAPIV3.SecuritySchemeObject = {
            type: "oauth2",
            //@ts-ignore
            description: "## ⚠️Do not fill client id, just click __'Authorize'__ [(explanation)](http://google.com)",
            flows:
            {
                implicit: {
                    authorizationUrl: `/${that.getRoutePrefixNoPrePostSlash()}/login`,
                    scopes: {
                    }
                }
            }
        }
        return {
            [`${that.model.name}-${that.providerName}`]: securityScheme
        }
    }
}