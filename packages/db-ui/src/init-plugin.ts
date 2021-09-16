import { defaultGenerators, APIGenerator, convert, } from '@ezbackend/common'
import { IEzbConfig } from '@ezbackend/core'
import { EzBackend } from "@ezbackend/core"
import fastifyStatic from 'fastify-static'
import {RouteOptions} from 'fastify'
import path from 'path'
import chalk from 'chalk'

//URGENT TODO: Right now this has a dependency on common and openapi. we need to make this clear to the user

export default function init(config) {

    const ezb = EzBackend.app()

    ezb.plugins.postHandler.push(async (ezb, opts) => {
        //Generate DB Routes
        ezb.models.forEach(emm => {


            const addDBschemas = async (emm, opts) => {
                emm.repo = ezb.orm.getRepository(emm.model)
                const { createSchema, updateSchema, fullSchema } = convert(emm.repo.metadata, 'db-ui')
                ezb.server.addSchema(createSchema)
                ezb.server.addSchema(updateSchema)
                ezb.server.addSchema(fullSchema)
            }

            //URGENT TODO: Figure out why preInit and postInit pushes seem to do nothing
            emm.plugins.preRun.push(addDBschemas)


            //URGENT TODO: typechecking
            //TODO: Optimisation, run once instead of for all models
            const generateDBroutes = async (emm, opts) => {
                emm.dbGenerator = new APIGenerator(emm.repo, { prefix: `db-ui/${emm.model.name}` })
                emm.dbGenerator.generators = { ...defaultGenerators }
                //Seperate db-ui routes
                Object.keys(emm.dbGenerator.generators).forEach(key => {
                    const oldGenerator = emm.dbGenerator.generators[key]
                    emm.dbGenerator.generators[key] = (repo, opts) => {
                        const routeDetails = oldGenerator(repo, opts) as RouteOptions
                        return {
                            ...routeDetails,
                            schema: {
                                ...routeDetails.schema,
                                summary: `Used internally by database UI`,
                                tags: ['db-ui'],
                                deprecated:true
                            }
                        }
                    }
                })

                emm.dbGenerator.generateRoutes({ schemaPrefix: "db-ui" })

            }

            emm.plugins.postRun.push(generateDBroutes)
        })
    })

    ezb.plugins.preRun.push(async (ezb, opts) => {

        //Serve static files
        ezb.server.register(fastifyStatic, {
            root: path.join(__dirname, "../ezbackend-database-ui/build"),
            prefix: "/db-ui",
            prefixAvoidTrailingSlash: true
        })
    })

    //TODO: Make page when user reopens swagger
    ezb.plugins.postRun.push((ezb, opts: IEzbConfig, cb) => {
        // ezb.server.swagger();
        if (opts.port) {
            console.log(chalk.greenBright(`Use the database UI at `) + chalk.yellow.underline(`http://localhost:${opts.port}/db-ui/`))
        }
        cb()
    })
}
