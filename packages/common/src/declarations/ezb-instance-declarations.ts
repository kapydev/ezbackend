import type { EzBackendInstance, EzBackendOpts } from '..';
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    ezbInstance: EzBackendInstance;
    ezbOpts: EzBackendOpts;
  }

  interface FastifyRequest {
    ezbInstance: EzBackendInstance;
    ezbOpts: EzBackendOpts;
  }
}
