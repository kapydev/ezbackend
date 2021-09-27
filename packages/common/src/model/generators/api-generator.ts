import { Repository } from "typeorm";
import { RouteOptions } from "fastify";
import { EzApp } from "../../ezapp"
import { getCreateSchema, getFullSchema, getUpdateSchema } from "../typeorm-json-schema";
import { getDefaultGenerators, GenerateOpts } from "./default-generators"


interface IAPIGeneratorOpts {
    prefix: string;
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

//TODO: Custom routes involving apps?
/**
 * Factory function for generating routes. 
 * @param genOpts 
 * @param generator 
 * @returns 
 */
export function generateRouteFactory(genOpts, generator) {
    return async (instance, opts) => {
        const routes: Array<RouteOptions> = [].concat(generator(instance.repo, genOpts))
        routes.forEach((route) => {
            instance.server.route(route)
        })

    }
}

//TODO: Think about function naming
//TODO: Figure out what the heck this genOpts done and if its useless remove it
/**
 * Child of EzApp. Handles route generation for 
 */
export class EzRouter extends EzApp {
    constructor(opts: IAPIGeneratorOpts = { prefix: '' }, generators = getDefaultGenerators()) {
        super()
        const genOpts = opts

        //URGENT TODO
        //LEFT OFF: Why are the schemas not displaying on the fastify? Registered too early or something?

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

        Object.entries(generators).forEach(([generatorName, generator]) => {
            this.setHandler(
                `Generate ${generatorName} route`,
                //TODO: Figure why it is grayed out
                generateRouteFactory(genOpts, generator))
        });

    }
}
