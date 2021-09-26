import { BaseProvider } from './base'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import fastifyPassport from 'fastify-passport'
import { AnyStrategy } from 'fastify-passport/dist/strategies'
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

    constructor(modelName:string) {
        super('google', modelName)
    }

    addStrategy(instance,opts): [name: string, Strategy: AnyStrategy] {

        const that = this

        return [this.providerName, new GoogleStrategy({
            clientID: opts.googleClientId,
            clientSecret: opts.googleClientSecret,
            //LEFT OFF: Need to redesign the callback URL to properly support route prefixing
            callbackURL: `${opts.backendURL}/${this.getCallbackURLNoPreSlash()}`
        }, function (accessToken, refreshToken, profile, cb) {
            const repo = instance.orm.getRepository(that.modelName)
            const model = {}
            model[`${that.providerName}Id`] = profile.id
            model[`${that.providerName}Data`] = profile
            repo.save(model).then(
                () => {
                    cb(undefined, profile.id)
                }
            )
            //URGENT TODO: Make it such that I don't need to make my fields allow null, and so that it doesnt throw an error
        })]
    }

    getLoginRoute(instance,opts): RouteOptions {
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash()}/login`,
            // preValidation: fastifyPassport.authenticate('google', { scope: this.providerOptions.scope }),
            handler: fastifyPassport.authenticate('google', { scope: opts.scope }),
            schema: {
                //TODO: Figure out how to import types for summary
                //@ts-ignore
                summary: `Login for model '${this.modelName}' with provider ${this.providerName}`,
                //@ts-ignore
                description: `# 🔑 Visit the URL with this extension to login
                1. Creates/Updates '${this.modelName}' on login
                2. Provider ${this.providerName}
                3. Scopes: ${opts.scope.toString()}` 
            }
        }
    }

    getLogoutRoute(instance,opts): RouteOptions {
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
                summary: `Logout for model '${this.modelName}' with provider ${this.providerName}`,
                //@ts-ignore
                description: `# 🔑 Visit the URL with this extension to logout`
            }
        }
    }

    getCallbackRoute(instance,opts): RouteOptions {
        return {
            method: 'GET',
            url: `/${this.getCallbackURLNoPreSlash()}`,
            preValidation: fastifyPassport.authenticate('google', {
                scope: opts.scope,
                successRedirect: opts.successRedirectURL,
                failureRedirect: opts.failureRedirectURL
            }),
            handler: async function (req, res) {
                res.redirect(opts.successRedirectURL)
            }
        }
    }

    registerUserSerializer(instance,opts): SerializeFunction<unknown, unknown> {
        const that = this
        return async function serializer(id, req) {
            //@ts-ignore
            return `${that.providerName}-${id}`
        }
    }

    //URGENT TODO: When failed to deserialize user because of database reset, think about logging the user out
    registerUserDeserializer(instance,opts): DeserializeFunction<any, any> {
        const that = this
        return async function deserializer(providerAndId: string, req) {
            if (providerAndId.startsWith(`${that.providerName}-`)) {
                //TODO: Consider the security implications of not checking that the replacement starts at 'google-'
                const id = providerAndId.replace(`${that.providerName}-`, '')
                const userRepo = instance.orm.getRepository(that.modelName)
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
            [`${that.modelName}-${that.providerName}`]: securityScheme
        }
    }
}