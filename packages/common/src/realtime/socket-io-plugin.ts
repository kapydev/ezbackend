import {Server} from "socket.io"
import { EzBackendInstance } from '..'

declare module 'fastify' {
    interface FastifyInstance {
      io: Server
    }
  }

export const createSocketIO = async (instance: EzBackendInstance, opts: any) => {
    const io = new Server(opts?.["socket.io"])
    instance.socketIO = io
}

export const attachSocketIO = async(instance: EzBackendInstance, opts:any) => {

    instance.socketIO.attach(instance._server.server)

    instance._server.decorate('io',instance.socketIO)

    instance._server.addHook('onClose', (fastify,done) => {
        fastify.io.close()
        done()
    })
}