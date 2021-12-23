import { EzApp } from '../src';

describe('EzApp Unit Tests', () => {
  describe('When using defaultOpts', () => {
    test('If default opts are defined it should return the default opts', async () => {
      const defaultOpts = { foo: 'bar' };

      const app = new EzApp();

      app.setHandler('Check default opts', async (instance, opts) => {
        // @ts-ignore
        expect(app.getOpts('fakePlugin', opts)).toMatchObject(defaultOpts);
      });

      app.setDefaultOpts(
        // @ts-ignore
        defaultOpts,
      );

      await app.start();
    });
    test('If default opts are not defined and opts are not specified it should throw an error', async () => {
      const app = new EzApp();

      let errored = false;

      app.setHandler('Check default opts', async (instance, opts) => {
        try {
          // @ts-ignore
          app.getOpts('fakePlugin', opts);
        } catch {
          errored = true;
        }
      });

      await app.start();

      expect(errored).toBe(true);
    });
  });

  describe('Building Route Prefix', () => {
    test('If there is no plugin prefix it should return the instance prefix', async () => {
      const app = new EzApp();

      const prefix = 'should-return-this';

      // @ts-ignore
      const outputPrefix = app.buildRoutePrefix(prefix);

      expect(outputPrefix).toBe(prefix);
    });
    test('Building Route Prefix should handle having slashes at the end of prefix and start of next item', async () => {
      const app = new EzApp();

      const prefix1 = '/should-return-this/';
      const prefix2 = '/and-then-this/';

      // @ts-ignore
      const outputPrefix = app.buildRoutePrefix(prefix1, prefix2);

      expect(outputPrefix).toBe('/should-return-this/and-then-this/');
    });
  });
});
