import { App, PluginScope } from '@ezbackend/core';
import {
  EzError,
  ezWarning
} from '@ezbackend/utils';
import { Plugin } from 'avvio';
import dedent from 'dedent-js';
import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import fp from 'fastify-plugin';
import { merge } from 'lodash';
import type { Namespace } from 'socket.io';
import { EzBackendInstance, EzBackendOpts } from '.';
import { getSchemaOrUndefined } from './schema-generation';
import { HTTPMethods } from 'fastify/types/utils'

type CallableKeysOf<Type> = {
  [Key in keyof Type]: Type[Key] extends Function ? Key : never;
}[keyof Type];

function generateFastifyFuncWrapper<Params extends Array<unknown> = Array<unknown>>(
  parent: EzApp,
  funcName: CallableKeysOf<FastifyInstance>,
  optsCallback: (
    opts: Params,
    parent?: EzApp,
    funcName?: CallableKeysOf<FastifyInstance>) => Params = (opts) => opts
) {
  return (...opts: Params) => {
    parent.functions.push(
      // any has to be used here because of typescript recursion limit
      (server: any) => {
        opts = optsCallback(opts, parent, funcName)
        server[funcName](...opts)
      },
    );
  };
}



export type CustomRouteShorthandOptions<Body, QueryString, Params, Headers, Reply200, Reply400> = {
  body?: { new(): Body },
  querystring?: { new(): QueryString },
  params?: { new(): Params },
  headers?: { new(): Headers },
  reply200?: { new(): Reply200 },
  reply400?: { new(): Reply400 },
  summary?: string,
  description?: string
} & RouteShorthandOptions

// URGENT TODO: Implement Reply200 type
export type CustomRouteHandlerMethod<Body, QueryString, Params, Headers> = (req: {
  body?: Body,
  querystring?: QueryString,
  params?: Params,
  headers?: Headers
} & FastifyRequest, res: FastifyReply) => any

export interface CustomRouteOptions<
  Body,
  QueryString,
  Params,
  Headers,
  Reply200,
  Reply400> {
  method: HTTPMethods | HTTPMethods[]
  url: string
  body?: { new(): Body }
  querystring?: { new(): QueryString }
  params?: { new(): Params }
  headers?: { new(): Headers }
  reply200?: { new(): Reply200 }
  reply400?: { new(): Reply400 }
  summary?: string
  description?: string
  handler: CustomRouteHandlerMethod<Body, QueryString, Params, Headers>
}

// TODO: Custom Route Typescript Types
export interface CustomRouteShorthandMethod {
  <
    Body = any,
    QueryString = any,
    Params = any,
    Headers = any,
    Reply200 = any,
    Reply400 = any,
    >
    (url: string,
    opts: CustomRouteShorthandOptions<Body, QueryString, Params, Headers, Reply200, Reply400>,
    cb: CustomRouteHandlerMethod<Body, QueryString, Params, Headers>
  ): void
  <
    Body = any,
    QueryString = any,
    Params = any,
    Headers = any,
    Reply200 = any,
    >
    (url: string,
    cb: CustomRouteHandlerMethod<Body, QueryString, Params, Headers>,
  ): void
}

export interface CustomRouteMethod {
  <
    Body = any,
    QueryString = any,
    Params = any,
    Headers = any,
    Reply200 = any,
    Reply400 = any
    >(
    opts: CustomRouteOptions<Body, QueryString, Params, Headers, Reply200, Reply400>
  ): void
}

// Convert Custom Route Types to json schema syntax

