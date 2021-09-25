import { App, PluginScope, kApp } from '@ezbackend/core'
import { convert, getDefaultGenerators, generateRouteFactory } from '@ezbackend/common'
import fastifyStatic from 'fastify-static'
import path from 'path'
import { RouteOptions } from 'fastify'
import chalk from 'chalk'
import { buildRoutePrefix } from '@ezbackend/common'

//TODO: Source maps for debugging?
function getDbUIGenerators() {
    const generators = getDefaultGenerators()
    Object.keys(generators).forEach(key => {
        const oldGenerator = generators[key]
        generators[key] = (repo, opts) => {
            const routeDetails = oldGenerator(repo, opts)
            return {
                ...routeDetails,
                schema: {
                    ...routeDetails.schema,
                    summary: `Used internally by database UI`,
                    tags: ['db-ui'],
                    deprecated: true
                }
            }
        }
    })
    return generators
}

async function addDBSchemas(instance, opts) {
    instance.entities.forEach(entity => {
        const repo = instance.orm.getRepository(entity)
        const { createSchema, updateSchema, fullSchema } = convert(repo.metadata, 'db-ui')
        instance.server.addSchema(createSchema)
        instance.server.addSchema(updateSchema)
        instance.server.addSchema(fullSchema)
    })
}

//TODO: Make generator more robust? Like add prefix options for example

async function addDbUIEndpoints(instance, opts) {
    const generators = getDbUIGenerators()

    //LEFT OFF: Schemas not showing on API documentation!!! Why you gotta be like this fastify!?!?!

    instance.entities.forEach(entity => {
    const repo = instance.orm.getRepository(entity)
        Object.values(generators).forEach(generator => {
            const routes: Array<RouteOptions> = [].concat(generator(repo,{schemaPrefix:"db-ui"}))
            routes.forEach((route) => {
                //Update the route prefix manually here
                route.url = buildRoutePrefix(`/db-ui/${repo.metadata.name}`,route.url)
                instance.server.route(route)
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

class DBEndpointRouter extends App {
    constructor() {
        super()
        this.setHandler("Add DB-UI endpoints", addDbUIEndpoints)

    }
}

export class EzDbUI extends App {
    constructor() {
        super()
        this.setHandler("Add DB-UI endpoint schemas", addDBSchemas)

        this.addApp("DB-UI Endpoint Router", new DBEndpointRouter())

        this.setHandler("Serve UI Interface", async (instance, opts) => {
            instance.server.register(fastifyStatic, {
                root: path.join(__dirname, "../ezbackend-database-ui/build"),
                prefix: "/db-ui",
                prefixAvoidTrailingSlash: true
            })
        })

        this.setPostRun("Display DB UI URL", async (instance, opts) => {
            if (opts.port) {
                console.log(chalk.greenBright(`Use the database UI at `) + chalk.yellow.underline(`http://localhost:${opts.port}/db-ui/`))
            }
        })


        //TODO: Global plugin scope
        this.scope = PluginScope.PARENT

    }
}