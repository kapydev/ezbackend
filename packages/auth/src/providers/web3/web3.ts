import { BaseProvider } from "../base"
import { EzBackendInstance } from "@ezbackend/common"
import { FastifyInstance, RouteOptions } from 'fastify'
import fastifyPassport from 'fastify-passport'
import { DeserializeFunction, SerializeFunction } from 'fastify-passport/dist/Authenticator'
import { Strategy as CustomStrategy } from 'passport-custom'
import fastifyStatic from 'fastify-static'
import Boom from "@hapi/boom"
import path from 'path'
//@ts-ignore
import Web3Token from 'web3-token'


export class Web3Provider extends BaseProvider {

    constructor(modelName: string) {
        //@ts-ignore
        super('web3', modelName)
    }

    addStrategy(instance: EzBackendInstance, server: FastifyInstance, opts: any): [name: string, Strategy: any] {
        const that = this

        server.register(fastifyStatic, {
            //TODO: Make this not relative if possible
            //URGENT TODO: Modify this to prevent conflict with existing routes
            root: path.join(__dirname, '../../../web3-login-ui/build')
        })

        const EthStrategy = new CustomStrategy(
            async function (req, callback) {
                if (!req.query.token) {
                    throw Boom.badData()
                }

                let recoveredAddress: string

                try {
                    const { address, body } = await Web3Token.verify(req.query.token)
                    recoveredAddress = address
                } catch {
                    throw Boom.badData()
                }

                const repo = instance.orm.getRepository(that.modelName)

                const model = {
                    [`${that.providerName}Id`]: recoveredAddress,
                    [`${that.providerName}Data`]: {}
                }

                const serializedID = `${that.providerName}-${recoveredAddress}`

                repo.save(model).then(
                    () => {
                        callback(null, serializedID)
                    },
                    (e) => {
                        if (String(e.driverError).toLowerCase().includes('unique')) {
                            //URGENT TODO: Check if this works for all databases
                            callback(null, serializedID)
                        }
                        else {
                            callback(e)
                        }
                    }
                )


            }
        )

        return [this.providerName, EthStrategy]
    }

    getLoginRoute(server: FastifyInstance, opts: any): RouteOptions {
        const that = this
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash(server)}/login`,
            handler: (req, res) => {
                //URGENT TODO: How do we ensure that the fastify static plugin is in use? If we double import it does it cause problems?
                res.sendFile('index.html')
            },
            schema: {
                //TODO: Figure out how to import types for summary
                //@ts-ignore
                tags: [`${this.providerName} Auth`],
                //@ts-ignore
                summary: `Login for model '${this.modelName}' with provider ${this.providerName}`,
                description: `# 🔑 [CLICK HERE](${process.env.BACKEND_URL}/${this.getFullRoutePrefixNoPrePostSlash(server)}/login) or visit the URL with this extension to login
                1. Creates/Updates '${this.modelName}' on login
                2. Provider ${this.providerName}`
            }
        }
    }

    getLogoutRoute(server: FastifyInstance, opts: any): RouteOptions {
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash(server)}/logout`,
            handler: function (req, res) {
                req.logOut().then(
                    () => {
                        res.redirect(opts.successRedirectURL)
                    }
                )

            },
            schema: {
                //TODO: Figure out how to import types for summary
                //@ts-ignore
                tags: [`${this.providerName} Auth`],
                //@ts-ignore
                summary: `Logout for model '${this.modelName}' with provider ${this.providerName}`,
                description: `# 🔑 [CLICK HERE](${process.env.BACKEND_URL}/${this.getFullRoutePrefixNoPrePostSlash(server)}/logout) or visit the URL with this extension to logout`
            }
        }
    }

    getCallbackRoute(server: FastifyInstance, opts: any): RouteOptions {
        const that = this
        return {
            method: 'GET',
            url: `/${this.getRoutePrefixNoPrePostSlash(server)}/callback`,
            preValidation: fastifyPassport.authenticate(that.providerName),
            handler: function (req, res) {
                res.redirect(opts.successRedirectURL)
            },
            schema: {
                //@ts-ignore
                tags: [`${this.providerName} Auth`],
                //@ts-ignore
                summary: `Callback Route for model '${this.modelName}' with provider ${this.providerName}`,
                description: `This route is not used for web3 login`
            }
        }
    }

    registerUserSerializer(instance: EzBackendInstance, opts: any): SerializeFunction<unknown, unknown> {
        const that = this
        return async function serializer(id, req) {
            return id
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
                //THIS NEEDS TO BE EXACTLY THE STRING PASS, OTHERWISE IT WILL FAIL
                throw "pass"
            }

        }
    }
}