// Warning this mutates original variable
function convertOptions(opts: CustomRouteShorthandOptions<any, any, any, any, any, any>) {

  const definedTwiceMsg = (schemaType: string, schemaName: string) => {
    return [
      `'${schemaType}' schema is defined twice for '${schemaName}'`,
      `You should either use JsonSchema or the Class Schema, but not both`
    ] as const
  }

  if (!opts.schema) {
    opts.schema = {}
  }
  if (!opts.schema.response) {
    opts.schema.response = {}
  }

  // URGENT TODO: Support all response codes

  if (opts.schema.body && opts.body) { throw new EzError(...definedTwiceMsg('body', opts.body.name)) }
  if (opts.schema.querystring && opts.querystring) { throw new EzError(...definedTwiceMsg('querystring', opts.querystring.name)) }
  if (opts.schema.params && opts.params) { throw new EzError(...definedTwiceMsg('params', opts.params.name)) }
  if (opts.schema.headers && opts.headers) { throw new EzError(...definedTwiceMsg('headers', opts.headers.name)) }
  if ((opts.schema.response as any)['200'] && opts.reply200) { throw new EzError(...definedTwiceMsg('200 OK Response', opts.reply200.name)) }
  if ((opts.schema.response as any)['400'] && opts.reply400) { throw new EzError(...definedTwiceMsg('400 BAD REQUEST Response', opts.reply400.name)) }

  const bodySchema = getSchemaOrUndefined(opts.body)
  const queryStringSchema = getSchemaOrUndefined(opts.querystring)
  const paramsSchema = getSchemaOrUndefined(opts.params)
  const headersSchema = getSchemaOrUndefined(opts.headers)
  const reply200Schema = getSchemaOrUndefined(opts.reply200)
  const reply400Schema = getSchemaOrUndefined(opts.reply400)

  if (!opts.schema.body && bodySchema) { opts.schema.body = bodySchema }
  if (!opts.schema.querystring && queryStringSchema) { opts.schema.querystring = queryStringSchema }
  if (!opts.schema.params && paramsSchema) { opts.schema.params = paramsSchema }
  if (!opts.schema.headers && headersSchema) { opts.schema.headers = headersSchema }
  if (!(opts.schema.response as any)['200'] && reply200Schema) { (opts.schema.response as any)['200'] = reply200Schema }
  if (!(opts.schema.response as any)['400'] && reply400Schema) { (opts.schema.response as any)['400'] = reply400Schema }

  if (opts.summary) { (opts.schema as any).summary = opts.summary }
  if (opts.description) { (opts.schema as any).description = opts.description }

  return opts
}

function convertShorthandOptions(originalOpts: any, parentApp: EzApp | undefined) {
  // Note that original object IS being mutated
  // Keep as similar to fastify method as possible
  const [url, opts, handler] = originalOpts
  if (!handler && typeof opts === 'function') {
    ezWarning(`No type specified for prefix '${parentApp?.getPrefix()}',path '${url}' so no auto documentation nor input validation provided`)
  } else {
    convertOptions(opts) // This function mutates opts
  }

  return originalOpts
}
function convertFullOptions(originalOptsArray: any, parentApp: EzApp | undefined) {
  // Note that original object IS being mutated
  // Keep as similar to fastify method as possible
  const [originalOpts] = originalOptsArray
  convertOptions(originalOpts) // This function mutates opts
  return originalOptsArray
}


// TODO: Add types based on fastify instance
// TODO: Tests for all stubbing performed
function createServer(parent: EzApp) {
  return {
    // TODO: Figure out how to get types with overrides
    // Routes
    delete: parent.delete,
    get: parent.get,
    head: parent.head,
    patch: parent.patch,
    post: parent.post,
    put: parent.put,
    options: parent.options,
    all: parent.all,
    route: parent.route,
    addHook: parent.addHook,
    addSchema: parent.addSchema,
    setSerializerCompiler: parent.setSerializerCompiler,
    addContentTypeParser: parent.addContentTypeParser,
    decorate: parent.decorate,
    decorateReply: parent.decorateReply,
    decorateRequest: parent.decorateRequest,
    inject: generateFastifyFuncWrapper(parent, 'inject') as FastifyInstance['inject'],
    register: parent.register,
    setNotFoundHandler: parent.setNotFoundHandler,
    setErrorHandler: parent.setErrorHandler,
  };
}

export type EzBackendServer = ReturnType<typeof createServer>;

/**
 * Building block to build a plugin system
 * Child of {@link App}  {@link App} class
 */
