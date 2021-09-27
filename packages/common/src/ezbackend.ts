import { EzApp } from "./ezapp";
import fastify from "fastify";
import fastifyBoom from 'fastify-boom'
import { createConnection } from "typeorm";


//TODO: Check if emojis will break instance names
//URGENT TODO: Strict types for instance, opts
async function addErrorSchema(instance, opts) {
    instance.server.addSchema({
        "$id": "ErrorResponse",
        type: 'object',
        properties: {
            statusCode: { type: 'number' },
            error: { type: 'string' },
            message: { type: 'string' }
        }
    })
}

/**
 * Child of EzApp. This is where you set up your backend setup tasks.
 */
export class EzBackend extends EzApp {

    constructor() {
        super()
        this.setInit('Create Entities Container', async (instance, opts) => {
            instance.entities = []
        })
        this.setPostInit('Create Database Connection', async (instance, opts) => {
            instance.orm = await createConnection(
                {
                    ...opts.orm,
                    entities: instance.entities
                }
            )
        })

        this.setHandler('Add Fastify Boom', async (instance, opts) => {
            instance.server.register(fastifyBoom)
        })
        this.setHandler('Add Error Schema', addErrorSchema)

        this.setPostHandler('Create Fastify Server', async (instance, opts) => {
            instance._server = fastify(opts.server)
        })

        this.setPostHandler('Register Fastify Plugins', async (instance, opts) => {
            this.registerFastifyPlugins(instance._server, this)
        })

        this.setRun('Run Fastify Server', async (instance, opts) => {
            await instance._server.listen(opts.port)
        })

    }

}