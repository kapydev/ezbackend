import { EzApp, EzBackendOpts } from "@ezbackend/common";
import fastifyCors, { FastifyCorsOptions } from "fastify-cors";

import { PluginScope } from "@ezbackend/core";
import { ezWarning } from "@ezbackend/utils";

declare module "@ezbackend/common" {
  interface EzBackendOpts {
    cors: FastifyCorsOptions;
  }
}

const defaultConfig: EzBackendOpts["cors"] = {
  origin: true,
  credentials: true,
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
};

export class EzCors extends EzApp {
  constructor() {
    super();

    this.setDefaultOpts(defaultConfig);

    this.setHandler("Add Cors Plugin", async (instance, fullOpts) => {
      const opts = this.getOpts("cors", fullOpts);

      if (opts.origin === true) {
        ezWarning(
          "Reflecting the cors origin leaves your backend vulnerable to CSRF attacks. Set it only to trusted urls.",
        );
      }

      instance.server.register(fastifyCors, opts);
    });

    // TODO: Think about naming of PluginScope for scope... should it be a function instead?
    this.scope = PluginScope.PARENT;
  }
}
