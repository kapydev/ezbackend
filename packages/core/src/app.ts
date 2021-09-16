import {
    kChild,
    kApp,
    kInstance,
    kScope,
} from './symbols'
import avvio, { Avvio, Plugin } from 'avvio'


type Override = Avvio<AppInstance>['override']
type PluginType = Plugin<unknown, AppInstance>
type Lifecycle = '_init' | '_handler' | '_run'

enum PluginScope {
    PARENT,
    DEFAULT
}

const LIFECYCLE: Array<Lifecycle> = ['_init', '_handler', '_run']

class AppInstance {
    [kChild]: avvio.mixedInstance<AppInstance> | undefined
}

export class App {
    protected _apps: { [key: string]: App }
    protected _init: { [key: string]: Plugin<any, any> }
    protected _handler: { [key: string]: Plugin<any, any> }
    protected _run: { [key: string]: Plugin<any, any> }
    protected _instance: Avvio<AppInstance>
    protected _name: string
    protected _scope: PluginScope

    constructor() {
        this._apps = {}
        this._init = {}
        this._handler = {}
        this._run = {}
        this._instance = avvio(new AppInstance(), { autostart: false })
        this._name = 'Root'
        this._scope = PluginScope.DEFAULT

    }

    get apps() { return this._apps }
    get init() { return this._init }
    get handle() { return this._handler }
    get run() { return this._run }
    get instance() { return this._instance }
    get name() { return this._name }
    get scope() { return this._scope }

    set name(newName: string) {
        //Should we prevent setting the name more than once?
        this._name = newName
    }

    set scope(newScope: PluginScope) {
        this._scope = newScope
    }

    setInit(funcName: string, plugin: Plugin<any, any>) { this.setHook('_init', funcName, plugin) }
    setHandler(funcName: string, plugin: Plugin<any, any>) { this.setHook('_handler', funcName, plugin) }
    setRun(funcName: string, plugin: Plugin<any, any>) { this.setHook('_run', funcName, plugin) }

    setHook(lifecycle: Lifecycle, funcName: string, plugin: Plugin<any, any>) {
        if (funcName in this[lifecycle]) {
            throw `${funcName} already declared for ${lifecycle}`
        }
        //Override the plugin name
        Object.defineProperty(plugin, 'name', { value: funcName })
        this[lifecycle][funcName] = plugin

    }

    addApp(name: string, newApp: App, scope: PluginScope = PluginScope.DEFAULT) {
        if (name in this._apps || Object.values(this._apps).indexOf(newApp) !== -1) {
            throw (`Child app ${name} already exists`)
        }
        this._apps[name] = newApp
        newApp.scope = scope
        newApp.name = name
    }

    getHookPlugin(lifecycle: Lifecycle) {

        const appFunc: PluginType = async (instance, opts) => {
            Object.values(this[lifecycle]).forEach(async pluginFunc => {
                //Make sure plugins run on the parent scope
                pluginFunc.prototype[kScope] = PluginScope.PARENT
                instance.use(pluginFunc, opts)
            })
            Object.values(this.apps).forEach(app => {
                instance.use(app.getHookPlugin(lifecycle), opts)
            })
        }

        appFunc.prototype[kApp] = this
        appFunc.prototype[kScope] = this.scope
        //Override the encapsulating function's name
        Object.defineProperty(appFunc, 'name', { value: this.name })

        return appFunc
    }

    async start() {
        if (this._instance.started) {
            throw `App has been started already!`
        }
        //Configure encapsulation
        this._instance.override = this.override
        //Recursively load plugins
        LIFECYCLE.forEach(lifecycle => {
            this._instance.use(this.getHookPlugin(lifecycle))
        })
        //Start the instance
        this._instance.start()
        await this._instance.ready()
    }

    protected override: Override = (old, fn, opts) => {
        //Check plugin scope
        if (fn.prototype[kScope] === PluginScope.DEFAULT) {
            //Uses new scope
            const app = fn.prototype[kApp] ?? this
            if (app[kInstance] === undefined) {
                app[kInstance] = Object.create(old)
            }
            return app[kInstance]
        } else if (fn.prototype[kScope] === PluginScope.PARENT) {
            //Uses old scope
            return old
        } else {
            throw `Function scope is not defined for ${fn}`
        }
    }
}