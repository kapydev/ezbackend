/*TODO: Implement guards at the:
1. App level (probably using a hook)
2. Route level
*/

import { EzApp, EzBackend } from "@ezbackend/common";
import path from 'path'
import dotenv from 'dotenv'
import Boom from '@hapi/boom'
import { RouteShorthandOptionsWithHandler } from "fastify";

//TODO: Figure if there is a better way of getting this data
function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}

describe("Plugin Registering", () => {

    dotenv.config()

    let app: EzBackend

    const defaultConfig = {
        port: 3000,
        server: {
            logger: false
        },
        auth: {
            secretKeyPath: path.resolve(__dirname, "./testing-not-secret-key"),
            google: {
                googleClientId: process.env.GOOGLE_CLIENT_ID,
                googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
                backendURL: process.env.BACKEND_URL,
                scope: ['profile'],
                successRedirectURL: "http://localhost:8888/docs",
                failureRedirectURL: "http://localhost:8888/docs"
            }
        }
    }

    beforeEach(() => {
        app = new EzBackend()

        //Prevent server from starting
        app.removeHook("_run", "Run Fastify Server")
    })

    afterEach(async () => {
        const instance = getInternalInstance(app)
        await instance.orm.close();
        await instance._server.close();
    });

    it("Should be able to guard using an app", async () => {

        const v1Namespace = new EzApp()

        app.addApp('v1', v1Namespace, { prefix: 'v1' })

        const guard = new EzApp()
        guard.addHook('onRequest',async (req,res) => {})

        guard.addHook('preHandler', async(req,res) => {
            //@ts-ignore
            if (req.user === undefined) {
                throw Boom.unauthorized()
            }
        })

        const testApp = new EzApp()

        type x = RouteShorthandOptionsWithHandler

        testApp.get('/', async(req,res) => {
            return {hello: 'world'}
        })

        v1Namespace.addApp('guard', guard)
        guard.addApp('testApp', testApp, {prefix: 'test'})

        await app.start(defaultConfig)

        const result = await app.inject({
            method: "GET",
            url: "v1/test",
        })

        expect(result.statusCode).toBe(401)

    })

    it("Should be able to guard on the same app", async () => {

        const v1Namespace = new EzApp()

        app.addApp('v1', v1Namespace, { prefix: 'v1' })

        const testApp = new EzApp()
        
        testApp.addHook('preHandler', async(req,res) => {
            //@ts-ignore
            if (req.user === undefined) {
                throw Boom.unauthorized()
            }
        })

        testApp.get('/', async(req,res) => {
            return {hello: 'world'}
        })

        v1Namespace.addApp('testApp', testApp, {prefix: 'test'})

        await app.start(defaultConfig)

        const result = await app.inject({
            method: "GET",
            url: "v1/test",
        })

        expect(result.statusCode).toBe(401)

    })

    it("Should be able to guard specific model routes", async () => {

        const v1Namespace = new EzApp()

        app.addApp('v1', v1Namespace, { prefix: 'v1' })

        const testApp = new EzApp()

        testApp.addHook('preHandler', async(req,res) => {
            //@ts-ignore
            if (req.user === undefined) {
                throw Boom.unauthorized()
            }
        })

        testApp.get('/', async(req,res) => {
            return {hello: 'world'}
        })

        v1Namespace.addApp('testApp', testApp, {prefix: 'test'})

        await app.start(defaultConfig)

        const result = await app.inject({
            method: "GET",
            url: "v1/test",
        })

        expect(result.statusCode).toBe(401)

    })

})