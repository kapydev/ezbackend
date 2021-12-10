import { EzBackend, EzModel, Type, RuleType, EzBackendOpts } from '../../src';

describe('All row level hooks should run as expected', () => {
  let app: EzBackend;
  let fakeUser: EzModel;

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

  beforeEach(async () => {
    app = new EzBackend();
    fakeUser = new EzModel('FakeUser', {
      name: Type.VARCHAR,
      age: Type.INT,
    });

    app.addApp(fakeUser, { prefix: 'user' });
    app.removeHook('_run', 'Run Fastify Server');
  });

  afterEach(async () => {
    const instance = app.getInternalInstance();
    await instance.orm.close();
    await instance._server.close();
  });
  test('Create Hook should trigger for http request', async () => {
    let ruleRan = false;

    fakeUser.rules.for(RuleType.CREATE).check((req, event) => {
      ruleRan = true;
      expect(req?.method).toBe('POST');
      expect(req?.url).toBe('/user');
      expect(event.entity).toMatchObject({
        id: 1,
        age: 24,
        name: 'Robert',
      });
    });

    await app.start(defaultConfig);

    await app.inject({
      method: 'POST',
      url: '/user',
      payload: {
        name: 'Robert',
        age: 24,
      },
    });

    expect(ruleRan).toBe(true);
  });
  test('Read Hook should trigger for http request', async () => {
    let ruleRan = false;

    fakeUser.rules.for(RuleType.READ).check((req, event) => {
      ruleRan = true;
      expect(req?.method).toBe('GET');
      expect(req?.url).toBe('/user');
      expect(event.entity).toMatchObject({
        id: 1,
        age: 24,
        name: 'Robert',
      });
    });

    await app.start(defaultConfig);

    await app.inject({
      method: 'POST',
      url: '/user',
      payload: {
        name: 'Robert',
        age: 24,
      },
    });

    await app.inject({
      method: 'GET',
      url: '/user',
    });

    expect(ruleRan).toBe(true);
  });

  test('Update Hook should trigger for http request', async () => {
    let ruleRan = false;

    fakeUser.rules.for(RuleType.UPDATE).check((req, event) => {
      ruleRan = true;
      expect(req?.method).toBe('PATCH');
      expect(req?.url).toBe('/user/1');
      expect(event.entity).toMatchObject({
        id: 1,
        age: 24,
        name: 'Mary',
      });
    });

    await app.start(defaultConfig);

    await app.inject({
      method: 'POST',
      url: '/user',
      payload: {
        name: 'Robert',
        age: 24,
      },
    });

    await app.inject({
      method: 'PATCH',
      url: '/user/1',
      payload: {
        name: 'Mary',
      },
    });

    expect(ruleRan).toBe(true);
  });

  test('Delete Hook should trigger for http request', async () => {
    let ruleRan = false;

    fakeUser.rules.for(RuleType.READ).check((req, event) => {
      ruleRan = true;
      expect(req?.method).toBe('DELETE');
      expect(req?.url).toBe('/user/1');
      expect(event.entity).toMatchObject({
        id: 1,
        age: 24,
        name: 'Robert',
      });
    });

    await app.start(defaultConfig);

    await app.inject({
      method: 'POST',
      url: '/user',
      payload: {
        name: 'Robert',
        age: 24,
      },
    });

    await app.inject({
      method: 'DELETE',
      url: '/user/1',
    });

    expect(ruleRan).toBe(true);
  });
});
