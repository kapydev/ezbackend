import { EzBackend, EzModel, Type } from "@ezbackend/common";
import { EzOpenAPI } from '../src'
import { FastifyInstance } from 'fastify'
import {kHooks} from 'fastify/lib/symbols'


//TODO: Figure if there is a better way of getting this data
function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}

let app: EzBackend

const defaultConfig = {
    port: 3000,
    server: {
    },
    orm: {
        type: "sqlite",
        database: ":memory:",
        synchronize: true
    }
}

beforeEach(() => {
    app = new EzBackend()

    //Prevent server from starting
    app.removeHook("_run", "Run Fastify Server")
})

afterAll(async () => {
    const instance = getInternalInstance(app)
    await instance.orm.close();
    await instance.server.close();
});

describe("Basic Usage", () => {
    it("Should be able to render the docs", async () => {
        app.addApp('openapi', new EzOpenAPI())

        await app.start(defaultConfig)

        const server: FastifyInstance = getInternalInstance(app).server

        const response = await server.inject({
            method: "GET",
            url: "/docs/static/index.html",
        })

        expect(response.statusCode).toBe(200)
    })

    it("Should have schemas", async () => {

        app.addApp('openapi', new EzOpenAPI())

        const dummyModel = new EzModel('model', {
            var1: Type.VARCHAR,
            var2: Type.VARCHAR
        })

        app.addApp('model', dummyModel)

        dummyModel.apps.get('Router').setPostRun("Check schemas", async (instance, opts) => {
            // console.log(instance.server.getSchemas())
        })

        await app.start(defaultConfig)

        const server: FastifyInstance = getInternalInstance(app).server

        const response = await server.inject({
            method: "GET",
            url: "/docs/json",
        })

        console.log(JSON.parse(response.body)['components'])
    })

    it("Register hook should run", async () => {
        app.setHandler("Add register hook", async (instance, opts) => {
            const server: FastifyInstance = instance.server
            server.addHook('onRegister', async (server) => {
                console.log("A register has been called!")
                console.log(server[kHooks])
            })

            server.addHook('onRoute', (routeOptions) => {
                console.log('Route added')
            })

            console.log('hooks',server[kHooks])

            server.register(async (server, opts) => {
                console.log("Registering")
            })
        })

        await app.start(defaultConfig)
    })
})