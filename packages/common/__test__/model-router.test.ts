import {
  EzBackend,
  EzBackendOpts,
  EzModel,
  RecursivePartial,
  Type,
} from "../src";

describe("Plugin Registering", () => {
  let app: EzBackend;

  const defaultConfig: RecursivePartial<EzBackendOpts> = {
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

  it("router => for => hook syntax should work", async () => {
    const mock1 = jest.fn();

    const testModel = new EzModel("test", {
      var1: Type.VARCHAR,
    });

    app.addApp("test", testModel, { prefix: "test" });

    testModel.router.for("createOne").preHandler(async (req, res) => {
      mock1();
    });

    await app.start(defaultConfig);

    await app.inject({
      method: "POST",
      url: "/test",
      payload: {
        var1: "hello world",
      },
    });

    expect(mock1.mock.calls.length).toBe(1);
  });
});
