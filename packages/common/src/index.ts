import { IEzbConfig } from '@ezbackend/core';
import { Sequelize, Options as SequelizeOptions } from "sequelize";
import { fastify, FastifyServerOptions } from "fastify";
import path from "path";
import { EzBackend } from "./definitions";
import { EzRouter, EzModel } from "./models";
import { mixedInstance } from "avvio";

const ezb = EzBackend.app() as EzBackend;

//TODO: Import this instead
interface IEzbUserConfig<ServerOptions,OrmOptions> extends IEzbConfig {
  server?: ServerOptions,
  orm?: OrmOptions,
  port?: number
}

type IEzbDefaultUserConfig = IEzbUserConfig<FastifyServerOptions,SequelizeOptions>


//Configure defaults
ezb.plugins.init = (ezb: mixedInstance<EzBackend>, opts:IEzbDefaultUserConfig, cb) => {
  console.log('initing')
  ezb.sequelize = new Sequelize("sqlite::memory", opts.orm);
  ezb.server = fastify(opts.server);
  cb();
};

ezb.plugins.handler = (ezb: mixedInstance<EzBackend>, opts:IEzbDefaultUserConfig, cb) => {
  const customEzbPath = opts.entryPoint ?? path.join(process.cwd(), ".ezb/index.ts");
  const customEzb = require(customEzbPath);
  const routers = Object.values(customEzb).filter(
    (obj) => obj instanceof EzRouter
  ) as Array<EzRouter>;
    console.log(routers)
    console.log(';handling')
  routers.forEach((router) => {
    router.registerRoutes();
  });
  cb();
};

ezb.plugins.run = async (ezb: mixedInstance<EzBackend>, opts:IEzbDefaultUserConfig, cb) => {
  await ezb.sequelize.sync();
  await ezb.server.listen(opts.port, function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
  cb();
};

export { EzBackend } from "./definitions";
export { getModelSchema, EzRouter, EzModel, response } from "./models";
