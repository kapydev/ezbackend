import { EzBackend, EzModel, Type } from "../src";

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

    it("router => for => hook syntax should work", async () => {

        const mock1 = jest.fn()

        const testModel = new EzModel("test", {
            var1: Type.VARCHAR
        })

        app.addApp("test", testModel, { prefix: "test" })

        testModel.router.for('createOne').preHandler(async (req, res) => {
            mock1()
        })


        await app.start(defaultConfig)

        await app.inject({
            method: "POST",
            url: "/test",
            payload: {
                var1: "hello world"
            }
        })

        expect(mock1.mock.calls.length).toBe(1)

    })

})