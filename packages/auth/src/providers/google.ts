import { BaseProvider } from './base'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import fastifyPassport from 'fastify-passport'
import { AnyStrategy } from 'fastify-passport/dist/strategies'
import { RouteOptions, FastifyInstance } from 'fastify'
import { DeserializeFunction, SerializeFunction } from 'fastify-passport/dist/Authenticator'
import type { EzBackendInstance } from '@ezbackend/common'
import { EzError } from "@ezbackend/utils"


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

    constructor(modelName: string) {
        super('google', modelName)
    }

    //TODO: Figure out why its not getting the types from the abstract class
    addStrategy(instance: EzBackendInstance, server: FastifyInstance, opts: any): [name: string, Strategy: AnyStrategy] {

        const that = this

        if (opts.googleClientId === undefined || opts.googleClientSecret === undefined) {
            throw new EzError(
                "Google Client ID and Client Secret not found",
                "The Google Client ID and Client Secret are used to authenticate EzBackend to provide the google login",
                "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file in the root (Same folder as package.json), or specify the option in app.start({...})",
                "https://www.ezbackend.io/docs/auth/user-auth#creating-the-user"
            )
        }

        return [this.providerName, new GoogleStrategy({
            clientID: opts.googleClientId,
            clientSecret: opts.googleClientSecret,
            callbackURL: `${opts.backendURL}/${this.getCallbackURLNoPreSlash(server)}`
        }, function (accessToken, refreshToken, profile, cb) {
            const repo = instance.orm.getRepository(that.modelName)
            const model = {
                [`${that.providerName}Id`]: profile.id,
                [`${that.providerName}Data`]: profile
            }
            repo.save(model).then(
                () => {
                    cb(undefined, profile.id)
                }
            )
        })]
    }

    getLoginRoute(server: FastifyInstance, opts: any): RouteOptions {
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash(server)}/login`,
            // preValidation: fastifyPassport.authenticate('google', { scope: this.providerOptions.scope }),
            handler: fastifyPassport.authenticate('google', { scope: opts.scope }),
            schema: {
                //TODO: Figure out how to import types for summary
                //@ts-ignore
                tags: ['Google Auth'],
                //@ts-ignore
                summary: `Login for model '${this.modelName}' with provider ${this.providerName}`,
                description: `# 🔑 [CLICK HERE](${process.env.BACKEND_URL}/${this.getFullRoutePrefixNoPrePostSlash(server)}/login) or visit the URL with this extension to login
                1. Creates/Updates '${this.modelName}' on login
                2. Provider ${this.providerName}
                3. Scopes: ${opts.scope.toString()}`
            }
        }
    }

    //TODO: Mock and test these logout routes
    getLogoutRoute(server: FastifyInstance, opts: any): RouteOptions {
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash(server)}/logout`,
            handler: function (req, res) {
                res.redirect(opts.successRedirectURL)
            },
            schema: {
                //TODO: Figure out how to import types for summary
                //@ts-ignore
                tags: ['Google Auth'],
                //@ts-ignore
                summary: `Logout for model '${this.modelName}' with provider ${this.providerName}`,
                description: `# 🔑 [CLICK HERE](${process.env.BACKEND_URL}/${this.getFullRoutePrefixNoPrePostSlash(server)}/logout) or visit the URL with this extension to logout`
            }
        }
    }

    getCallbackRoute(server: FastifyInstance, opts: any): RouteOptions {
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash(server)}/callback`,
            preValidation: fastifyPassport.authenticate('google', {
                scope: opts.scope,
                successRedirect: opts.successRedirectURL,
                failureRedirect: opts.failureRedirectURL
            }),
            handler: async function (req, res) {
                res.redirect(opts.successRedirectURL)
            },
            schema: {
                //@ts-ignore
                tags: ['Google Auth'],
                //@ts-ignore
                summary: `Callback Route for model '${this.modelName}' with provider ${this.providerName}`,
                description: `Google redirects to this URL with the user's details. This route must be specified in the google callback URLs`
            }
        }
    }

    registerUserSerializer(instance: EzBackendInstance, opts: any): SerializeFunction<unknown, unknown> {
        const that = this
        return async function serializer(id, req) {
            return `${that.providerName}-${id}`
        }
    }

    registerUserDeserializer(instance: EzBackendInstance, opts: any): DeserializeFunction<any, any> {
        const that = this
        return async function deserializer(providerAndId: string, req) {
            if (providerAndId.startsWith(`${that.providerName}-`)) {
                //TODO: Consider the security implications of not checking that the replacement starts at 'google-'
                const id = providerAndId.replace(`${that.providerName}-`, '')
                const userRepo = instance.orm.getRepository(that.modelName)
                const fullUser = await userRepo.findOne({ [`${that.providerName}Id`]: id })
                if (fullUser) {
                    return fullUser
                } else {
                    //Logout the user if correct provider prefix but not in DB
                    return null
                }
            } else {
                throw new Error('pass')
            }

        }
    }

    // getSecurityScheme() {
    //     const that = this
    //     const securityScheme: OpenAPIV3.SecuritySchemeObject = {
    //         type: "oauth2",
    //         //@ts-ignore
    //         description: "## ⚠️Do not fill client id, just click __'Authorize'__ [(explanation)](http://google.com)",
    //         flows:
    //         {
    //             implicit: {
    //                 authorizationUrl: `/${that.getRoutePrefixNoPrePostSlash(server)}/login`,
    //                 scopes: {
    //                 }
    //             }
    //         }
    //     }
    //     return {
    //         [`${that.modelName}-${that.providerName}`]: securityScheme
    //     }
    // }
}