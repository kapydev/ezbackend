import { IEzbConfig, EzBackend } from "@ezbackend/core";
import fastify from "fastify";
import fastifyBoom from 'fastify-boom'
import { IOptions } from "./definitions";
import { createConnection } from "typeorm";


export default function init(config) {
    const ezb = EzBackend.app();

    //Configure defaults
    ezb.plugins.init = async (
        ezb,
        opts: IEzbConfig & IOptions,
        cb
    ) => {
        ezb.server = fastify(opts.server);
        ezb.server.register(fastifyBoom)
        cb();
    };

    //TODO: Remove the requirement for including mixedINstance and IEzbConfig & IOptions
    //TODO: Consider if automatically including createdAt and updatedAt is useful
    ezb.plugins.handler = async (ezb, opts: IEzbConfig & IOptions, cb) => {
        //URGENT TODO: Think about consequences of using createConnection to import index.ts
        ezb.orm = await createConnection(opts.orm);
        //TODO: Think about a better place of adding this schema
        ezb.server.addSchema({
            "$id": "ErrorResponse",
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        })
        ezb.models.forEach((modelMeta) => {
            modelMeta.start()
        })
        cb();
    };

    ezb.plugins.run = async (
        ezb,
        opts: IEzbConfig,
        cb
    ) => {
        await ezb.server.listen(opts.port, function (err, address) {
            if (err) {
                console.error(err);
            }
        });
        cb();
    };
}