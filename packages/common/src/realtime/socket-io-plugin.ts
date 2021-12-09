import { Server } from "socket.io"
import { socketContextPlugin } from "socket-io-event-context"
import { EzBackend, EzBackendInstance, EzBackendOpts } from '..'

declare module 'fastify' {
  interface FastifyInstance {
    io: Server
  }
}

export const createSocketIO = (ezbackend: EzBackend) => {
  //Higher order function because we need a reference to the original ezbackend for the opts merging
  return async (instance: EzBackendInstance, opts: any) => {

    const socketIOopts = ezbackend.getOpts('backend', opts)["socket.io"]
    const io = new Server(socketIOopts)
    instance.socketIO = io

    io.use(socketContextPlugin)

  }
}


export const attachSocketIO = async (instance: EzBackendInstance, opts: any) => {

  instance.socketIO.attach(instance._server.server)

  instance._server.decorate('io', instance.socketIO)

  instance._server.addHook('onClose', (fastify, done) => {
    fastify.io.close()
    done()
  })
}