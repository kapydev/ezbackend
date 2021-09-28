import { EzBackend, EzModel, Type } from "../src";
import { kRoutePrefix } from "fastify/lib/symbols"

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

    it("Injection before starting should fail", async () => {

        let mock = jest.fn()

        try  {
            await app.inject({
                method: "GET",
                url: "/"
            })
        } catch {
            mock()
        } finally {
            await app.start(defaultConfig)
            expect(mock.mock.calls.length).toBe(1)
        }

    })

})