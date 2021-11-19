import { App, PluginScope } from "@ezbackend/core"
import fastify, { FastifyInstance } from "fastify"
import fp from 'fastify-plugin'
import { Plugin } from 'avvio'
import { EzBackendInstance, EzBackendOpts } from "."
import VirtualProxyWrapper from 'virtual-proxy-wrapper'

/**
 * Building block to build a plugin system
 * Child of {@link App}  {@link App} class
 */
export class EzApp extends App {

    protected _functions: Array<Function> = []

    get functions() { return this._functions }

    private localInstance: EzBackendInstance | undefined

    serverProxy = new VirtualProxyWrapper(fastify())

    /**
     * Creates a fastify instance
     */
    constructor() {
        super()
        this.setHandler("Create Server Stub", async (instance, opts) => {
            this.localInstance = instance
            instance.serverProxy = this.serverProxy
            instance.server = this.serverProxy.proxy
        })

        this.setPostHandler("Remove Server Stub", async(instance,opts) => {
            //@ts-ignore
            delete instance.server
        })
    }

    //Make routing with apps easy
    //URGENT TODO: Should we do this within the handler to be part of the plugin tree?
    delete = this.serverProxy.proxy.delete
    get = this.serverProxy.proxy.get
    head = this.serverProxy.proxy.head
    patch = this.serverProxy.proxy.patch
    post = this.serverProxy.proxy.post
    put = this.serverProxy.proxy.put
    options = this.serverProxy.proxy.options
    all = this.serverProxy.proxy.all
    route = this.serverProxy.proxy.route
    addHook = this.serverProxy.proxy.addHook
    addSchema = this.serverProxy.proxy.addSchema
    setSerializerCompiler = this.serverProxy.proxy.setSerializerCompiler
    addContentTypeParser = this.serverProxy.proxy.addContentTypeParser
    decorate = this.serverProxy.proxy.decorate
    decorateReply = this.serverProxy.proxy.decorateReply
    decorateRequest = this.serverProxy.proxy.decorateRequest
    register = this.serverProxy.proxy.register
    setNotFoundHandler = this.serverProxy.proxy.setNotFoundHandler
    setErrorHandler = this.serverProxy.proxy.setErrorHandler
    
    setPreInit = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPreInit(funcName, plugin) }
    setInit = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setInit(funcName, plugin) }
    setPostInit = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPostInit(funcName, plugin) }
    setPreHandler = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPreHandler(funcName, plugin) }
    setHandler = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setHandler(funcName, plugin) }
    setPostHandler = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPostHandler(funcName, plugin) }
    setPreRun = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPreRun(funcName, plugin) }
    setRun = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setRun(funcName, plugin) }
    setPostRun = (funcName: string, plugin: Plugin<EzBackendOpts, EzBackendInstance>) => { super.setPostRun(funcName, plugin) }

    //NOTE: Inject is being used by EzBackend which is why we remove it
    // inject = generateFastifyFuncWrapper(this, 'inject')

    private buildRoutePrefix (instancePrefix: string, pluginPrefix:string ) {
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
      

    getPrefix() : string {
        if (!this.parent) {
            return ''
        }
        if (this.parent instanceof EzApp) {
            return this.buildRoutePrefix(this.parent.getPrefix(),this.opts.prefix ?? '')
        }
        throw "Parent app of an EzApp needs to be instance of EzApp"
    }

    private getSocketIOByNamespace(namespace?: string) {
        if (!this.localInstance) throw "Accessing socket IO too early in boot cycle"
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
    
    /**
     * Get the Socket IO 'io' object WITHOUT namespacing
     */
    getSocketIORaw() {
        return this.getSocketIOByNamespace()
    }

    /**
     * Registers all fastify plugins to server instance of ezbackend application
     * @param server Server instance
     * @param parent EzBackend Object
     */
    registerFastifyPlugins(server: FastifyInstance, parent: EzApp) {

        if (!this.localInstance) throw "Local Instance should be defined when registering fastify plugins, this is likely an internal EzBackend error"
        
        const serverProxy = this.localInstance.serverProxy
        
        const childFunc = async (server: FastifyInstance) => {
            serverProxy.execute(server)

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