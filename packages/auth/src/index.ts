import { EzBackend } from '@ezbackend/core'
import { mixedInstance } from 'avvio'
import { Column } from 'typeorm'
import fastifySecureSession from 'fastify-secure-session'
import fastifyPassport from 'fastify-passport'
import providers from './providers'
import fs from 'fs'
// import '@ezbackend/openapi'


const ezb = EzBackend.app()

interface IAuth {
    secretKeyPath: string
}

interface IOptions {
    auth: IAuth
}

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

type IProviders = Array<'google'>

export function EzAuthUser(...providerNames: IProviders): ClassDecorator {

    return function (constructor: Function) {
        //URGENT TODO: Add some way of getting the google id/data from the user
        //TODO: Avoid using this fakeclass method
        //TODO: Throw error if there are repeat providers
        const fakeClass = { constructor: constructor }
        Column('varchar')(fakeClass, 'googleId')
        Column('simple-json')(fakeClass, 'googleData')


        providerNames.forEach((providerName) => {
            const Provider = providers[providerName]
            const provider = new Provider(constructor)
            provider.addProvider()
        })
    }
}