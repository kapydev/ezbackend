import { PluginScope, App } from '@ezbackend/core'
import { EzApp } from '@ezbackend/common'
import { EzError } from '@ezbackend/utils'
import fastifySecureSession from 'fastify-secure-session'
import fastifyPassport, { Authenticator } from 'fastify-passport'
import 'fastify-cookie'
import { logIn, logOut, isAuthenticated, isUnauthenticated } from 'fastify-passport/dist/decorators'
import fs from 'fs'
import flash from 'connect-flash'
import { AuthenticationRoute } from 'fastify-passport/dist/AuthenticationRoute'

const wrap = (middleware: Function, opts: any = {}) => (socket: any, next: any) => middleware(socket.request, opts, next);

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
            instance.server.addHook('onRequest', async(req:any,res:any) => {
                console.log(req.cookies)
            })

            this.getSocketIORaw().use((socket,next) => {
                if (socket.request.headers.cookie) {

                    //TODO: Figure out why there are no parse cookie types
                    //@ts-ignore
                    const parsedCookie = instance._server.parseCookie(socket.request.headers.cookie)
                    //@ts-ignore
                    socket.request.session = instance._server.decodeSecureSession(parsedCookie.session)
                }

                // 
                next()
            })

            function createInitializePluginForConnectMiddleware(passport: Authenticator) {
                return ((req: any, res: any, next: any) => {
                    flash()(req, res, () => {
                        req['passport'] = passport
                        req['logIn'] = logIn
                        req['login'] = logIn
                        req['logOut'] = logOut
                        req['logout'] = logOut
                        req['isAuthenticated'] = isAuthenticated
                        req['isUnauthenticated'] = isUnauthenticated
                        req[passport.userProperty] = null
                        next()
                    })
                })
            }

            function createSecureSessionPluginForConnectMiddleware(passport: Authenticator) {
                return ((req: any, res: any, next: any) => {
                    req.log = {trace : () => {}}
                    new AuthenticationRoute(passport, 'session', {}).handler(req, res).then(() => {
                        next()
                    })
                })
            }

            this.getSocketIORaw().use(wrap(createInitializePluginForConnectMiddleware(fastifyPassport)))
            this.getSocketIORaw().use(wrap(createSecureSessionPluginForConnectMiddleware(fastifyPassport)))
        })

        this.scope = PluginScope.PARENT

    }
}