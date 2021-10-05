import { Type } from '../dist'
import {EzBackend, EzModel} from '../src'

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
    })

    afterEach(async () => {
        const instance = getInternalInstance(app)
        await instance.orm.close();
        await instance._server.close();
    });

    test("Schemas should be able to be prefixes of one another", async () => {
        const modelFull = new EzModel('prefixSuffix',{
            name: Type.VARCHAR
        })
        const modelPrefixOnly = new EzModel('prefix', {})
        app.addApp('full', modelFull, {prefix: 'full'})
        app.addApp('prefixed', modelPrefixOnly, {prefix:'prefixed'})
        await app.start()
    })

})

