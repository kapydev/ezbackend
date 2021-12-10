/* eslint-disable no-use-before-define */
import avvio, { Avvio, mixedInstance, Plugin } from 'avvio';
import { kApp, kInstance, kScope } from './symbols';

export type PluginType = Plugin<AppInstanceOpts, AppInstance>;
export type Lifecycle =
  | '_preInit'
  | '_init'
  | '_postInit'
  | '_preHandler'
  | '_handler'
  | '_postHandler'
  | '_preRun'
  | '_run'
  | '_postRun';

export enum PluginScope {
  PARENT,
  DEFAULT,
}

export const LIFECYCLE: Array<Lifecycle> = [
  '_preInit',
  '_init',
  '_postInit',
  '_preHandler',
  '_handler',
  '_postHandler',
  '_preRun',
  '_run',
  '_postRun',
];

export class AppInstance {
  [kApp]: App;
}

export class AppInstanceOpts {}

export type Override = Avvio<AppInstance>['override'];

export type Overrides = { [name: string]: Avvio<unknown>['override'] };

// TODO: Added safety for overriding instance variables?

/**
 * An App is the basic building block for a plugin system, it contains all core and lifecycle methods.
 *
 * **App Lifecycle**
 *
 * {@link setPreInit} → {@link setInit} → {@link setPostInit}
 *
 * → {@link setPreHandler} → {@link setHandler} → {@link setPostHandler}
 *
 * → {@link setPreRun} → {@link setRun} → {@link setPostRun}
 *
 */
export class App {
  protected _parent: App | undefined;
  protected _apps: Map<string, App>;
  protected _preInit: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _init: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _postInit: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _preHandler: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _handler: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _postHandler: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _preRun: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _run: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _postRun: Map<string, Plugin<AppInstanceOpts, AppInstance>>;
  protected _instance: Avvio<AppInstance>;
  protected _name: string;
  protected _scope: PluginScope;
  protected _overrides: Overrides;
  protected _unnamedCounter: number;

  // TODO: Make this follow the convention I guess
  opts: any;

  // TODO: Add tests for localdata
  // TOOD: Add test for obtaining parent
  // TODO: Replace errors with better errors

  constructor() {
    this._apps = new Map();
    this._preInit = new Map();
    this._init = new Map();
    this._postInit = new Map();
    this._preHandler = new Map();
    this._handler = new Map();
    this._postHandler = new Map();
    this._preRun = new Map();
    this._run = new Map();
    this._postRun = new Map();
    this._instance = avvio(new AppInstance(), { autostart: false });
    this._name = 'Root';
    this._scope = PluginScope.DEFAULT;
    this._overrides = {};
    this.opts = {};
    this._unnamedCounter = 1;
  }

  get apps() {
    return this._apps;
  }

  get init() {
    return this._init;
  }

  get handler() {
    return this._handler;
  }

  get run() {
    return this._run;
  }

  get instance() {
    return this._instance;
  }

  get name() {
    return this._name;
  }

  set name(newName: string) {
    // Should we prevent setting the name more than once?
    this._name = newName;
  }

  get scope() {
    return this._scope;
  }

  set scope(newScope: PluginScope) {
    this._scope = newScope;
  }

  get parent() {
    return this._parent;
  }

  get overrides() {
    return this._overrides;
  }

  /**
   * Set's it's argument function as a hook during the {@link setPreInit} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setPreInit(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_preInit', funcName, plugin);
  }

  /**
   * Set's it's argument function as a hook during the {@link setInit} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setInit(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_init', funcName, plugin);
  }

  /**
   * Set's it's argument function as a hook during the {@link setPostInit} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setPostInit(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_postInit', funcName, plugin);
  }

  /**
   * Set's it's argument function as a hook during the {@link setPreHandler} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setPreHandler(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_preHandler', funcName, plugin);
  }

  /**
   * Set's it's argument function as a hook during the {@link setHandler} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setHandler(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_handler', funcName, plugin);
  }

  /**
   * Set's it's argument function as a hook during the {@link setPostHandler} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setPostHandler(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_postHandler', funcName, plugin);
  }

  /**
   * Set's it's argument function as a hook during the {@link setPreRun} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setPreRun(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_preRun', funcName, plugin);
  }

  /**
   * Set's it's argument function as a hook during the {@link setRun} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setRun(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_run', funcName, plugin);
  }

  /**
   * Set's it's argument function as a hook during the {@link setPostRun} point of the lifecycle
   * @param funcName Name of function to be called
   * @param plugin Plugin where function is located
   */
  setPostRun(funcName: string, plugin: Plugin<any, any>) {
    this.setHook('_postRun', funcName, plugin);
  }

  /**
   * Removes a previously added function from a lifecycle method
   * @param lifecycle Lifecycle where function was added
   * @param funcName Name of function that was added
   */
  removeHook(lifecycle: Lifecycle, funcName: string) {
    if (!this[lifecycle].has(funcName)) {
      throw new Error(`${funcName} does not exist in ${lifecycle}`);
    }
    // Override the plugin name
    this[lifecycle].delete(funcName);
  }

  /**
   * Helper function for each lifecycle method to set it's argument functions as hooks in the lifecycle
   * @param lifecycle Point in the lifecycle to place the function
   * @param funcName Name of function to be placed
   * @param plugin Plugin where function is located in
   */
  setHook(lifecycle: Lifecycle, funcName: string, plugin: Plugin<any, any>) {
    if (this[lifecycle].has(funcName)) {
      throw new Error(`${funcName} already declared for ${lifecycle}`);
    }
    // Override the plugin name
    Object.defineProperty(plugin, 'name', { value: funcName });
    this[lifecycle].set(funcName, plugin);
  }

