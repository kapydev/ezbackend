import clientIO, { Socket as ClientSocket } from 'socket.io-client';
import { EzBackend, EzModel, RuleType, Type } from '../../src';

function connectAsync(socket: ClientSocket) {
  return new Promise((resolve, reject) => {
    socket.connect();
    socket.once('connect', () => {
      resolve(socket);
    });
    socket.once('connect_error', function () {
      reject(new Error('connect_error'));
    });
    socket.once('connect_timeout', function () {
      reject(new Error('connect_timeout'));
    });
  });
}

describe('All realtime listeners should run as expected', () => {
  let app: EzBackend;
  let fakeUser: EzModel;
  let clientSocket: ClientSocket;
  let clientSocket2: ClientSocket;

  const PORT = 8003;

  beforeEach(async () => {
    app = new EzBackend();
    fakeUser = new EzModel('FakeUser', {
      name: Type.VARCHAR,
      age: Type.INT,
    });

    app.addApp(fakeUser, { prefix: 'user' });
  });

  afterEach(async () => {
    clientSocket.close();
    clientSocket2.close();
    await app.close();
  });

  test('Should be able to receive create events', async () => {
    await app.start({
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
    });

    clientSocket = clientIO(`http://localhost:${PORT}`, {
      reconnectionDelay: 0,
      forceNew: true,
      transports: ['websocket'],
    });

    clientSocket2 = clientIO(`http://localhost:${PORT}`, {
      reconnectionDelay: 0,
      forceNew: true,
      transports: ['websocket'],
      extraHeaders: {
        'block-me': 'true',
      },
    });

    await connectAsync(clientSocket);
    await connectAsync(clientSocket2);

    const userPayload = {
      name: 'Thomas',
      age: 23,
    };

    let blockMeHit = false;

    fakeUser.rules.for(RuleType.READ).check((req, event) => {
      if (req?.headers['block-me'] === 'true') {
        blockMeHit = true;
        throw new Error('User is blocked based on request');
      }
    });

    const doneFlag = new Promise<void>((resolve, reject) => {
      clientSocket.on('entity_created', (modelName: string, entity: any) => {
        expect(modelName).toBe('FakeUser');
        expect(entity).toMatchObject(userPayload);
        setImmediate(() => {
          // Give the other listener an event loop to possibly receive an event and throw an error
          resolve();
        });
      });

      clientSocket2.on('entity_created', (modelName: string, entity: any) => {
        reject(new Error('This socket should not receive the event'));
      });
    });

    await app.inject({
      method: 'POST',
      url: '/user',
      payload: userPayload,
    });

    await doneFlag;

    expect(blockMeHit).toBe(true);
  });

  test.todo(
    'Confirm that the socket request hooks library does not clash namespace with normal usage of als',
  );
});
