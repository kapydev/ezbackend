import { App, PluginScope } from "@ezbackend/core"
import { EzBackendInstance, EzBackendOpts } from "."
import { EzError, OverloadParameters, OverloadParameters1to5, OverloadParameters23 } from '@ezbackend/utils'
import { FastifyInstance, FastifyRegister } from "fastify"
import { Plugin } from 'avvio'
import dedent from 'dedent-js'
import type { Namespace } from "socket.io"
import fp from 'fastify-plugin'
import { merge } from "lodash"

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
    protected _defaultOpts: EzBackendOpts[keyof EzBackendOpts] | undefined
    protected _socketIOfunctions: Array<Function> = []
    private localInstance: EzBackendInstance | undefined

    get functions() { return this._functions }

    setDefaultOpts<LocalOpts extends EzBackendOpts[keyof EzBackendOpts]>(opts: LocalOpts) {
        this._defaultOpts = opts
    }

    getOpts<LocalOptsKey extends keyof EzBackendOpts>(
        optsPrefix: LocalOptsKey,
        fullOpts: EzBackendOpts): EzBackendOpts[LocalOptsKey] {

        if (fullOpts[optsPrefix]) {
            return merge(this._defaultOpts, fullOpts[optsPrefix])
        }

        if (this._defaultOpts) {
            return this._defaultOpts as EzBackendOpts[LocalOptsKey]
        }

        throw new EzError("Default opts have not been defined!",
            "The plugin developer needs to set default opts with setDefaultOpts",
            dedent`
        Instructions for plugin development (Sample plugin called EzPlugin):

        Extend the typescript type
        declare module "@ezbackend/common" {
            interface EzBackendOpts {
                plugin: YourCustomOpts
            }
        }

        Set the default options in the constructor
        export class EzPlugin extends EzApp {
            constructor() {
                super()

                //Where defaultConfig is the default configuration
                this.setDefaultOpts(defaultConfig as YourCustomOpts)
            }
        }

        Now you can use this.getOpts('plugin', fullOpts)
        `
        )
    }


    /**
     * Creates a fastify instance
     */
    constructor() {
        super()
        this.setHandler("Create Server Stub", async (instance, opts) => {
            instance.server = createServer(this)
            this.localInstance = instance
        })
        this.setHandler("Run all SocketIO Functions", async () => {
            this._socketIOfunctions.forEach(func => func())
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

    setPreInit = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPreInit(funcName, plugin) }
    setInit = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setInit(funcName, plugin) }
    setPostInit = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPostInit(funcName, plugin) }
    setPreHandler = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPreHandler(funcName, plugin) }
    setHandler = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setHandler(funcName, plugin) }
    setPostHandler = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPostHandler(funcName, plugin) }
    setPreRun = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPreRun(funcName, plugin) }
    setRun = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setRun(funcName, plugin) }
    setPostRun = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPostRun(funcName, plugin) }

    private buildRoutePrefix(instancePrefix: string, pluginPrefix: string) {
        if (!pluginPrefix) {
            return instancePrefix
        }

        // Ensure that there is a '/' between the prefixes
        if (instancePrefix.endsWith('/') && pluginPrefix[0] === '/') {
            // Remove the extra '/' to avoid: '/first//second'
            pluginPrefix = pluginPrefix.slice(1)
        } else if (pluginPrefix[0] !== '/') {
            pluginPrefix = '/' + pluginPrefix
        }

        return instancePrefix + pluginPrefix
    }


    getPrefix(): string {
        if (!this.parent) {
            return ''
        }
        if (this.parent instanceof EzApp) {
            return this.buildRoutePrefix(this.parent.getPrefix(), this.opts.prefix ?? '')
        }
        throw new EzError("Parent app of an EzApp needs to be instance of EzApp",
            "If the parent of an EzApp is not an EzApp then it will be impossible to build the route prefix")
    }

    private getSocketIOByNamespace(namespace?: string) {
        if (!this.localInstance) throw new EzError("Accessing socket IO too early in boot cycle",
            "Socket IO is only instantiated in the lifecycle hook preHandler. Try using useSocketIO/useSocketIORaw instead",
            `app.useSocketIORaw((io) => {/* Your Custom Functionality */})`)
        const io = this.localInstance.socketIO

        if (namespace) return io.of(namespace)
        else return io.of('/')
    }

    /**
     * Get the Socket IO 'io' object WITH namespacing
     */
    getSocketIO() {
        const prefix = this.getPrefix()
        return this.getSocketIOByNamespace(prefix)
    }

    useSocketIO(func: (io: Namespace) => void) {
        this._socketIOfunctions.push(
            () => {
                func(this.getSocketIO())
            }
        )
    }

    /**
     * Get the Socket IO 'io' object WITHOUT namespacing
     */
    getSocketIORaw() {
        return this.getSocketIOByNamespace()
    }

    useSocketIORaw(func: (io: Namespace) => void) {
        this._socketIOfunctions.push(
            () => {
                func(this.getSocketIORaw())
            }
        )
    }

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