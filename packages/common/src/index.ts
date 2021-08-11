import { Sequelize } from "sequelize";
import { fastify } from "fastify";
import path from "path";
import { EzBackend } from "./definitions";
import { EzRouter } from "./models";

const ezb = EzBackend.app() as EzBackend;

ezb.options = {
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 8888,
  },
};

//Configure defaults
ezb.plugins.init = () => {
  ezb.sequelize = new Sequelize("sqlite::memory");
  ezb.server = fastify({
    logger: {
      prettyPrint: {
        translateTime: "SYS:HH:MM:ss",
        ignore: "pid,hostname,reqId,responseTime,req,res",
        messageFormat: "[{req.method} {req.url}] {msg}",
      },
    },
  });
};

ezb.plugins.handler = () => {
  //TODO: Allow user to specify the ezb path he wants
  const customEzbPath = path.join(process.cwd(), ".ezb/index.ts");
  const customEzb = require(customEzbPath);
  const routers = Object.values(customEzb).filter(
    (obj) => obj instanceof EzRouter
  ) as Array<EzRouter>
  routers.forEach((router) => {
    router.registerRoutes()
  })
};

ezb.plugins.preRun.push(() => {});

ezb.plugins.run = async () => {
  await ezb.server.listen(ezb.options.server.port, function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

export { EzBackend } from "./definitions";
export { getModelSchema, EzRouter, EzModel } from "./models";
