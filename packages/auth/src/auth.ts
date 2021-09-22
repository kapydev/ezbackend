import {App, PluginScope} from '@ezbackend/core'
import fastifySecureSession from 'fastify-secure-session'
import fastifyPassport from 'fastify-passport'
import fs from 'fs'

export class EzAuth extends App {
    constructor() {
        super()
        this.setPostInit("Add Fastify Secure Session", async (instance,opts) => {
            //TODO: Create key if no key
            instance.server.register(fastifySecureSession, {
                key: fs.readFileSync(opts.auth.secretKeyPath),
                cookie: {
                    path: '/'
                }
            })
        })

        this.setPostInit("Add Fastify Passport", async (instance,opts) => {
            //TODO: Create key if no key
            instance.server.register(fastifyPassport.initialize())
            instance.server.register(fastifyPassport.secureSession())
        })

        this.scope = PluginScope.PARENT
    }
}