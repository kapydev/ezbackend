import { defaultGenerators, APIGenerator, convert } from '@ezbackend/common'
import { EzBackend } from "@ezbackend/core"
import fastifyStatic from 'fastify-static'
import path from 'path'

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
            const generateDBroutes = async (emm, opts) => {
                //URGENT TODO: Seperate the DB routes from the user defined ones
                emm.dbGenerator = new APIGenerator(emm.repo, { prefix: `db-ui/${emm.model.name}` })
                emm.dbGenerator.generator = defaultGenerators
                emm.dbGenerator.generateRoutes({schemaPrefix:"db-ui"})
            }

            emm.plugins.preRun.push(generateDBroutes)
        })
    })

    ezb.plugins.preRun.push(async (ezb, opts) => {

        //Serve static files
        ezb.server.register(fastifyStatic, {
            root: path.join(__dirname, "../placeholder/build"),
            prefix: "/db-ui",
            prefixAvoidTrailingSlash: true
        })
    })
}
