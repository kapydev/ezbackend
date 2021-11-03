import { EzApp, EzBackend, EzBackendOpts, Type } from "@ezbackend/common";
import { EzAuth, EzUser } from "../src"
import path from 'path'
import dotenv from 'dotenv'

//TODO: Figure if there is a better way of getting this data
function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}


describe("Plugin Registering", () => {

    const envPath = path.resolve(__dirname, "../../../.env")

    dotenv.config({path:envPath})

    let app: EzBackend

    const defaultConfig= {
        server: {
            logger:false
        }
    }

    beforeEach(() => {
        app = new EzBackend()

        app.addApp(new EzAuth())

        //Prevent server from starting
        app.removeHook("_run", "Run Fastify Server")
    })

    afterEach(async () => {
        const instance = getInternalInstance(app)
        await instance.orm.close();
        await instance._server.close();
    });

    //NOTE: These tests are only able to run locally for now
    //TODO: Make these tests runnable on remote
    it("Should be able to create a user object", async () => {

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

    it("Should be able to create user object with additional metadata", async () => {

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

    it("Should not be able to create user object with non-nullable non-defaultable metadata", async () => {

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