  /**
   * Assigns current app to a parent app.
   * Note! You can only have a maximum of 1 parent.
   * EzBackend follows Fastify's encapsulation system. Click [here](https://www.fastify.io/docs/latest/Encapsulation/) for more information on Fastify's encapsulation
   * @param app
   */
  _setParent(app: App) {
    if (this._parent === undefined) {
      this._parent = app;
    } else {
      throw new Error(
        `App's parent has already been set, parents can only be set once`,
      );
    }
  }

  /**
   * Creates a new app
   * Note! You cannot have an app with the same name
   * @param name
   * @param newApp
   * @param opts options
   */
  addApp(childApp: App, opts?: Object): undefined;
  addApp(name: string, childApp: App, opts?: Object): undefined;
  addApp(
    arg1: string | App,
    arg2?: App | Object | undefined,
    arg3: Object = {},
  ) {
    let name: string;
    let newApp: App;
    let opts: Object;

    if (arg1 instanceof App && (arg2 instanceof Object || arg2 === undefined)) {
      // overload1
      name = `UnnamedApp${this._unnamedCounter}`;
      this._unnamedCounter += 1;
      newApp = arg1;
      opts = arg2 ?? arg3;
    } else if (
      typeof arg1 === 'string' &&
      arg2 instanceof App &&
      arg3 instanceof Object
    ) {
      // overload2
      name = arg1;
      newApp = arg2 as App;
      opts = arg3;
    } else {
      throw new Error('Invalid function signature for addApp()');
    }

    if (
      this._apps.has(name) ||
      Object.values(this._apps).indexOf(newApp) !== -1
    ) {
      throw new Error(`Child app ${name} already exists`);
    }
    newApp.name = name;
    newApp.opts = opts;
    newApp._setParent(this);
    this._apps.set(name, newApp);
  }

  getApp(name: string) {
    return this.apps.get(name);
  }

  /**
   * Retrieves the function assigned to the lifecycle method for the current app
   * @param lifecycle
   * @returns
   */
  getHookPlugin(lifecycle: Lifecycle): undefined | PluginType {
    // URGENT TODO: Plugin edge test case where child has hook but parent does not
    const childPlugins = Array.from(this.apps.values()).reduce(
      (previousPlugins, app) => {
        const childPlugin = app.getHookPlugin(lifecycle);
        if (childPlugin) {
          previousPlugins.push(childPlugin);
        }
        return previousPlugins;
      },
      [] as Array<PluginType>,
    );

    if (this[lifecycle].size === 0 && childPlugins.length === 0) {
      return undefined;
    }

    const appFunc: PluginType = async (instance, opts) => {
      this[lifecycle].forEach(async (pluginFunc) => {
        /*
                Take note he who dares venture here:
                The base code compiles into js, so everything is Function there
                However when the user writes his own code, the functions can be AsyncFunction
                So the prototype may be empty
                Which is why we need to define it if necessary
                TODO: Add test case for above edge case
                */
        if (pluginFunc.prototype === undefined) {
          pluginFunc.prototype = {};
        }
        // Make sure plugins run on the parent scope
        pluginFunc.prototype[kScope] = PluginScope.PARENT;
        // TODO: Test case/throw error to ensure that kApp is set for ALL plugins
        pluginFunc.prototype[kApp] = this;
        instance.use(pluginFunc, opts);
      });
      childPlugins.forEach((childPlugin) => {
        instance.use(childPlugin, opts);
      });
    };

    appFunc.prototype[kApp] = this;
    appFunc.prototype[kScope] = this.scope;
    // Override the encapsulating function's name
    Object.defineProperty(appFunc, 'name', { value: this.name });

    return appFunc;
  }

  /**
   * Starts the app running. You can pass in app options to configure how the app should run
   * @param opts
   */
  async start(opts?: any) {
    if (this._instance.started) {
      throw new Error(`App has been started already!`);
    }
    // Configure encapsulation
    this._instance.override = this.override;
    // Recursively load plugins
    LIFECYCLE.forEach((lifecycle) => {
      const lifecyclePlugin = this.getHookPlugin(lifecycle);
      if (lifecyclePlugin) {
        Object.defineProperty(lifecyclePlugin, 'name', { value: lifecycle });
        this._instance.use(lifecyclePlugin, opts);
      }
    });
    // Start the instance
    this._instance.start();
    await this._instance.ready();
  }

  /**
   *
   * @param varName
   * @param override
   */
  setCustomOverride(varName: string, override: Avvio<unknown>['override']) {
    this._overrides[varName] = override;
  }

  /**
   *
   * @param old
   * @param fn
   * @param opts
   * @returns
   */
  protected override: Override = (old, fn, opts) => {
    let newInstance: mixedInstance<AppInstance>;
    const parentApp = fn.prototype[kApp] ?? this;
    // Check plugin scope
    if (fn.prototype[kScope] === PluginScope.DEFAULT) {
      // Uses new scope
      if (parentApp[kInstance] === undefined) {
        parentApp[kInstance] = Object.create(old);
        Object.entries(this.overrides).forEach(([varName, override]) => {
          if (parentApp[kInstance][varName] === undefined) {
            // Don't do anything if variable has not been defined yet
            return;
          }
          parentApp[kInstance][varName] = override(
            parentApp[kInstance][varName],
            async (instance, opts) => {},
            parentApp.opts,
          );
        });
      }
      newInstance = parentApp[kInstance];
    } else if (fn.prototype[kScope] === PluginScope.PARENT) {
      // Uses old scope
      newInstance = old;
    } else {
      throw new Error(
        `Function scope is ${fn.prototype[kScope]} for ${fn}, but needs to be ${PluginScope}`,
      );
    }
    newInstance[kApp] = parentApp;
    return newInstance;
  };
}
