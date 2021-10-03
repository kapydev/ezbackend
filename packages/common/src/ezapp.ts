import { App, PluginScope } from "@ezbackend/core"
import { FastifyInstance, FastifyServerOptions } from "fastify"
import fp from 'fastify-plugin'

type CallableKeysOf<Type> = {
    [Key in keyof Type]: Type[Key] extends Function ? Key : never
}[keyof Type]

function generateFastifyFuncWrapper<FastifyFunc extends (...args: any) => any>(
    parent: EzApp,
    funcName: CallableKeysOf<FastifyInstance>
) {

    return (...opts: Parameters<FastifyFunc>) => {
        parent.functions.push(
            (server: FastifyInstance) => (server[funcName] as FastifyFunc)(...opts)
        )
    }
}

//TODO: Add types based on fastify instance
//TODO: Tests for all stubbing performed
function createServer(parent: EzApp) {
    return {
        //Routes
        delete: generateFastifyFuncWrapper<FastifyInstance['delete']>(parent, 'delete'),
        get: generateFastifyFuncWrapper<FastifyInstance['get']>(parent, 'get'),
        head: generateFastifyFuncWrapper<FastifyInstance['head']>(parent, 'head'),
        patch: generateFastifyFuncWrapper<FastifyInstance['patch']>(parent, 'patch'),
        post: generateFastifyFuncWrapper<FastifyInstance['post']>(parent, 'post'),
        put: generateFastifyFuncWrapper<FastifyInstance['put']>(parent, 'put'),
        options: generateFastifyFuncWrapper<FastifyInstance['options']>(parent, 'options'),
        all: generateFastifyFuncWrapper<FastifyInstance['all']>(parent, 'all'),
        route: generateFastifyFuncWrapper<FastifyInstance['route']>(parent, 'route'),
        addHook: generateFastifyFuncWrapper<FastifyInstance['addHook']>(parent, 'addHook'),
        addSchema: generateFastifyFuncWrapper<FastifyInstance['addSchema']>(parent, 'addSchema'),
        setSerializerCompiler: generateFastifyFuncWrapper<FastifyInstance['setSerializerCompiler']>(parent, 'setSerializerCompiler'),
        addContentTypeParser: generateFastifyFuncWrapper<FastifyInstance['addContentTypeParser']>(parent, 'addContentTypeParser'),
        decorate: generateFastifyFuncWrapper<FastifyInstance['decorate']>(parent, 'decorate'),
        decorateReply: generateFastifyFuncWrapper<FastifyInstance['decorateReply']>(parent, 'decorateReply'),
        decorateRequest: generateFastifyFuncWrapper<FastifyInstance['decorateRequest']>(parent, 'decorateRequest'),
        inject: generateFastifyFuncWrapper<FastifyInstance['inject']>(parent, 'inject'),
        register: generateFastifyFuncWrapper<FastifyInstance['register']>(parent, 'register'),
        setNotFoundHandler: generateFastifyFuncWrapper<FastifyInstance['setNotFoundHandler']>(parent, 'setNotFoundHandler'),
        setErrorHandler: generateFastifyFuncWrapper<FastifyInstance['setErrorHandler']>(parent, 'setErrorHandler'),

    }
}

export type EzBackendServer = ReturnType<typeof createServer>

/**
 * Building block to build a plugin system
 * Child of {@link App}  {@link App} class
 */
export class EzApp extends App {

    protected _functions: Array<Function> = []

    get functions() { return this._functions }

    /**
     * Creates a fastify instance
     */
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
    delete = generateFastifyFuncWrapper<FastifyInstance['delete']>(this, 'delete')
    get = generateFastifyFuncWrapper<FastifyInstance['get']>(this, 'get')
    head = generateFastifyFuncWrapper<FastifyInstance['head']>(this, 'head')
    patch = generateFastifyFuncWrapper<FastifyInstance['patch']>(this, 'patch')
    post = generateFastifyFuncWrapper<FastifyInstance['post']>(this, 'post')
    put = generateFastifyFuncWrapper<FastifyInstance['put']>(this, 'put')
    options = generateFastifyFuncWrapper<FastifyInstance['options']>(this, 'options')
    all = generateFastifyFuncWrapper<FastifyInstance['all']>(this, 'all')
    route = generateFastifyFuncWrapper<FastifyInstance['route']>(this, 'route')
    addHook = generateFastifyFuncWrapper<FastifyInstance['addHook']>(this, 'addHook')
    addSchema = generateFastifyFuncWrapper<FastifyInstance['addSchema']>(this, 'addSchema')
    setSerializerCompiler = generateFastifyFuncWrapper<FastifyInstance['setSerializerCompiler']>(this, 'setSerializerCompiler')
    addContentTypeParser = generateFastifyFuncWrapper<FastifyInstance['addContentTypeParser']>(this, 'addContentTypeParser')
    decorate = generateFastifyFuncWrapper<FastifyInstance['decorate']>(this, 'decorate')
    decorateReply = generateFastifyFuncWrapper<FastifyInstance['decorateReply']>(this, 'decorateReply')
    decorateRequest = generateFastifyFuncWrapper<FastifyInstance['decorateRequest']>(this, 'decorateRequest')
    register = generateFastifyFuncWrapper<FastifyInstance['register']>(this, 'register')
    setNotFoundHandler = generateFastifyFuncWrapper<FastifyInstance['setNotFoundHandler']>(this, 'setNotFoundHandler')
    setErrorHandler = generateFastifyFuncWrapper<FastifyInstance['setErrorHandler']>(this, 'setErrorHandler')
    //NOTE: Inject is being used by EzBackend which is why we remove it
    // inject = generateFastifyFuncWrapper(this, 'inject')

    /**
     * Registers all fastify plugins to server instance of ezbackend application
     * @param server Server instance
     * @param parent EzBackend Object
     */
    registerFastifyPlugins(server: EzBackendServer, parent: EzApp) {

        const childFunc = async (server: FastifyInstance) => {
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