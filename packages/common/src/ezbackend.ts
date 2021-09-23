import { App } from "@ezbackend/core";
import fastify from "fastify";
import fastifyBoom from 'fastify-boom'
import { createConnection } from "typeorm";
import override from 'fastify/lib/pluginOverride'

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

export class EzBackend extends App {
    constructor() {
        super()
        this.setInit('Create Fastify Server', async (instance, opts) => {
            instance.server = fastify(opts.server)
        })
        this.setInit('Add Fastify Boom', async (instance, opts) => {
            instance.server.register(fastifyBoom)
        })
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
        this.setPreHandler('Add Error Schema', addErrorSchema)

        this.setRun('Run Fastify Server', async (instance, opts) => {
            await instance.server.listen(opts.port)
        })

        this.setCustomOverride("server", override)

    }
}