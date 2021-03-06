import { Server } from 'socket.io';
import { socketContextPlugin } from 'socket-io-event-context';
import { EzBackend, EzBackendInstance, EzBackendOpts } from '..';
import '../declarations/socket-io-declarations';

export const createSocketIO = async (
  instance: EzBackendInstance,
  opts: any,
) => {
  const io = new Server(opts?.['socket.io']);
  instance.socketIO = io;
  io.use(socketContextPlugin);
};

export const attachSocketIO = async (
  instance: EzBackendInstance,
  opts: any,
) => {
  instance.socketIO.attach(instance._server.server);

  // TODO: Add to documentation that the request is decorated with these
  instance._server.decorate('io', instance.socketIO);
  instance._server.decorateRequest('io', { getter: () => instance.socketIO });

  instance._server.addHook('onClose', (fastify, done) => {
    instance.socketIO.close();
    done();
  });
};
