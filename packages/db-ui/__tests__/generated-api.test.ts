import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { EzBackend, EzModel, Type } from "@ezbackend/common"
import { App } from "@ezbackend/core"
import { EzDbUI } from '../src'

//TODO: Figure if there is a better way of getting this data
function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}

let app: EzBackend

beforeAll(async () => {
    app = new EzBackend()

    const myFirstModel = new EzModel('firstModel', {
        var1: Type.FLOAT
    })

    //TODO: Make them non colliding with the same name if in different scopes? (How tho, background decollision stuff? What about existing db tables?) Can reference how typeorm does it I guess
    const mySecondModel = new EzModel('secondModel', {
        var2: Type.VARCHAR
    })

    const namespace1 = new App()

    namespace1.addApp('First Model', myFirstModel, { prefix: "first-model" })

    app.addApp("Namespace 1", namespace1, { prefix: 'ns1' })
    app.addApp("Second Model", mySecondModel, { prefix: 'second-model' })

    //Remove the run server hook so we don't start an actual server
    app.removeHook("_run", "Run Fastify Server")

    //Add the db-ui app
    app.addApp('db-ui', new EzDbUI())

    await app.start({
        port: 3000,
        server: {
            logger:false
        }
    })
})

afterAll(async () => {
    const instance = getInternalInstance(app)
    await instance.orm.close();
    await instance._server.close();
});

describe("DB UI Endpoints", () => {
    it.skip("Should have the required schemas", async () => {

    })

    it.skip("Should have the required APIs exposing the models", async () => {

    })

    it.skip("Should render the DB-UI", async () => {
        
    })
})