// URGENT TODO: Figure out why github actions is throwing req has 'any' type even though locally there is no issue

import { EzBackend } from '@ezbackend/common';
import { EzUser, EzAuth } from '../src';
import clientIO from 'socket.io-client';
import setCookie from 'set-cookie-parser';

import dotenv from 'dotenv';

describe('User Deserialization', () => {
  dotenv.config();

  let app: EzBackend;
  let user: EzUser;

  const PORT = 8003;

  const defaultConfig = {
    backend: {
      fastify: {
        logger: false,
      },
      typeorm: {
        database: ':memory:',
      },
      listen: {
        port: PORT,
      },
    },
    auth: {
      google: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: ['profile'],
      },
    },
  };

  // URGENT TODO: Figure out why teardown doesnt work (If you use beforeEach and afterEach the tests time out instead)
  beforeAll(async () => {
    app = new EzBackend();

    app.addApp(new EzAuth());

    user = new EzUser('User', ['google']);

    user.get('/me', async (req, res) => {
      return { user: req.user };
    });

    app.post('/body-to-session', (req, res) => {
      req.session.set('passport', (req.body as any).data);
      res.send();
    });

    app.addApp(user, { prefix: 'user' });

    app.useSocketIORaw((io) => {
      io.on('connection', (socket) => {
        socket.on('get-user', () => {
          // @ts-ignore
          socket.emit('user', socket.user);
        });
      });
    });

    await app.start(defaultConfig);
  });

  afterAll(async () => {
    await app.close();
  });

  test('Should be able to connect to socket.io (No auth)', (done) => {
    const clientSocket = clientIO(`http://localhost:${PORT}`, {
      reconnectionDelay: 0,
      forceNew: true,
      transports: ['websocket'],
    });

    clientSocket.connect();

    clientSocket.once('connect', () => {
      clientSocket.disconnect();
      done();
    });
  });

  test('Should be able to connect to socket.io (With auth)', (done) => {
    // Seed the database
    app
      .inject({
        method: 'POST',
        url: '/user',
        payload: {
          googleId: '1',
          googleData: {
            name: 'Robert',
          },
        },
      })
      .then(() => {
        return app.inject({
          method: 'POST',
          url: '/body-to-session',
          payload: {
            data: 'google-1',
          },
        });
      })
      .then((sessionResult) => {
        return setCookie.parse(sessionResult.headers['set-cookie'] as string, {
          decodeValues: true,
        });
      })
      .then((cookies) => {
        const authSession = cookies[0].value;

        const clientSocket = clientIO(`http://localhost:${PORT}`, {
          reconnectionDelay: 0,
          forceNew: true,
          transports: ['websocket'],
          extraHeaders: {
            session: authSession,
          },
        });

        clientSocket.connect();

        clientSocket.once('connect', () => {
          clientSocket.on('user', (user) => {
            expect(user).toMatchObject({
              id: 1,
              googleId: '1',
              googleData: {
                name: 'Robert',
              },
            });
            clientSocket.disconnect();
            done();
          });
          clientSocket.emit('get-user');
        });
      });
  });
  test.todo(
    'Should not be able to connect to socket.io (With bad session data)',
  );
});
