import 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
      io: Server
    }
  
    interface FastifyRequest {
      io: Server
    }
  }