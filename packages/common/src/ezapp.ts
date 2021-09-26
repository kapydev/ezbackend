import { App } from "@ezbackend/core"

function generateFastifyFuncWrapper(parent,funcName:string) {

    return (...opts) => {
        parent._functions.push(
            (server) => server[funcName](...opts)
        )
    }
}

function createServer(parent:EzApp) {
    return {
        route: generateFastifyFuncWrapper(parent,'route'),
        register: generateFastifyFuncWrapper(parent,'register'),
        addSchema: generateFastifyFuncWrapper(parent,'addSchema'),
        decorateReply: generateFastifyFuncWrapper(parent,'decorateReply'),
        inject: generateFastifyFuncWrapper(parent,'inject'),
        addHook: generateFastifyFuncWrapper(parent,'addHook'),
    }
}

export class EzApp extends App {

    protected _functions: Array<Function> = []

    get functions() { return this._functions }

    constructor() {
        super()
        this.setHandler("Create Server Stub", async (instance, opts) => {
            instance.server = createServer(this)
        })
        this.setPostHandler("Remove Server Stub", async (instance, opts) => {
            delete instance.server
        })

    }

    registerFastifyPlugins(server,parent) {

        server.register(async (server, opts) => {
            parent.functions.forEach(func => {
                func(server)
            })
            parent.apps.forEach(app => {
                if (app instanceof EzApp) {
                    app.registerFastifyPlugins(server,app)
                }
            })
        }, parent.opts)
    }
}