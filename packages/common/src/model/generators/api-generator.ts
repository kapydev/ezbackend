import { Repository } from "typeorm";
import { RouteOptions } from "fastify";
import { EzApp } from "../../ezapp"
import { getCreateSchema, getFullSchema, getUpdateSchema } from "../typeorm-json-schema";
import { getDefaultGenerators, GenerateOpts } from "./default-generators"
import merge from 'lodash.merge'


export interface RouterOptions {
    prefix?: string
    generators?: { [name: string]: IGenerator }
}

type IGenerator = (repo: Repository<unknown>, opts?: GenerateOpts) => RouteOptions | Array<RouteOptions>;

//Kudos to fastify team for this function, that will be hippity hoppity copied
/**
 * Use this for building route prefixes. 
 * Pass in the instance and plugin prefix to generate a proper route prefix.
 * @param instancePrefix 
 * @param pluginPrefix 
 * @returns 
 */
export function buildRoutePrefix(instancePrefix: string, pluginPrefix: string) {
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
/**
 * getRoutePrefix
 * @param prefixes 
 * @returns 
 */
export function getRoutePrefix(prefixes: Array<string>) {
    return prefixes.reduceRight(buildRoutePrefix)
}

export type Middleware = (oldRoute: RouteOptions) => RouteOptions

//TODO: Custom routes involving apps?
/**
 * Factory function for generating routes. 
 * @param genOpts 
 * @param generator 
 * @param middlewares 
 * @returns 
 */
export function generateRouteFactory(genOpts, generator, middlewares: Array<Middleware> = []) {
    return async (instance, opts) => {
        const routes: Array<RouteOptions> = [].concat(generator(instance.repo, genOpts))
        routes.forEach((route) => {
            let modifiedRoute = route
            middlewares.forEach(middleware => {
                modifiedRoute = middleware(modifiedRoute)
            })
            instance.server.route(modifiedRoute)
        })

    }
}

export function middlewareFactory(optName: string, newValue: any): Middleware {

    const newMiddleware: Middleware = (oldRoute) => {
        const newRoute = oldRoute
        newRoute[optName] = newValue
        return newRoute
    }

    return newMiddleware
}


//TODO: Think about function naming
//TODO: Figure out what the heck this genOpts done and if its useless remove it
/**
 * Child of EzApp. Handles route generation for 
 */
export class EzRouter extends EzApp {

    _generators: { [key: string]: IGenerator }
    _genOpts: RouterOptions

    constructor(opts: RouterOptions = { prefix: '', generators: getDefaultGenerators() }) {
        super()
        this._genOpts = opts
        this._generators = opts.generators

        this.setHandler(`Add Create Schema`, async (instance, opts) => {

            const schema = getCreateSchema(instance.repo.metadata)
            instance.server.addSchema(schema)
        })

        this.setHandler(`Add Update Schema`, async (instance, opts) => {
            const schema = getUpdateSchema(instance.repo.metadata)
            instance.server.addSchema(schema)
        })

        this.setHandler(`Add Full Schema`, async (instance, opts) => {
            const schema = getFullSchema(instance.repo.metadata)
            instance.server.addSchema(schema)
        })

        //URGENT TODO: Allow inclusion and exclusion of routes
        Object.entries(this._generators).forEach(([generatorName, generator]) => {
            this.addRouteFromGenerator(generatorName, generator)
        });

    }

    //TODO: Refactor so that its not such a nested affair of functions
    addRouteFromGenerator(generatorName: string, generator: IGenerator, middlewares: Array<Middleware> = [], override: boolean = false) {
        //TODO: Consider about not using spaces in naming conventions
        const handlerName = `Generate ${generatorName} route`
        if (override) {
            this.removeHook('_handler', handlerName)
        }
        this.setHandler(
            handlerName,
            generateRouteFactory(this._genOpts, generator, middlewares))
    }

    //URGENT TODO: Make it such that invalid routeNames throw error which informs of possible route names
    
    _forFactory<KeyType>(overrideName: string, routeNames: Array<string>) {
        return (newVal: KeyType) => {
            const middleware = middlewareFactory(overrideName, newVal)
            Object.entries(this._generators).forEach(([generatorName, generator]) => {
                if (routeNames.includes(generatorName)) {
                    this.addRouteFromGenerator(generatorName, generator, [middleware], true)
                }
            });
        }
    }

    for(...routeNames: Array<string>) {
        return {
            method: this._forFactory<RouteOptions['method']>('method', routeNames),
            url: this._forFactory<RouteOptions['url']>('url', routeNames),
            schema: this._forFactory<RouteOptions['schema']>('schema', routeNames),
            exposeHeadRoute: this._forFactory<RouteOptions['exposeHeadRoute']>('exposeHeadRoute', routeNames),
            attachValidation: this._forFactory<RouteOptions['attachValidation']>('attachValidation', routeNames),
            onRequest: this._forFactory<RouteOptions['onRequest']>('onRequest', routeNames),
            preParsing: this._forFactory<RouteOptions['preParsing']>('preParsing', routeNames),
            preValidation: this._forFactory<RouteOptions['preValidation']>('preValidation', routeNames),
            preHandler: this._forFactory<RouteOptions['preHandler']>('preHandler', routeNames),
            preSerialization: this._forFactory<RouteOptions['preSerialization']>('preSerialization', routeNames),
            onSend: this._forFactory<RouteOptions['onSend']>('onSend', routeNames),
            onResponse: this._forFactory<RouteOptions['onResponse']>('onResponse', routeNames),
            handler: this._forFactory<RouteOptions['handler']>('handler', routeNames),
            errorHandler: this._forFactory<RouteOptions['errorHandler']>('errorHandler', routeNames),
            validatorCompiler: this._forFactory<RouteOptions['validatorCompiler']>('validatorCompiler', routeNames),
            serializerCompiler: this._forFactory<RouteOptions['serializerCompiler']>('serializerCompiler', routeNames),
            schemaErrorFormatter: this._forFactory<RouteOptions['schemaErrorFormatter']>('schemaErrorFormatter', routeNames),
            bodyLimit: this._forFactory<RouteOptions['bodyLimit']>('bodyLimit', routeNames),
            logLevel: this._forFactory<RouteOptions['logLevel']>('logLevel', routeNames),
            config: this._forFactory<RouteOptions['config']>('config', routeNames),
            version: this._forFactory<RouteOptions['version']>('version', routeNames),
            prefixTrailingSlash: this._forFactory<RouteOptions['prefixTrailingSlash']>('prefixTrailingSlash', routeNames),
        }
    }
}
