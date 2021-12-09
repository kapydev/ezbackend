import { EzBackend } from "../../common/src";
import { EzCors } from "../src";

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
describe("Cors", () => {
    let app: EzBackend
    beforeAll(() => {
        app = new EzBackend()
        app.addApp(new EzCors())
        app.removeHook('_run','Run Fastify Server')
    })

  it("Should be able to be used as a plugin (Smoke test)", async () => {
    await app.start(defaultConfig);
    const instance = app.getInternalInstance();
    await instance.orm.close();
    await instance._server.close();
  });

  it.todo("Should allow requests from localhost");
  it.todo("Should allow all requests from GET,PUT,POST,PATCH,DELTE,OPTIONS");
  it.todo("Should support session credentials");
  it.todo("Should allow block requests from unknown origins");
});
