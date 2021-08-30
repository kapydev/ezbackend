import { IOptions } from "./definitions";
import { IEzbConfig, EzBackend } from "@ezbackend/core";
import { fastify } from "fastify";
import { mixedInstance } from "avvio";
import { createConnection } from "typeorm";
import { APIGenerator } from "./models";
import { kebabCase } from "./helpers";
import {convert} from './models/typeorm-json-schema'
import fastifyBoom from 'fastify-boom'
import "./definitions";

const ezb = EzBackend.app();

//Configure defaults
ezb.plugins.init = async (
  ezb: mixedInstance<EzBackend>,
  opts: IEzbConfig & IOptions,
  cb
) => {
  ezb.server = fastify(opts.server);
  ezb.server.register(fastifyBoom)
  cb();
};

//TODO: Remove the requirement for including mixedINstance and IEzbConfig & IOptions
//TODO: Consider if automatically including createdAt and updatedAt is useful
ezb.plugins.handler = async (ezb: mixedInstance<EzBackend>, opts: IEzbConfig &IOptions, cb) => {
  //URGENT TODO: Think about consequences of using createConnection to import index.ts
  ezb.orm = await createConnection(opts.orm);
  //TODO: Think about a better place of adding this schema
  ezb.server.addSchema({
    "$id": "ErrorResponse",
    type: 'object',
    properties: {
      statusCode: {type: 'number'},
      error: {type:'string'},
      message: {type: 'string'}
    }
  })
  ezb.models.forEach((model) => {
    
    //Add all models to be a schema
    const metaData = ezb.orm.getMetadata(model)
    const {createSchema,updateSchema,fullSchema} = convert(metaData)
    ezb.server.addSchema(createSchema)
    ezb.server.addSchema(updateSchema)
    ezb.server.addSchema(fullSchema)

    //Create api routes for all repositories
    const repo = ezb.orm.getRepository(model);
    const generator = new APIGenerator(repo, { prefix: kebabCase(repo.metadata.name) });
    //LEFT OFF: Edit the generator to add authuser and auth
    generator.generateRoutes();
  });
  cb();
};

ezb.plugins.run = async (
  ezb: mixedInstance<EzBackend>,
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

export * from "./models";
