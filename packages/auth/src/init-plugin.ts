import { EzBackend } from '@ezbackend/core'
import fastifySecureSession from 'fastify-secure-session'
import fastifyPassport from 'fastify-passport'
import fs from 'fs'

const ezb = EzBackend.app()

interface IAuth {
    secretKeyPath: string
}

interface IOptions {
    auth: IAuth
}

export default function init(config) {
    ezb.plugins.postInit.push((ezb, opts: IOptions, cb) => {

        ezb.server.register(fastifySecureSession, {
            key: fs.readFileSync(opts.auth.secretKeyPath),
            cookie: {
                path: '/'
                // options for setCookie, see https://github.com/fastify/fastify-cookie
            }
        })
        //URGENT TODO: Figure out why the types are mismatched
        //@ts-ignore
        ezb.server.register(fastifyPassport.initialize())
        //@ts-ignore
        ezb.server.register(fastifyPassport.secureSession())
    
        cb()
    })
}