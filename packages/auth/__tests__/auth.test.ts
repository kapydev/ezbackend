import { EzApp, EzBackend, EzBackendOpts, Type } from "@ezbackend/common";
import { EzAuth, EzUser, GoogleProvider } from "../src"
import path from 'path'
import dotenv from 'dotenv'

//TODO: Figure if there is a better way of getting this data
function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}


describe("Plugin Registering", () => {

    const envPath = path.resolve(__dirname, "../../../.env")

    dotenv.config({ path: envPath })


    let app: EzBackend

    const defaultConfig = {
        server: {
            logger: false
        },
        auth: {
            secretKey: process.env.SECRET_KEY,
            google: {
                googleClientId: process.env.GOOGLE_CLIENT_ID,
                googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }
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

    it("Should be able to create a user object", async () => {

        const testUser = new EzUser('user', ['google'])

        app.addApp('user', testUser, { prefix: 'user' })

        await app.start(defaultConfig)
    })

    it("Should be able to create a user object using the Provider", async () => {

        const testUser = new EzUser('user', [GoogleProvider])

        app.addApp('user', testUser, { prefix: 'user' })

        await app.start(defaultConfig)
    })

    it("Should not be able to create a user object using an unknown Provider", async () => {

        let errorThrown = false
        try {
            const testUser = new EzUser('user', ['hahahaha'])

            app.addApp('user', testUser, { prefix: 'user' })

            await app.start(defaultConfig)
        } catch {
            errorThrown = true
        } finally {
            expect(errorThrown).toBe(true)
            await app.start(defaultConfig)

        }

    })

    it("Should be able to create user object with additional metadata", async () => {
        new EzUser('user', ['google'], {
            isAdmin: {
                type: Type.BOOL,
                default: false
            }
        })

        await app.start(defaultConfig)
    })



    // it("Should throw an error if the Client ID and Secret are not defined", async () => {

    //     const testUser = new EzUser('user', ['google'])

    //     app.addApp('user', testUser, { prefix: 'user' })

    //     await app.start({
    //         server: {
    //             logger: false
    //         },
    //         auth: {
    //             secretKey: process.env.SECRET_KEY,
    //             google: {
    //                 googleClientId: undefined,
    //                 googleClientSecret: undefined,
    //             }
    //         }
    //     })
    // })

    it("Should not create user with non-nullable non-defaultable metadata", async () => {

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

    it("Should not create user with non-nullable non-defaultable metadata (2nd Method)", async () => {

        let errorThrown = false

        try {
            new EzUser('user', ['google'], {
                isAdmin: {
                    type: Type.BOOL
                }
            })
        } catch {
            errorThrown = true
        } finally {
            expect(errorThrown).toBe(true)
            await app.start(defaultConfig)

        }
    })

    it("User must not create a column with googleId, because it is auto-generated", async () => {
        let errorThrown = false

        try {
            new EzUser('user', ['google'], {
                googleId: {
                    type: Type.INT,
                    nullable: true
                }
            })
        } catch {
            errorThrown = true
        } finally {
            expect(errorThrown).toBe(true)
            await app.start(defaultConfig)
        }
    })

    it("User must not create a column with googleData, because it is auto-generated", async () => {
        let errorThrown = false

        try {
            new EzUser('user', ['google'], {
                googleData: {
                    type: Type.JSON,
                    nullable: true
                }
            })
        } catch {
            errorThrown = true
        } finally {
            expect(errorThrown).toBe(true)
            await app.start(defaultConfig)
        }
    })

    it("Should have the correct callback URL in production", async () => {
        const googleProvider = new GoogleProvider("test")
        process.env = {
            ...process.env,
            NODE_ENV: 'production',
            PRODUCTION_URL: "https://mywebsite.com"
        }

        await app.start(defaultConfig)

        const server = app.getInternalServer()

        const callbackURL = googleProvider.getCallbackURL(server)
        expect(callbackURL).toBe(`${process.env.PRODUCTION_URL}/auth/google/callback`)
    })

    it.todo("Should have the correct callbackURL in development")
    //NOTE: CallbackURL in development must have preslash

})