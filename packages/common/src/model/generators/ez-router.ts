import { RouteOptions } from 'fastify';
import { ObjectLiteral, Repository } from 'typeorm';
import { EzBackendOpts } from '../..';
import { EzApp } from '../../ezapp';
// TODO: Consider if we should remove the cyclic importing
import type { EzBackendInstance } from '../../ezbackend';
import { getDefaultGenerators } from './default-generators';

export interface RouterOptions {
  schemaPrefix?: string;
  prefix?: string;
  // eslint-disable-next-line no-use-before-define
  generators?: { [name: string]: IGenerator };
}

type IGenerator = (
  repo: Repository<ObjectLiteral>,
  opts?: RouterOptions,
) => RouteOptions | Array<RouteOptions>;

export type Middleware = (oldRoute: RouteOptions) => RouteOptions;

// TODO: Custom routes involving apps?
/**
 * Factory function for generating routes.
 * @param genOpts
 * @param generator
 * @param middlewares
 * @returns
 */
export function generateRouteFactory(
  genOpts: RouterOptions,
  generator: IGenerator,
  middlewares: Array<Middleware> = [],
) {
  return async (instance: EzBackendInstance, opts: EzBackendOpts) => {
    const routes = ([] as Array<RouteOptions>).concat(
      generator(instance.repo, genOpts),
    );
    routes.forEach((route) => {
      let modifiedRoute = route;
      middlewares.forEach((middleware) => {
        modifiedRoute = middleware(modifiedRoute);
      });
      // TODO: Figure out why types don't match
      instance.server.route(
        modifiedRoute as Parameters<typeof instance['server']['route']>[0],
      );
    });
  };
}

export function middlewareFactory(optName: string, newValue: any): Middleware {
  const newMiddleware: Middleware = (oldRoute) => {
    const newRoute = oldRoute;
    // @ts-ignore
    newRoute[optName] = newValue;
    return newRoute;
  };

  return newMiddleware;
}

// TODO: Think about function naming
// TODO: Figure out what the heck this genOpts done and if its useless remove it
/**
 * Child of EzApp. Handles route generation for
 */
export class EzRouter extends EzApp {
  _generators: { [key: string]: IGenerator };
  _genOpts: RouterOptions;

  constructor(
    opts: RouterOptions = { prefix: '', generators: getDefaultGenerators() },
  ) {
    super();
    this._genOpts = opts;
    this._generators = opts.generators ?? {};

    this.setHandler(`Add Create Schema`, async (instance, opts) => {
      const schema = instance.ezRepo.getCreateSchema()
      instance.server.addSchema(schema);
    });

    this.setHandler(`Add Update Schema`, async (instance, opts) => {
      const schema = instance.ezRepo.getUpdateSchema()
      instance.server.addSchema(schema);
    });

    this.setHandler(`Add Full Schema`, async (instance, opts) => {
      const schema = instance.ezRepo.getFullSchema()
      instance.server.addSchema(schema);
    });

    // URGENT TODO: Allow inclusion and exclusion of routes
    Object.entries(this._generators).forEach(([generatorName, generator]) => {
      this.addRouteFromGenerator(generatorName, generator);
    });
  }

  // TODO: Refactor so that its not such a nested affair of functions
  addRouteFromGenerator(
    generatorName: string,
    generator: IGenerator,
    middlewares: Array<Middleware> = [],
    override = false,
  ) {
    // TODO: Consider about not using spaces in naming conventions
    const handlerName = `Generate ${generatorName} route`;
    if (override) {
      this.removeHook('_handler', handlerName);
    }
    this.setHandler(
      handlerName,
      generateRouteFactory(this._genOpts, generator, middlewares),
    );
  }

  // URGENT TODO: Make it such that invalid routeNames throw error which informs of possible route names

  _forFactory<KeyType>(overrideName: string, routeNames: Array<string>) {
    return (newVal: KeyType) => {
      const middleware = middlewareFactory(overrideName, newVal);
      Object.entries(this._generators).forEach(([generatorName, generator]) => {
        if (routeNames.includes(generatorName)) {
          this.addRouteFromGenerator(
            generatorName,
            generator,
            [middleware],
            true,
          );
        }
      });
    };
  }

  for(...routeNames: Array<string>) {
    return {
      method: this._forFactory<RouteOptions['method']>('method', routeNames),
      url: this._forFactory<RouteOptions['url']>('url', routeNames),
      schema: this._forFactory<RouteOptions['schema']>('schema', routeNames),
      exposeHeadRoute: this._forFactory<RouteOptions['exposeHeadRoute']>(
        'exposeHeadRoute',
        routeNames,
      ),
      attachValidation: this._forFactory<RouteOptions['attachValidation']>(
        'attachValidation',
        routeNames,
      ),
      onRequest: this._forFactory<RouteOptions['onRequest']>(
        'onRequest',
        routeNames,
      ),
      preParsing: this._forFactory<RouteOptions['preParsing']>(
        'preParsing',
        routeNames,
      ),
      preValidation: this._forFactory<RouteOptions['preValidation']>(
        'preValidation',
        routeNames,
      ),
      preHandler: this._forFactory<RouteOptions['preHandler']>(
        'preHandler',
        routeNames,
      ),
      preSerialization: this._forFactory<RouteOptions['preSerialization']>(
        'preSerialization',
        routeNames,
      ),
      onSend: this._forFactory<RouteOptions['onSend']>('onSend', routeNames),
      onResponse: this._forFactory<RouteOptions['onResponse']>(
        'onResponse',
        routeNames,
      ),
      handler: this._forFactory<RouteOptions['handler']>('handler', routeNames),
      errorHandler: this._forFactory<RouteOptions['errorHandler']>(
        'errorHandler',
        routeNames,
      ),
      validatorCompiler: this._forFactory<RouteOptions['validatorCompiler']>(
        'validatorCompiler',
        routeNames,
      ),
      serializerCompiler: this._forFactory<RouteOptions['serializerCompiler']>(
        'serializerCompiler',
        routeNames,
      ),
      schemaErrorFormatter: this._forFactory<
        RouteOptions['schemaErrorFormatter']
      >('schemaErrorFormatter', routeNames),
      bodyLimit: this._forFactory<RouteOptions['bodyLimit']>(
        'bodyLimit',
        routeNames,
      ),
      logLevel: this._forFactory<RouteOptions['logLevel']>(
        'logLevel',
        routeNames,
      ),
      config: this._forFactory<RouteOptions['config']>('config', routeNames),
      version: this._forFactory<RouteOptions['version']>('version', routeNames),
      prefixTrailingSlash: this._forFactory<
        RouteOptions['prefixTrailingSlash']
      >('prefixTrailingSlash', routeNames),
    };
  }
}
