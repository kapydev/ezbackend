import { EzApp, EzBackend, EzBackendOpts, EzModel, Type } from "@ezbackend/common";
import { EzAuth, EzUser, GoogleProvider, Providers } from "../src"
import path from 'path'
import dotenv from 'dotenv'
import { FastifyRequest, FastifyReply } from "fastify";
import { DeserializeFunction } from "fastify-passport/dist/Authenticator";

class Flag {

    private resolver: undefined | ((value: unknown) => void)
    private myPromise: Promise<unknown>

    constructor() {
        this.myPromise = new Promise((resolve, reject) => {
            this.resolver = resolve
        })
    }

    setDone() {
        this.resolver?.(undefined)
    }

    async isDone() {
        await this.myPromise
        return true
    }

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
        const instance = app.getInternalInstance()
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

        process.env = {
            ...process.env,
            NODE_ENV: 'test',
            PRODUCTION_URL: "https://mywebsite.com"
        }
    })

    it("Should have the correct callbackURL in development", async () => {
        const googleProvider = new GoogleProvider("test")
        process.env = {
            ...process.env,
            PRODUCTION_URL: "https://mywebsite.com"
        }

        await app.start(defaultConfig)

        const server = app.getInternalServer()

        const callbackURL = googleProvider.getCallbackURL(server)
        //NOTE: CallbackURL in development must have preslash
        expect(callbackURL).toBe(`/auth/google/callback`)
    })

    it.todo("Test that the callbackURL is correct even for child apps")

    describe("Logout Handler", () => {
        it("The logout handler should logout and redirect the user", async () => {
            const googleProvider = new GoogleProvider("test")

            let loggedOut: boolean = false
            let redirectedURL: string | undefined = undefined

            const flag = new Flag()

            const mockReq = {
                logOut: async () => {
                    loggedOut = true
                }
            }

            const mockRes = {
                redirect: (redirectURL: string) => {
                    redirectedURL = redirectURL
                    flag.setDone()
                }
            }

            const mockOpts = {
                successRedirectURL: "https://myfrontend.com"
            }

            googleProvider.defaultLogoutHandler(
                mockReq as FastifyRequest,
                mockRes as FastifyReply,
                mockOpts
            )

            await flag.isDone()
            expect(loggedOut).toBe(true)
            expect(redirectedURL).toBe("https://myfrontend.com")

            await app.start(defaultConfig)

        })
    })

    describe("User Serialization", () => {
        it("User serializer should just return the same value", async () => {

            const googleProvider = new GoogleProvider("test")

            //TODO: Split the functions according to those that require the server to run and those that don't
            await app.start(defaultConfig)

            const serializeFunction = googleProvider.registerUserSerializer(app.getInternalInstance(), {})

            const objectForSerialization = 1

            const id = await serializeFunction(objectForSerialization, {} as FastifyRequest)

            expect(id).toBe(objectForSerialization)


        })
    })

    describe("Callback Handler", () => {
        let mockUserModel

        beforeEach(() => {
            mockUserModel = new EzModel("MockUser", {
                googleId: {
                    type: Type.INT,
                    nullable: true,
                    unique: true
                },
                googleData: {
                    type: Type.JSON,
                    nullable: true
                }
            })

            app.addApp(mockUserModel)
        })

        it("Callback Handler should properly serialize a user", async () => {

            const googleProvider = new GoogleProvider("MockUser")

            await app.start(defaultConfig)

            const { err, user } = await new Promise((resolve, reject) => {
                googleProvider.defaultCallbackHandler(
                    app.getInternalInstance(),
                    1,
                    { displayName: "Thomas" },
                    (err: any, user: any) => resolve({ err, user })
                )
            })

            expect(err).toBe(undefined)
            expect(user).toBe('google-1')

        })

        it("A user who already has an account should be serialized properly", async () => {
            const googleProvider = new GoogleProvider("MockUser")

            await app.start(defaultConfig)

            await new Promise((resolve, reject) => {
                googleProvider.defaultCallbackHandler(
                    app.getInternalInstance(),
                    1,
                    { displayName: "Thomas" },
                    (err: any, user: any) => resolve({ err, user })
                )
            })

            const { err, user } = await new Promise((resolve, reject) => {
                googleProvider.defaultCallbackHandler(
                    app.getInternalInstance(),
                    1,
                    { displayName: "Thomas" },
                    (err: any, user: any) => resolve({ err, user })
                )
            })

            expect(err).toBe(undefined)
            expect(user).toBe('google-1')
        })

        describe("User Deserializing", () => {

            let googleProvider: GoogleProvider
            let deserializer: DeserializeFunction
            const mockReq = {} as FastifyRequest
            const userDetails = {
                googleId: 1,
                googleData: {
                    displayName: "Thomas"
                }
            }

            beforeEach(async () => {
                googleProvider = new GoogleProvider("MockUser")

                await app.start(defaultConfig)

                

                const { err, user } = await new Promise((resolve, reject) => {
                    googleProvider.defaultCallbackHandler(
                        app.getInternalInstance(),
                        userDetails.googleId,
                        userDetails.googleData,
                        (err: any, user: any) => resolve({ err, user })
                    )
                })

                deserializer = googleProvider.registerUserDeserializer(
                    app.getInternalInstance(),
                    {}
                )
            })

            it("Should get a user already in the database", async () => {
                const user = await deserializer('google-1', mockReq)
                expect(user).toEqual({
                    id: 1,
                    ...userDetails
                })
            })

            it("Should return null for a user not in the database", async () => {
                const user = await deserializer('google-99999', mockReq)
                expect(user).toBe(null)
            })

            it("Should not get wrong even if there are dashes in the ID", async () => {
                const user = await deserializer('google-1-1', mockReq)
                expect(user).toBe(null)
            })

            it("Should throw the string 'pass' when the provider name is different", async () => {
                let errored = false
                try {
                    const user = await deserializer('facebook-1', mockReq)
                } catch(e) {
                    //THIS NEEDS TO BE EXACTLY THE STRING PASS, according to the fastify passport specification
                    expect(e).toBe("pass")
                    errored = true
                } finally {
                    expect(errored).toBe(true)
                }
            })

        })
    })
})