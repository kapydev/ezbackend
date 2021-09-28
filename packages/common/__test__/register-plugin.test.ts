import { EzBackend } from "../src";
import { kRoutePrefix } from "fastify/lib/symbols"
import { FastifyInstance } from 'fastify'

//TODO: Figure if there is a better way of getting this data
function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}

describe("Plugin Registering", () => {
    let app: EzBackend

    const defaultConfig = {
        port: 3000,
        server: {
            logger:false
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

    it("Top level plugin should be properly prefixed", async () => {
        app.setHandler("Register plugin", async (instance, opts) => {
            instance.server.register(async (server, opts) => {
                expect(server[kRoutePrefix]).toBe("/prefix")
            }, { prefix: "prefix" })
        })
        await app.start(defaultConfig)
    })

    it("Reply decorators should exist", async () => {
        app.setHandler("Register plugin", async (instance, opts) => {
            instance.server.decorateReply('decorator1', "test")
            // expect(instance.server.hasReplyDecorator('decorator1')).toBe(true)

            instance.server.register(async (server: FastifyInstance, opts) => {
                server.decorateReply('decorator2', "test")
                expect(server.hasReplyDecorator('decorator1')).toBe(true)

                server.register(async (server, opts) => {
                    expect(server.hasReplyDecorator('decorator1')).toBe(true)
                    expect(server.hasReplyDecorator('decorator2')).toBe(true)

                })
            })
        })
        await app.start(defaultConfig)
    })

    // it("Fastify plugins should have global scope", async () => {

    //     let servers = []

    //     app.setHandler("Register plugin", async (instance, opts) => {

    //         const plugin = fp(async (server: FastifyInstance, opts) => {
    //             servers.push(server)
    //         })

    //         instance.server.register(plugin)
    //     })

    //     app.setRun("Get internal server object", async (instance, opts) => {
    //         servers.push(instance._server)

    //     })

    //     await app.start(defaultConfig)
    //     expect(servers[0]).toBe(servers[1])

    // })

    // it("Fastify plugins within apps should have global scope", async () => {
    //     let servers = []

    //     let childPluginApp = new App()

    //     app.setHandler("Register plugin", async (instance, opts) => {
    //         servers.push(instance.server)
    //     })

    //     childPluginApp.setHandler("Register plugin", async (instance, opts) => {

    //         const plugin = fp(async (server: FastifyInstance, opts) => {
    //             servers.push(server)
    //         })

    //         instance.server.register(plugin)
    //     })

    //     app.addApp("Child Plugin App", childPluginApp)
    //     await app.start(defaultConfig)
    //     console.log(servers[0])
    //     expect(servers[0]).toBe(servers[1])

    // })
})