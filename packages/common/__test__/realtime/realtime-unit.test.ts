import { EzBackend, EzApp, Type, RuleType } from "../../src"

describe("Should be able to get io object", () => {

    let app: EzBackend
    let child: EzApp
    let nestedChild: EzApp

    beforeEach(() => {
        app = new EzBackend()
        child = new EzApp()
        nestedChild = new EzApp()

        app.addApp(child, { prefix: "child" })
        child.addApp(nestedChild,{prefix: "nested-child"})

        app.removeHook("_run","Run Fastify Server")
    })

    afterEach(async() => {
        const instance=  app.getInternalInstance()
        await instance.orm.close()
        await instance._server.close()
    })

    test("Get with namespace", async () => {

        let handlerRan = false

        nestedChild.setHandler("Check SocketIO", async (instance, opts) => {
            handlerRan = true
            expect(nestedChild.getSocketIO().name).toBe("/child/nested-child")
        })

        await app.start({
            server: {
                logger: false
            }
        })

        expect(handlerRan).toBe(true)
    })

    test("Get without namespace", async () => {
        nestedChild.setHandler("Check SocketIO", async (instance, opts) => {
            expect(nestedChild.getSocketIORaw().name).toBe('/')
        })

        await app.start({
            server: {
                logger: false
            }
        })

    })
})