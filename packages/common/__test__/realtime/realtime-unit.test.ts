import { EzBackend, EzApp, Type, RuleType } from '../../src';

const defaultConfig = {
  backend: {
    fastify: {
      logger: false,
    },
    typeorm: {
      database: ':memory:',
    },
  },
};
describe('Should be able to get io object', () => {
  let app: EzBackend;
  let child: EzApp;
  let nestedChild: EzApp;

  beforeEach(() => {
    app = new EzBackend();
    child = new EzApp();
    nestedChild = new EzApp();

    app.addApp(child, { prefix: 'child' });
    child.addApp(nestedChild, { prefix: 'nested-child' });

    app.removeHook('_run', 'Run Fastify Server');
  });

  afterEach(async () => {
    const instance = app.getInternalInstance();
    await instance.orm.close();
    await instance._server.close();
  });

  describe('Use socket IO', () => {
    test('Use with namespace', async () => {
      let socketUsed = false;

      const childApp = new EzApp();

      childApp.useSocketIO((socket) => {
        expect(socket.name).toBe('/child-app');
        socketUsed = true;
      });

      app.addApp(childApp, { prefix: 'child-app' });

      await app.start(defaultConfig);

      expect(socketUsed).toBe(true);
    });
    test('Use without namespace', async () => {
      const childApp = new EzApp();

      let socketUsed = false;

      childApp.useSocketIORaw((socket) => {
        expect(socket.name).toBe('/');
        socketUsed = true;
      });

      app.addApp(childApp, { prefix: 'child-app' });

      await app.start(defaultConfig);

      expect(socketUsed).toBe(true);
    });
  });

  describe('Get Socket IO', () => {
    test('Get with namespace', async () => {
      let handlerRan = false;

      nestedChild.setHandler('Check SocketIO', async (instance, opts) => {
        handlerRan = true;
        expect(nestedChild.getSocketIO().name).toBe('/child/nested-child');
      });

      await app.start(defaultConfig);

      expect(handlerRan).toBe(true);
    });

    test('Get without namespace', async () => {
      nestedChild.setHandler('Check SocketIO', async (instance, opts) => {
        expect(nestedChild.getSocketIORaw().name).toBe('/');
      });

      await app.start(defaultConfig);
    });
  });
});
