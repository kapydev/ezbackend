import { EzBackend, EzModel, Type } from "../../common/src";
import { EzOpenAPI } from '../src'
import { FastifyInstance } from 'fastify'


//TODO: Figure if there is a better way of getting this data
function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}

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

describe("Basic Usage", () => {
    it("Should be able to render the docs", async () => {
        app.addApp('openapi', new EzOpenAPI())

        await app.start(defaultConfig)

        const server: FastifyInstance = getInternalInstance(app)._server

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

        await app.start(defaultConfig)

        const server: FastifyInstance = getInternalInstance(app)._server

        const response = await server.inject({
            method: "GET",
            url: "/docs/json",
        })

        expect(JSON.parse(response.body)['components']).toMatchSnapshot()
    })

})