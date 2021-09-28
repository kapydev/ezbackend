import { EzApp, EzBackend, EzModel, Type } from "@ezbackend/common";
import { EzUser } from "@ezbackend/auth"
import path from 'path'
import dotenv from 'dotenv'

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
            logger:false
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

    //NOTE: These tests are only able to run locally for now
    it.skip("Should be able to create a user object", async () => {

        const v1Namespace = new EzApp()

        app.addApp('v1', v1Namespace, { prefix: 'v1' })

        const testUser = new EzUser('user', ['google'])

        v1Namespace.addApp('user', testUser, { prefix: 'user' })


        await app.start(defaultConfig)

        await app.inject({
            method: "POST",
            url: "/test",
            payload: {
                var1: "hello world"
            }
        })

    })

    it.skip("Should be able to create user object with additional metadata", async () => {

        const v1Namespace = new EzApp()

        app.addApp('v1', v1Namespace, { prefix: 'v1' })

        const testUser = new EzUser('user', ['google'], {
            isAdmin: {
                type: Type.BOOL,
                default: false
            }
        })

        v1Namespace.addApp('user', testUser, { prefix: 'user' })

        await app.start(defaultConfig)

    })

    it.skip("Should not be able to create user object with non-nullable non-defaultable metadata", async () => {

        let errorThrown = false

        try {
            new EzUser('user', ['google'], {
                isAdmin: Type.BOOL
            })
        } catch {
            errorThrown = true
        } finally {
            expect(errorThrown).toBe(true)
            await app.start(defaultConfig)

        }
    })

})