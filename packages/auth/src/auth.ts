import { PluginScope } from '@ezbackend/core'
import { EzApp } from '@ezbackend/common'
import fastifySecureSession from 'fastify-secure-session'
import fastifyPassport from 'fastify-passport'
import fs from 'fs'

//URGENT TODO: If failed to deserialize user out of session remove user session
export class EzAuth extends EzApp {
    constructor() {
        super()
        this.setHandler("Add Fastify Secure Session", async (instance, opts) => {
            //TODO: Create key if no key
            //@ts-ignore
            instance.server.register(fastifySecureSession, {
                key: fs.readFileSync(opts.auth.secretKeyPath),
                cookie: {
                    path: '/'
                }
            })
        })

        this.setHandler("Add Fastify Passport", async (instance, opts) => {

            //TODO: Create key if no key
            //@ts-ignore
            instance.server.register(fastifyPassport.initialize())
            //@ts-ignore
            instance.server.register(fastifyPassport.secureSession())
        })

        this.scope = PluginScope.PARENT

    }
}