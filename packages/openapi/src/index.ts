import { EzBackend } from "@ezbackend/common";
import fastifySwagger from "fastify-swagger"
import open from 'open'

//TODO: Figure out how we can avoid the as EzBackend repeatedly
const ezb = EzBackend.app() as EzBackend;


//Configure defaults
ezb.plugins.postInit.push(() => {
  ezb.server.register(fastifySwagger, {
    prefix: "/docs",
    routePrefix: "/docs",
    exposeRoute: true,
    //TODO: Figure out why its logging so much
    logLevel: 'warn',
    swagger: {
      info: {
        title: "EzBackend API",
        description: "Automatically generated documentation for EzBackend",
        version: "1.0.0",
      },
      externalDocs: {
        url: "https://github.com/Collaboroo/ezbackend",
        description: "Find more info here",
      },
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });
});

ezb.plugins.postRun.push(()=> {
  // ezb.server.swagger();
  if (ezb.options.server.port) open(`http://localhost:${ezb.options.server.port}/docs`);
})