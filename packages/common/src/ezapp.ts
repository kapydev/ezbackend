import { App, PluginScope } from "@ezbackend/core"
import fp from 'fastify-plugin'

function generateFastifyFuncWrapper(parent, funcName: string) {

    return (...opts) => {
        parent._functions.push(
            (server) => server[funcName](...opts)
        )
    }
}

//TODO: Add types based on fastify instance
//TODO: Tests for all stubbing performed
function createServer(parent: EzApp) {
    return {
        //Routes
        delete: generateFastifyFuncWrapper(parent, 'delete'),
        get: generateFastifyFuncWrapper(parent, 'get'),
        head: generateFastifyFuncWrapper(parent, 'head'),
        patch: generateFastifyFuncWrapper(parent, 'patch'),
        post: generateFastifyFuncWrapper(parent, 'post'),
        put: generateFastifyFuncWrapper(parent, 'put'),
        options: generateFastifyFuncWrapper(parent, 'options'),
        all: generateFastifyFuncWrapper(parent, 'all'),
        route: generateFastifyFuncWrapper(parent, 'route'),

        addHook: generateFastifyFuncWrapper(parent, 'addHook'),
        addSchema: generateFastifyFuncWrapper(parent, 'addSchema'),

        setSerializerCompiler: generateFastifyFuncWrapper(parent, 'setSerializerCompiler'),
        addContentTypeParser: generateFastifyFuncWrapper(parent, 'addContentTypeParser'),

        decorate: generateFastifyFuncWrapper(parent, 'decorate'),
        decorateReply: generateFastifyFuncWrapper(parent, 'decorateReply'),
        decorateRequest: generateFastifyFuncWrapper(parent, 'decorateRequest'),

        inject: generateFastifyFuncWrapper(parent, 'inject'),
        register: generateFastifyFuncWrapper(parent, 'register'),

        setNotFoundHandler: generateFastifyFuncWrapper(parent, 'setNotFoundHandler'),
        setErrorHandler: generateFastifyFuncWrapper(parent, 'setErrorHandler'),

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

    //Make routing with apps easy 
    //URGENT TODO: Should we do this within the handler to be part of the plugin tree?
    //URGENT TODO: Typings
    delete = generateFastifyFuncWrapper(this, 'delete')
    get = generateFastifyFuncWrapper(this, 'get')
    head = generateFastifyFuncWrapper(this, 'head')
    patch = generateFastifyFuncWrapper(this, 'patch')
    post = generateFastifyFuncWrapper(this, 'post')
    put = generateFastifyFuncWrapper(this, 'put')
    options = generateFastifyFuncWrapper(this, 'options')
    all = generateFastifyFuncWrapper(this, 'all')
    route = generateFastifyFuncWrapper(this, 'route')

    addHook = generateFastifyFuncWrapper(this, 'addHook')
    addSchema = generateFastifyFuncWrapper(this, 'addSchema')

    setSerializerCompiler = generateFastifyFuncWrapper(this, 'setSerializerCompiler')
    addContentTypeParser = generateFastifyFuncWrapper(this, 'addContentTypeParser')

    decorate = generateFastifyFuncWrapper(this, 'decorate')
    decorateReply = generateFastifyFuncWrapper(this, 'decorateReply')
    decorateRequest = generateFastifyFuncWrapper(this, 'decorateRequest')

    // inject = generateFastifyFuncWrapper(this, 'inject')
    register = generateFastifyFuncWrapper(this, 'register')

    setNotFoundHandler = generateFastifyFuncWrapper(this, 'setNotFoundHandler')
    setErrorHandler = generateFastifyFuncWrapper(this, 'setErrorHandler')

    registerFastifyPlugins(server, parent) {

        const childFunc = async (server, opts) => {
            parent.functions.forEach(func => {
                func(server)
            })
            parent.apps.forEach(app => {
                if (app instanceof EzApp) {
                    app.registerFastifyPlugins(server, app)
                }
            })
        }

        //TODO: Add test case that tests encapsulation requirements for plugins when parent.scope == PluginScope.PARENT
        const scopedChildFunc = (parent.scope === PluginScope.PARENT) ? fp(childFunc) : childFunc

        server.register(scopedChildFunc, parent.opts)
    }
}