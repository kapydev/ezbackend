import { PluginScope, App } from '@ezbackend/core'
import { EzApp } from '@ezbackend/common'
import { EzError } from '@ezbackend/utils'
import fastifySecureSession from 'fastify-secure-session'
import fastifyPassport from 'fastify-passport'
import fs from 'fs'

const wrap = (middleware: Function, opts:any={}) => (socket:any, next:any) => middleware(socket.request, opts, next);

//TODO: Make this of EzApp type instead
export class EzAuth extends EzApp {
    constructor() {
        super()
        this.setHandler("Add Fastify Secure Session", (instance, opts, done) => {

            let key: Buffer = Buffer.alloc(32)

            if (typeof opts.auth.secretKey === "string") {
                key.write(opts.auth.secretKey)
            }

            else if (fs.existsSync(opts.auth.secretKeyPath)) {
                key = Buffer.from(fs.readFileSync(opts.auth.secretKeyPath), undefined, 32)
                //TODO: I think this command may fail intermittently producing the wrong output strangely enough
            } else {
                throw new EzError(
                    `Secret key not found at path ${opts.auth.secretKeyPath}`,
                    "The file 'secret-key' is used to hash the user's session (Seperate from google credentials)",
                    `
Run command in root of project (Same folder as package.json)

linux terminal: ./node_modules/.bin/secure-session-gen-key > secret-key
cmd prompt:     node_modules\\.bin\\secure-session-gen-key > secret-key
powershell:     ./node_modules/.bin/secure-session-gen-key | Out-File -FilePath secret-key -Encoding default -NoNewline
`
                )
            }

            instance.server.register(fastifySecureSession, {
                key: key,
                cookie: {
                    path: '/',
                    sameSite: 'none',
                    secure: true
                }
            })

            // this.getSocketIORaw().use(wrap(fastifySecureSession, {
            //     key: key,
            //     cookie: {
            //         path: '/',
            //         sameSite: 'none',
            //         secure: true
            //     }
            // }))

            done()
        })

        this.setHandler("Add Fastify Passport", async (instance, opts) => {
            instance.server.register(fastifyPassport.initialize())
            instance.server.register(fastifyPassport.secureSession())

            // this.getSocketIORaw().use(wrap(fastifyPassport.initialize()))
            // this.getSocketIORaw().use(wrap(fastifyPassport.secureSession()))
        })

        this.scope = PluginScope.PARENT

    }
}