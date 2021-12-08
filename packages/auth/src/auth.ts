import { EzApp, EzBackendOpts } from '@ezbackend/common'
import fastifySecureSession, { SecureSessionPluginOptions } from 'fastify-secure-session'
import fs, { PathLike } from 'fs'

import { EzError } from '@ezbackend/utils'
import { PluginScope } from '@ezbackend/core'
import dedent from 'dedent-js'
import fastifyPassport from 'fastify-passport'
import path from 'path'

export interface EzBackendAuthOpts {
    secretKey?: string
    secretKeyPath?: PathLike,
    successRedirectURL: string,
    failureRedirectURL: string,
    fastifySecureSession: SecureSessionPluginOptions
}

declare module "@ezbackend/common" {
    interface EzBackendOpts {
        auth: EzBackendAuthOpts
    }
}

export const defaultConfig: EzBackendOpts['auth'] = {
    secretKey: process.env.SECRET_KEY ?? undefined,
    secretKeyPath: path.join(process.cwd(), 'secret-key'),
    successRedirectURL: process.env.AUTH_SUCCESS_REDIRECT ?? "http://localhost:8000/db-ui",
    failureRedirectURL: process.env.AUTH_FAILURE_REDIRECT ?? "http://localhost:8000/db-ui",
    fastifySecureSession: {
        //URGENT TODO: Make the process of getting the key type consistent
        key: '',
        cookie: {
            path: '/',
            sameSite: 'none',
            secure: true,
            httpOnly: true
        }
    },
    google: {
        googleClientId: process.env.GOOGLE_CLIENT_ID!,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        scope: ['profile','email']
    }
}

function getKey(opts: EzBackendOpts['auth']) {
    let key: Buffer = Buffer.alloc(32)

    if (opts.secretKey && (opts.secretKeyPath && fs.existsSync(opts.secretKeyPath))) {

        throw new EzError("Can only define one secret key!",
        "Your secret key can be in the secretKeyPath (default filename 'secret-key') or in your environment variable SECRET_KEY ONLY",
        dedent`
        Pick ONE only:

        In .env:
        SECRET_KEY=my-super-secret-key-longer-than-32-bytes

        A file in your working directory with filename 'secret-key'
        my-super-secret-key-longer-than-32-bytes
        `)
    }

    if (typeof opts.secretKey === "string") {
        key.write(opts.secretKey)
    }

    else if (opts.secretKeyPath && fs.existsSync(opts.secretKeyPath)) {
        key = Buffer.from(fs.readFileSync(opts.secretKeyPath), undefined, 32)
        //TODO: I think this command may fail intermittently producing the wrong output strangely enough
    } else {
        throw new EzError(
            `Secret key not found at path ${opts.secretKeyPath}`,
            "The file 'secret-key' is used to hash the user's session (Seperate from google credentials)",
            dedent`
            Run command in root of project (Same folder as package.json)

            linux terminal: ./node_modules/.bin/secure-session-gen-key > secret-key
            cmd prompt:     node_modules\\.bin\\secure-session-gen-key > secret-key
            powershell:     ./node_modules/.bin/secure-session-gen-key | Out-File -FilePath secret-key -Encoding default -NoNewline
            `
        )
    }

    return key
}

//TODO: Make this of EzApp type instead
export class EzAuth extends EzApp {
    constructor() {
        super()

        this.setDefaultOpts(defaultConfig)

        this.setHandler("Add Fastify Secure Session", async (instance, fullOpts) => {

            const opts = this.getOpts('auth', fullOpts)

            const key = getKey(opts)

            if ('key' in opts.fastifySecureSession && opts.fastifySecureSession.key === '') {
                opts.fastifySecureSession.key = key
            }

            instance.server.register(fastifySecureSession, opts.fastifySecureSession)
        })

        this.setHandler("Add Fastify Passport", async (instance, opts) => {
            instance.server.register(fastifyPassport.initialize())
            instance.server.register(fastifyPassport.secureSession())
        })

        this.scope = PluginScope.PARENT

    }
}
