import { App, PluginScope } from "@ezbackend/core"
import { FastifyInstance, FastifyRegister } from "fastify"
import fp from 'fastify-plugin'
import {Plugin} from 'avvio'
import { EzBackendInstance, EzBackendOpts } from "."
import {OverloadParameters,OverloadParameters23, OverloadParameters1to5} from '@ezbackend/utils'

type CallableKeysOf<Type> = {
    [Key in keyof Type]: Type[Key] extends Function ? Key : never
}[keyof Type]

function generateFastifyFuncWrapper<Params extends Array<unknown>>(
    parent: EzApp,
    funcName: CallableKeysOf<FastifyInstance>
) {

    return (...opts: Params) => {
        parent.functions.push(
            //any has to be used here because of typescript recursion limit
            (server: FastifyInstance) => (server[funcName] as any)(...opts)
        )
    }
}

//TODO: Add types based on fastify instance
//TODO: Tests for all stubbing performed
function createServer(parent: EzApp) {
    return {
        //TODO: Figure out how to get types with overrides
        //Routes
        delete: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['delete']>>(parent, 'delete'),
        get: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['get']>>(parent, 'get'),
        head: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['head']>>(parent, 'head'),
        patch: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['patch']>>(parent, 'patch'),
        post: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['post']>>(parent, 'post'),
        put: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['put']>>(parent, 'put'),
        options: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['options']>>(parent, 'options'),
        all: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['all']>>(parent, 'all'),
        route: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['route']>>(parent, 'route'),
        //This one specifically uses the 23 overload parameters because otherwise the recursion is too deep for typescript to automatically detect the type
        addHook: generateFastifyFuncWrapper<OverloadParameters23<FastifyInstance['addHook']>>(parent, 'addHook'),
        addSchema: generateFastifyFuncWrapper<OverloadParameters<FastifyInstance['addSchema']>>(parent, 'addSchema'),
        setSerializerCompiler: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['setSerializerCompiler']>>(parent, 'setSerializerCompiler'),
        addContentTypeParser: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['addContentTypeParser']>>(parent, 'addContentTypeParser'),
        decorate: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['decorate']>>(parent, 'decorate'),
        decorateReply: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['decorateReply']>>(parent, 'decorateReply'),
        decorateRequest: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['decorateRequest']>>(parent, 'decorateRequest'),
        inject: generateFastifyFuncWrapper<OverloadParameters<FastifyInstance['inject']>>(parent, 'inject'),
        //TODO: Figure out why the type inference cannot handle async/callback styles
        register: generateFastifyFuncWrapper<any>(parent, 'register') as FastifyRegister,
        setNotFoundHandler: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['setNotFoundHandler']>>(parent, 'setNotFoundHandler'),
        setErrorHandler: generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['setErrorHandler']>>(parent, 'setErrorHandler'),

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
            //URGENT TODO: Make sure that error message when trying to get decorators that are not present is clear
            //@ts-ignore
            delete instance.server
        })
    }

    //Make routing with apps easy
    //URGENT TODO: Should we do this within the handler to be part of the plugin tree?
    delete = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['delete']>>(this, 'delete')
    get = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['get']>>(this, 'get')
    head = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['head']>>(this, 'head')
    patch = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['patch']>>(this, 'patch')
    post = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['post']>>(this, 'post')
    put = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['put']>>(this, 'put')
    options = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['options']>>(this, 'options')
    all = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['all']>>(this, 'all')
    route = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['route']>>(this, 'route')
    addHook = generateFastifyFuncWrapper<any>(this, 'addHook') as FastifyInstance['addHook']
    addSchema = generateFastifyFuncWrapper<OverloadParameters<FastifyInstance['addSchema']>>(this, 'addSchema')
    setSerializerCompiler = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['setSerializerCompiler']>>(this, 'setSerializerCompiler')
    addContentTypeParser = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['addContentTypeParser']>>(this, 'addContentTypeParser')
    decorate = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['decorate']>>(this, 'decorate')
    decorateReply = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['decorateReply']>>(this, 'decorateReply')
    decorateRequest = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['decorateRequest']>>(this, 'decorateRequest')

    register = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['register']>>(this, 'register') //TODO: Why is the async one not working?
    setNotFoundHandler = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['setNotFoundHandler']>>(this, 'setNotFoundHandler')
    setErrorHandler = generateFastifyFuncWrapper<OverloadParameters1to5<FastifyInstance['setErrorHandler']>>(this, 'setErrorHandler')
    //NOTE: Inject is being used by EzBackend which is why we remove it
    // inject = generateFastifyFuncWrapper(this, 'inject')

    setPreInit = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setPreInit(funcName,plugin)}
    setInit = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setInit(funcName,plugin)}
    setPostInit = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setPostInit(funcName,plugin)}
    setPreHandler = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setPreHandler(funcName,plugin)}
    setHandler = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setHandler(funcName,plugin)}
    setPostHandler = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setPostHandler(funcName,plugin)}
    setPreRun = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setPreRun(funcName,plugin)}
    setRun = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setRun(funcName,plugin)}
    setPostRun = (funcName: string, plugin: Plugin<EzBackendOpts,EzBackendInstance>) => {super.setPostRun(funcName,plugin)}

    /**
     * Registers all fastify plugins to server instance of ezbackend application
     * @param server Server instance
     * @param parent EzBackend Object
     */
    registerFastifyPlugins(server: FastifyInstance, parent: EzApp) {

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