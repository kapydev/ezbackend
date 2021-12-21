import { EzApp, EzBackendOpts } from '@ezbackend/common';
import { PluginScope } from '@ezbackend/core';
import { EzError } from '@ezbackend/utils';
import dedent from 'dedent-js';
import 'fastify-cookie';
import fastifyPassport from 'fastify-passport';
import fastifySecureSession, {
  SecureSessionPluginOptions
} from 'fastify-secure-session';
import fs, { PathLike } from 'fs';
import path from 'path';

export interface EzBackendAuthOpts {
  secretKey?: string;
  secretKeyPath?: PathLike;
  successRedirectURL: string;
  failureRedirectURL: string;
  fastifySecureSession: SecureSessionPluginOptions;
}

declare module '@ezbackend/common' {
  interface EzBackendOpts {
    auth: EzBackendAuthOpts;
  }
}

declare module "socket.io" {
  interface Socket {
    user: any
  }

}

export const defaultConfig: EzBackendOpts['auth'] = {
  secretKey: process.env.SECRET_KEY ?? undefined,
  secretKeyPath: path.join(process.cwd(), 'secret-key'),
  successRedirectURL:
    process.env.AUTH_SUCCESS_REDIRECT ?? 'http://localhost:8000/db-ui',
  failureRedirectURL:
    process.env.AUTH_FAILURE_REDIRECT ?? 'http://localhost:8000/db-ui',
  fastifySecureSession: {
    // URGENT TODO: Make the process of getting the key type consistent
    key: '',
    cookie: {
      path: '/',
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  google: {
    googleClientId: process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    scope: ['profile', 'email']
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
        `,
    );
  }

  if (typeof opts.secretKey === 'string') {
    key.write(opts.secretKey);
  } else if (opts.secretKeyPath && fs.existsSync(opts.secretKeyPath)) {
    key = Buffer.from(fs.readFileSync(opts.secretKeyPath), undefined, 32);
    // TODO: I think this command may fail intermittently producing the wrong output strangely enough
  } else {
    throw new EzError(
      `Secret key not found at path ${opts.secretKeyPath}`,
      "The file 'secret-key' is used to hash the user's session (Seperate from google credentials)",
      dedent`
            Run command in root of project (Same folder as package.json)

            linux terminal: ./node_modules/.bin/secure-session-gen-key > secret-key
            cmd prompt:     node_modules\\.bin\\secure-session-gen-key > secret-key
            powershell:     ./node_modules/.bin/secure-session-gen-key | Out-File -FilePath secret-key -Encoding default -NoNewline
            `,
    );
  }

  return key;
}

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

    this.setHandler("Add Fastify Passport", async (instance, fullOpts) => {
      instance.server.register(fastifyPassport.initialize())
      instance.server.register(fastifyPassport.secureSession())

      // this.getSocketIORaw().use((socket, next) => {
      //     if (socket.request.headers.cookie) {

      //         //TODO: Figure out why there are no parse cookie types
      //         //@ts-ignore
      //         const parsedCookie = instance._server.parseCookie(socket.request.headers.cookie)
      //         //@ts-ignore
      //         socket.request.session = instance._server.decodeSecureSession(parsedCookie.session)
      //     }

      //     next()
      // })
    })

    this.setHandler("Add Passport User Deserializer to Socket.io", async (instance, fullOpts) => {
      const opts = this.getOpts('auth', fullOpts)

      this.getSocketIORaw().use((socket, next) => {
        const headers = socket.request.headers
        const cookieString = headers[opts.fastifySecureSession.cookieName ?? 'session']

        if (typeof cookieString !== 'string') return next()

        const session = instance._server.decodeSecureSession(cookieString)

        if (session === null) return next()

        const serializedUser = session.get('passport')

        //URGENT TODO: Since types don't sufficiently overlap we should think of how we can make it cleaner
        fastifyPassport.deserializeUser(serializedUser, socket.request as any)
          .then((deserializedUser) => {
            socket.user = deserializedUser
            next()

          })
          .catch(e => {
            next(e)
          })


      })
    })



    this.scope = PluginScope.PARENT

  }
}
