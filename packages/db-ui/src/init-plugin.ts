import { defaultGenerators, APIGenerator } from '@ezbackend/common'
import { EzBackend } from "@ezbackend/core"
import fastifyStatic from 'fastify-static'
import path from 'path'

export default function init(config) {

    console.log(defaultGenerators)

    const ezb = EzBackend.app()

    ezb.plugins.postHandler.push(async (ezb, opts) => {
        //Generate DB Routes
        ezb.models.forEach(emm => {

            //URGENT TODO: typechecking
            const generateDBroutes = async (emm,opts) => {
                emm.dbGenerator = new APIGenerator(emm.repo, {prefix: `db-ui/${emm.model.name}`})
                emm.dbGenerator.generator = defaultGenerators
                emm.dbGenerator.generateRoutes()
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
