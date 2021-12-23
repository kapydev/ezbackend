import { EzBackend, EzModel, Type, RuleType } from '../../src';

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

    fakeUser.rules.for(RuleType.DELETE).check((req, event) => {
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

  test('Rules should not affect custom endpoints made by the end user', async () => {
    fakeUser.rules.for(RuleType.READ).check((req, event) => {
      throw new Error('Access Denied');
    });

    fakeUser.get('/number-of-users', async (req, res) => {
      const repo = fakeUser.getRepo();
      const count = await repo.count();
      return { count: count };
    });

    await app.start(defaultConfig);

    const response = await app.inject({
      method: 'GET',
      url: '/user/number-of-users',
    });

    expect(response.json()).toMatchObject({ count: 0 });
  });

  // Note: This actually already works, its being used in DB-UI, I'm not sure if its being tested there but idk if it can be tested here
  test.todo('ignoreRules() should prevent rules from blocking requests');

  test('Rules should work with more than one Model', async () => {
    // In addition to fakeUser this makes it 2 Models
    const fakePost = new EzModel('FakePost', {
      summary: Type.VARCHAR,
      desc: Type.VARCHAR,
    });

    fakeUser.rules.for(RuleType.CREATE).check((req, event) => {
      'Gates open come right in';
    });

    fakePost.rules.for(RuleType.CREATE).check((req, event) => {
      throw new Error('Unauthorized');
    });

    app.addApp(fakePost, { prefix: 'post' });

    await app.start(defaultConfig);

    const responsePost = await app.inject({
      method: 'POST',
      url: '/post',
      payload: {
        summary: 'Yee yee haa',
        desc: 'Boogie Woogie',
      },
    });

    expect(responsePost.statusCode).toBe(400);

    const responseUser = await app.inject({
      method: 'POST',
      url: '/user',
      payload: {
        name: 'Hilbert',
        age: 12,
      },
    });

    expect(responseUser.statusCode).toBe(200);
  });

  describe('Rules should work on outgoing socket packets', () => {
    test.todo('create');
    test.todo('read');
    test.todo('update');
    test.todo('delete');
  });
});
