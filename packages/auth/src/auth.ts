import { PluginScope, App } from '@ezbackend/core'
import { EzApp } from '@ezbackend/common'
import { EzError } from '@ezbackend/utils'
import fastifySecureSession from 'fastify-secure-session'
import fastifyPassport from 'fastify-passport'
import fs from 'fs'

//TODO: Make this of EzApp type instead
export class EzAuth extends EzApp {
    constructor() {
        super()
        this.setHandler("Add Fastify Secure Session", (instance, opts, done) => {

            //TODO: Allow adding by key string
            if (!fs.existsSync(opts.auth.secretKeyPath)) {
                //TODO: I think this command may fail intermittently producing the wrong output strangely enough
                throw new EzError(
                    `Secret key not found at path ${opts.auth.secretKeyPath}`,
                    "The file 'secret-key' is used to hash the user's session (Seperate from google credentials)",
`
Run command in root of project (Same folder as package.json)

linux terminal: ./node_modules/.bin/secure-session-gen-key > secret-key
cmd prompt:     node_modules\.bin\secure-session-gen-key > secret-key
powershell:     ./node_modules/.bin/secure-session-gen-key | Out-File -FilePath secret-key -Encoding default -NoNewline
`
                )
            }
            instance.server.register(fastifySecureSession, {
                key: fs.readFileSync(opts.auth.secretKeyPath),
                cookie: {
                    path: '/'
                }
            })

            done()
        })

        this.setHandler("Add Fastify Passport", async (instance, opts) => {
            instance.server.register(fastifyPassport.initialize())
            instance.server.register(fastifyPassport.secureSession())
        })

        this.scope = PluginScope.PARENT

    }
}