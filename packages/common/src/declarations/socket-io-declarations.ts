import type {Server} from "socket.io"
import 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
      io: Server
    }
  
    interface FastifyRequest {
      io: Server
    }
  }