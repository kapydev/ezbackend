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
})

afterAll(async () => {
    const instance = getInternalInstance(app)
    await instance.orm.close();
    await instance._server.close();
});

describe("DB UI Endpoints", () => {
    it("Should run even with nested instances", async () => {
        //---Plugins---
        app.addApp('db-ui', new EzDbUI())
        //---Plugins---

        const userDetails = new EzModel('UserDetails', {
            company: Type.VARCHAR,
            age: Type.INT,
            score: Type.FLOAT
        })

        const session = new EzModel('Session', {
            name: Type.VARCHAR,
            users: {
                type: Type.ONE_TO_MANY,
                target: 'User',
                inverseSide: 'session',
                eager: true
            }
        })

        const user = new EzModel('User', {
            name: Type.VARCHAR,
            age: Type.INT,
            userDetails: {
                type: Type.ONE_TO_ONE,
                joinColumn: true,
                cascade: true,
                eager: true,
                target: 'UserDetails'
            },
            session: {
                type: Type.MANY_TO_ONE,
                target: 'Session',
                inverseSide: 'users'
            }
        })

        app.addApp('User', user, { prefix: 'user' })
        app.addApp('Session', session, { prefix: 'session' })
        app.addApp('UserDetails', userDetails, { prefix: 'user-details' })

        app.removeHook('_run',"Run Fastify Server")

        async function run() {
            await app.start()
            await app.getInternalServer().inject({
                method: 'get',
                url: '/'
            })
        }

        await run()
    })
    it.skip("Should have the required schemas", async () => {

    })

    it.skip("Should have the required APIs exposing the models", async () => {

    })

    it.skip("Should render the DB-UI", async () => {

    })
})