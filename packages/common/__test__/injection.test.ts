import { EzBackend, EzBackendOpts, RecursivePartial } from '../src';

describe('Plugin Registering', () => {
  let app: EzBackend;

  const defaultConfig: RecursivePartial<EzBackendOpts> = {
    backend: {
      fastify: {
        logger: false,
      },
      typeorm: {
        database: ':memory:',
      },
    },
  };

  beforeEach(() => {
    app = new EzBackend();

    // Prevent server from starting
    app.removeHook('_run', 'Run Fastify Server');
  });

  afterEach(async () => {
    const instance = app.getInternalInstance();
    await instance.orm.close();
    await instance._server.close();
  });

  it('Injection before starting should fail', async () => {
    const mock = jest.fn();

    try {
      await app.inject({
        method: 'GET',
        url: '/',
      });
    } catch {
      mock();
    } finally {
      await app.start(defaultConfig);
      expect(mock.mock.calls.length).toBe(1);
    }
  });
});
