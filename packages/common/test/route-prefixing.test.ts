import { EzBackend } from "@ezbackend/common"
import { App } from "@ezbackend/core"
import { getInternalInstance } from "./helpers"
import fastify from "fastify"
import override from "fastify/lib/pluginOverride"

const startOpts = {
    port: 3000,
    server: {
    },
    orm: {
        type: "sqlite",
        database: ":memory:",
        synchronize: true
    }
}

const schema = {
    $id: 'schemaId',
    type: 'object',
    properties: {
        hello: { type: 'string' }
    }
}

describe("Shared Schemas", () => {

    let app: EzBackend

    beforeEach(() => {
        app = new EzBackend()
    })

    async function checkSchemaAccess(app:App) {
        const v1 = new App()
        const modelStub = new App()
        const routerStub = new App()

        app.addApp('v1', v1)
        v1.addApp('model', modelStub)
        modelStub.addApp('router', routerStub)

        let preHandlerSchema

        routerStub.setPreHandler(`Add Create Schema`, async (instance, opts) => {
            instance.server.addSchema(schema)
            preHandlerSchema = instance.server.getSchemas()
        })

        routerStub.setHandler('Simulate Route generation', async (instance, opts) => {
            expect(instance.server.getSchemas()).toEqual(preHandlerSchema)

            instance.server.register(async (server, opts) => {
                expect(server.getSchemas()).toEqual(preHandlerSchema)
                console.log('oi')
            })
        })

        await app.start(startOpts)
    }

    it("Should work with the app stub", async () => {
        const appStub = new App()
        appStub.setInit('Create Fastify Server', async (instance, opts) => {
            instance.server = fastify(opts.server)
        })
        appStub.setCustomOverride("server", override)

        appStub.setRun("Run Fastify Server", async(instance,opts) => {
            await instance.server.listen()
        })

        await checkSchemaAccess(appStub)

        const instance = getInternalInstance(app)
        await instance.server.close()

    })
    it("It should be able to access the schema across apps", async () => {

        await checkSchemaAccess(app)
        
        const instance = getInternalInstance(app)
        await instance.server.close()
        await instance.orm.close()

    })
})
