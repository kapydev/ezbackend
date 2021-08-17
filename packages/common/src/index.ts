import { IOptions } from "./definitions";
import { IEzbConfig } from "@ezbackend/core";
import { fastify } from "fastify";
import path from "path";
import { EzBackend } from "./definitions";
import { mixedInstance } from "avvio";
import { createConnection } from "typeorm";
import { RouteOptions } from "fastify";
import { APIGenerator } from "./models";
import {convert} from './models/typeorm-json-schema'

const ezb = EzBackend.app();

//Configure defaults
ezb.plugins.init = async (
  ezb: mixedInstance<EzBackend>,
  opts: IEzbConfig & IOptions,
  cb
) => {
  ezb.orm = await createConnection(opts.orm);
  ezb.server = fastify(opts.server);
  cb();
};

ezb.plugins.handler = (ezb: mixedInstance<EzBackend>, opts: IEzbConfig, cb) => {
  const customEzbPath =
    opts.entryPoint ?? path.join(process.cwd(), ".ezb/index.ts");
  require(customEzbPath);
  ezb.models.forEach((model) => {
    const repo = ezb.orm.getRepository(model);

    //LEFT OFF
    // const metaData = ezb.orm.getMetadata(model)
    // console.log(convert(metaData))

    const generator = new APIGenerator(repo, { prefix: repo.metadata.name });
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
      process.exit(1);
    }
  });
  cb();
};

export { EzBackend } from "./definitions";
export { EzModel, response, APIGenerator } from "./models";
