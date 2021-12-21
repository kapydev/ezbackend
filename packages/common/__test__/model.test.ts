import stripAnsi from 'strip-ansi';
import { Repository } from 'typeorm';
import { EzBackend, EzModel, Type } from '../src';

describe('Plugin Registering', () => {
  let app: EzBackend;

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

  beforeEach(() => {
    app = new EzBackend();

    // Prevent server from starting
    app.removeHook('_run', 'Run Fastify Server');
  });

  afterEach(async () => {
    app.close();
  });

  describe('Get Repo', () => {
    test('Should be able to get repo in the handler hook', async () => {
      const model = new EzModel('TestModel', {});

      app.addApp('model', model, { prefix: 'model' });

      app.setHandler('getRepo', async () => {
        const repo = model.getRepo();
        expect(repo instanceof Repository).toBe(true);
      });
      await app.start(defaultConfig);
    });

    test('Should not be able to get repo in the init hook', async () => {
      const model = new EzModel('TestModel', {});

      app.addApp('model', model, { prefix: 'model' });

      let errored = false;

      app.setInit('getRepo', async () => {
        try {
          model.getRepo();
        } catch {
          errored = true;
        }
      });
      await app.start(defaultConfig);

      expect(errored).toBe(true);
    });

    test('Should throw an error if an EzModel is defined with more than one primary column', async () => {
      const model = new EzModel('TestModel', {
        theOtherId: {
          type: Type.VARCHAR,
          primary: true,
        },
      });

      app.addApp(model, { prefix: 'model' });

      let errored = false;

      try {
        await app.start(defaultConfig);
      } catch (e) {
        // We strip the ansi characters because I think ansi characters don't appear in github actions during tests
        const noAnsiErr = stripAnsi(String(e));
        expect(noAnsiErr).toMatchSnapshot();
        errored = true;
      }

      expect(errored).toBe(true);
    });
  });
});
