import { EzBackend, EzModel } from "../src";

import { Repository } from "typeorm";

describe("Plugin Registering", () => {
  let app: EzBackend;

  const defaultConfig = {
    backend: {
      fastify: {
        logger: false,
      },
      typeorm: {
        database: ":memory:",
      },
    },
  };

  beforeEach(() => {
    app = new EzBackend();

    // Prevent server from starting
    app.removeHook("_run", "Run Fastify Server");
  });

  afterEach(async () => {
    const instance = app.getInternalInstance();
    await instance.orm.close();
    await instance._server.close();
  });

  describe("Get Repo", () => {
    test("Should be able to get repo in the handler hook", async () => {
      const model = new EzModel("TestModel", {});

      app.addApp("model", model, { prefix: "model" });

      app.setHandler("getRepo", async () => {
        const repo = model.getRepo();
        expect(repo instanceof Repository).toBe(true);
      });
      await app.start(defaultConfig);
    });

    test("Should not be able to get repo in the init hook", async () => {
      const model = new EzModel("TestModel", {});

      app.addApp("model", model, { prefix: "model" });

      let errored = false;

      app.setInit("getRepo", async () => {
        try {
          model.getRepo();
        } catch {
          errored = true;
        }
      });
      await app.start(defaultConfig);

      expect(errored).toBe(true);
    });
  });
});
