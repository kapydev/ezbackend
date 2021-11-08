import { PluginScope } from '@ezbackend/core'
import { convert, getDefaultGenerators, EzBackendInstance, EzBackendOpts,EzApp } from '@ezbackend/common'
import fastifyStatic from 'fastify-static'
import path from 'path'
import { RouteOptions, FastifyInstance } from 'fastify'
import chalk from 'chalk'

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

function getDbUIGenerators() {
    const generators = getDefaultGenerators()
    type GeneratorKey = keyof typeof generators
    Object.entries(generators).forEach(([key, oldGenerator]) => {
        generators[key as GeneratorKey] = (repo, opts) => {
            const routeDetails = oldGenerator(repo, opts)
            return {
                ...routeDetails,
                schema: {
                    ...routeDetails.schema,
                    summary: `Used internally by database UI`,
                    tags: ['db-ui'],
                    hide: true
                }
            }
        }
    })
    return generators
}

async function addDBSchemas(instance: EzBackendInstance, opts: EzBackendOpts) {
    instance.entities.forEach(entity => {
        const repo = instance.orm.getRepository(entity)
        const { createSchema, updateSchema, fullSchema } = convert(repo.metadata, 'db-ui')
        instance.server.addSchema(createSchema)
        instance.server.addSchema(updateSchema)
        instance.server.addSchema(fullSchema)
    })
}

//TODO: Make generator more robust? Like add prefix options for example

async function addDbUIEndpoints(instance: EzBackendInstance, opts: EzBackendOpts) {
    const generators = getDbUIGenerators()

    instance.entities.forEach(entity => {
        const repo = instance.orm.getRepository(entity)
        Object.values(generators).forEach(generator => {
            const routes = ([] as Array<RouteOptions>).concat(generator(repo, { schemaPrefix: "db-ui" }))
            routes.forEach((route) => {
                //Update the route prefix manually here
                route.url = buildRoutePrefix(`/db-ui/${repo.metadata.name}`, route.url)
                //TODO: Figure out why types don't match
                instance.server.route(route as Parameters<typeof instance['server']['route']>[0])
            })
        })
    })

    // instance.entities.forEach(entity => {
    //     const repo = instance.orm.getRepository(entity)
    //     Object.values(generators).forEach(generator => {
    //         instance.server.register(
    //             async (server, opts) => {
    //                 //TODO: Check schema prefix is correct
    //                 const routes: Array<RouteOptions> = [].concat(generator(repo))
    //                 routes.forEach((route) => {
    //                     server.route(route)
    //                 })
    //             },
    //             {
    //                 prefix: `/db-ui/${repo.metadata.name}`
    //             }
    //         )
    //     })
    // })
}

class DBEndpointRouter extends EzApp {
    constructor() {
        super()
        this.setHandler("Add DB-UI endpoints", addDbUIEndpoints)

    }
}

const BUILD_DIR = path.join(__dirname, "../ezbackend-database-ui/build")

async function dbUIFastifyPlugin(server: FastifyInstance, opts: any, cb: (...opts:any) => void) {

    server.register(fastifyStatic, {
        root: BUILD_DIR,
        wildcard: false
    })

    server.setNotFoundHandler((req, res) => {
        //TODO: Make this not have to go back to db-ui on refresh
        res.redirect("/db-ui")
    })

    cb()
}

export class EzDbUI extends EzApp {
    constructor() {
        super()
        this.setHandler("Add DB-UI endpoint schemas", addDBSchemas)

        this.addApp("DB-UI Endpoint Router", new DBEndpointRouter())

        this.setHandler("Serve UI Interface", async (instance, opts) => {

            instance.server.register(dbUIFastifyPlugin, { prefix: "db-ui" })

        })

        //TODO: Remove temporary opts any fix
        this.setPostRun("Display DB UI URL", async (instance, opts: any) => {
            if (opts.port && process.env.NODE_ENV != 'test') {
                console.log(chalk.greenBright(`Use the database UI at `) + chalk.yellow.underline(`http://localhost:${opts.port}/db-ui/`))
            }
        })


        //TODO: Global plugin scope
        this.scope = PluginScope.PARENT

    }
}