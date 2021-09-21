import { App, PluginScope } from '@ezbackend/core'
import { convert, getDefaultGenerators, generateRouteFactory } from '@ezbackend/common'
import fastifyStatic from 'fastify-static'
import path from 'path'
import {RouteOptions} from 'fastify'
import chalk from 'chalk'

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

async function addDbUIEndpoints(instance, opts) {
    const generators = getDbUIGenerators()

    instance.entities.forEach(entity => {
        const repo = instance.orm.getRepository(entity)
        Object.values(generators).forEach(generator => {
            instance.server.register(
                async (server, opts) => {
                    const routes: Array<RouteOptions> = [].concat(generator(repo))
                    routes.forEach((route) => {
                        server.route(route)
                    })
                },
                {
                    prefix: 'prefix'
                }
            )
        })
    })
}

export class EzDbUI extends App {
    constructor() {
        super()
        this.setPostHandler("Add DB-UI endpoint schemas", addDBSchemas)

        this.setPostHandler("Add DB-UI endpoints", addDbUIEndpoints)

        this.setPreRun("Serve UI Interface", async (instance, opts) => {
            instance.server.register(fastifyStatic, {
                root: path.join(__dirname, "../ezbackend-database-ui/build"),
                prefix: "/db-ui",
                prefixAvoidTrailingSlash: true
            })
        })

        this.setPostRun("Display DB UI URL", async (instance,opts) => {
            if (opts.port) {
                console.log(chalk.greenBright(`Use the database UI at `) + chalk.yellow.underline(`http://localhost:${opts.port}/db-ui/`))
            }
        })


        //TODO: Global plugin scope
        this.scope = PluginScope.PARENT

    }
}