export class EzApp extends App {
  protected _functions: Array<Function> = [];
  protected _defaultOpts: EzBackendOpts[keyof EzBackendOpts] | undefined;
  protected _socketIOfunctions: Array<Function> = [];
  private localInstance: EzBackendInstance | undefined;

  get functions() {
    return this._functions;
  }

  setDefaultOpts<LocalOpts extends EzBackendOpts[keyof EzBackendOpts]>(
    opts: LocalOpts,
  ) {
    this._defaultOpts = opts;
  }

  getOpts<LocalOptsKey extends keyof EzBackendOpts>(
    optsPrefix: LocalOptsKey,
    fullOpts: EzBackendOpts,
  ): EzBackendOpts[LocalOptsKey] {
    if (fullOpts[optsPrefix]) {
      return merge({}, this._defaultOpts, fullOpts[optsPrefix]);
    }

    if (this._defaultOpts) {
      return this._defaultOpts as EzBackendOpts[LocalOptsKey];
    }

    throw new EzError(
      'Default opts have not been defined!',
      'The plugin developer needs to set default opts with setDefaultOpts',
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
        `,
    );
  }

  /**
   * Creates a fastify instance
   */
  constructor() {
    super();
    this.setHandler('Create Server Stub', async (instance, opts) => {
      instance.server = createServer(this);
      this.localInstance = instance;
    });
    this.setHandler('Run all SocketIO Functions', async () => {
      this._socketIOfunctions.forEach((func) => func());
    });
    this.setPostHandler('Remove Server Stub', async (instance, opts) => {
      // URGENT TODO: Make sure that error message when trying to get decorators that are not present is clear
      // @ts-ignore
      delete instance.server;
    });
  }

  // Make routing with apps easy
  // URGENT TODO: Should we do this within the handler to be part of the plugin tree?
  delete = generateFastifyFuncWrapper(this, 'delete', convertShorthandOptions) as CustomRouteShorthandMethod
  get = generateFastifyFuncWrapper(this, 'get', convertShorthandOptions) as CustomRouteShorthandMethod
  head = generateFastifyFuncWrapper(this, 'head', convertShorthandOptions) as CustomRouteShorthandMethod
  patch = generateFastifyFuncWrapper(this, 'patch', convertShorthandOptions) as CustomRouteShorthandMethod
  post = generateFastifyFuncWrapper(this, 'post', convertShorthandOptions) as CustomRouteShorthandMethod
  put = generateFastifyFuncWrapper(this, 'put', convertShorthandOptions) as CustomRouteShorthandMethod
  options = generateFastifyFuncWrapper(this, 'options', convertShorthandOptions) as CustomRouteShorthandMethod
  all = generateFastifyFuncWrapper(this, 'all', convertShorthandOptions) as CustomRouteShorthandMethod
  route = generateFastifyFuncWrapper(this, 'route', convertFullOptions) as CustomRouteMethod;

  addHook = generateFastifyFuncWrapper(this, 'addHook') as FastifyInstance['addHook'];
  addSchema = generateFastifyFuncWrapper(this, 'addSchema') as FastifyInstance['addSchema'];
  setSerializerCompiler = generateFastifyFuncWrapper(this, 'setSerializerCompiler') as FastifyInstance['setSerializerCompiler'];
  addContentTypeParser = generateFastifyFuncWrapper(this, 'addContentTypeParser') as FastifyInstance['addContentTypeParser'];
  decorate = generateFastifyFuncWrapper(this, 'decorate') as FastifyInstance['decorate'];
  decorateReply = generateFastifyFuncWrapper(this, 'decorateReply') as FastifyInstance['decorateReply'];
  decorateRequest = generateFastifyFuncWrapper(this, 'decorateRequest') as FastifyInstance['decorateRequest'];
  register = generateFastifyFuncWrapper(this, 'register') as FastifyInstance['register'];
  setNotFoundHandler = generateFastifyFuncWrapper(this, 'setNotFoundHandler') as FastifyInstance['setNotFoundHandler'];
  setErrorHandler = generateFastifyFuncWrapper(this, 'setErrorHandler') as FastifyInstance['setErrorHandler'];
  // NOTE: Inject is being used by EzBackend which is why we remove it
  // inject = generateFastifyFuncWrapper(this, 'inject')

  setPreInit = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setPreInit(funcName, plugin);
  };

  setInit = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setInit(funcName, plugin);
  };

  setPostInit = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setPostInit(funcName, plugin);
  };

  setPreHandler = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setPreHandler(funcName, plugin);
  };

  setHandler = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setHandler(funcName, plugin);
  };

  setPostHandler = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setPostHandler(funcName, plugin);
  };

  setPreRun = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setPreRun(funcName, plugin);
  };

  setRun = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setRun(funcName, plugin);
  };

  setPostRun = (
    funcName: string,
    plugin: Plugin<EzBackendOpts, EzBackendInstance>,
  ) => {
    super.setPostRun(funcName, plugin);
  };

  private buildRoutePrefix(instancePrefix: string, pluginPrefix: string) {
    if (!pluginPrefix) {
      return instancePrefix;
    }

    // Ensure that there is a '/' between the prefixes
    if (instancePrefix.endsWith('/') && pluginPrefix[0] === '/') {
      // Remove the extra '/' to avoid: '/first//second'
      pluginPrefix = pluginPrefix.slice(1);
    } else if (pluginPrefix[0] !== '/') {
      pluginPrefix = '/' + pluginPrefix;
    }

    return instancePrefix + pluginPrefix;
  }

  // TODO : Throw an error if the prefix is obtained before the app is defined
  getPrefix(): string {
    if (!this.parent) {
      return '';
    }
    if (this.parent instanceof EzApp) {
      return this.buildRoutePrefix(
        this.parent.getPrefix(),
        this.opts.prefix ?? '',
      );
    }
    throw new EzError(
      'Parent app of an EzApp needs to be instance of EzApp',
      'If the parent of an EzApp is not an EzApp then it will be impossible to build the route prefix',
    );
  }

  private getSocketIOByNamespace(namespace?: string) {
    if (!this.localInstance)
      throw new EzError(
        'Accessing socket IO too early in boot cycle',
        'Socket IO is only instantiated in the lifecycle hook preHandler. Try using useSocketIO/useSocketIORaw instead',
        `app.useSocketIORaw((io) => {/* Your Custom Functionality */})`,
      );
    const io = this.localInstance.socketIO;

    if (namespace) return io.of(namespace);
    else return io.of('/');
  }

  /**
   * Get the Socket IO 'io' object WITH namespacing
   */
  getSocketIO() {
    const prefix = this.getPrefix();
    return this.getSocketIOByNamespace(prefix);
  }

  useSocketIO(func: (io: Namespace) => void) {
    this._socketIOfunctions.push(() => {
      func(this.getSocketIO());
    });
  }

  /**
   * Get the Socket IO 'io' object WITHOUT namespacing
   */
  getSocketIORaw() {
    return this.getSocketIOByNamespace();
  }

  useSocketIORaw(func: (io: Namespace) => void) {
    this._socketIOfunctions.push(() => {
      func(this.getSocketIORaw());
    });
  }

  /**
   * Registers all fastify plugins to server instance of ezbackend application
   * @param server Server instance
   * @param parent EzBackend Object
   */
  registerFastifyPlugins(server: FastifyInstance, parent: EzApp) {
    const childFunc = async (server: FastifyInstance) => {
      parent.functions.forEach((func) => {
        func(server);
      });
      parent.apps.forEach((app) => {
        if (app instanceof EzApp) {
          app.registerFastifyPlugins(server, app);
        }
      });
    };

    // TODO: Add test case that tests encapsulation requirements for plugins when parent.scope == PluginScope.PARENT
    const scopedChildFunc =
      parent.scope === PluginScope.PARENT ? fp(childFunc) : childFunc;

    server.register(scopedChildFunc, parent.opts);
  }
}
