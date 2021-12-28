import { PluginScope } from '@ezbackend/core';
import { EzError, ezWarning } from '@ezbackend/utils';
import { Ajv, Options as AjvOptions } from 'ajv';
import dedent from 'dedent-js';
import dotenv from 'dotenv';
import fastify, { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fastifyMultipart from 'fastify-multipart';
import fp from 'fastify-plugin';
import {
  fastifyRequestContextPlugin,
  requestContext
} from 'fastify-request-context';
import { InjectOptions } from 'light-my-request';
import { Server, ServerOptions } from 'socket.io';
import {
  Connection,
  createConnection,
  EntitySchema,
  ObjectLiteral,
  Repository
} from 'typeorm';
import { EzRepo, REALTIME } from '.';
import { EzApp, EzBackendServer } from './ezapp';
import { attachSocketIO, createSocketIO } from './realtime';
import { outgoingPacketMiddleware } from './realtime/socket-io-outgoing-packet-middleware';

export interface EzBackendInstance {
  entities: Array<EntitySchema>;
  server: EzBackendServer;
  _server: FastifyInstance;
  repo: Repository<ObjectLiteral>;
  ezRepo: EzRepo;
  orm: Connection;
  // TODO: Find correct type for subscriber
  subscribers: Array<Function>;
  socketIO: Server;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface EzBackendOpts {
  /**
   * @deprecated Instead of {address: 0.0.0.0}
   * use
   * {ezbackend: {listen: {address: 0.0.0.0}}}
   */
  address: string;
  /**
   * @deprecated Instead of {port: 8000}
   * use
   * {ezbackend: {listen: {port: 8000}}}
   */
  port: string | number;
  /**
   * @deprecated Instead of {orm: ormOpts}
   * use
   * {ezbackend: {typeorm: ormOpts}}
   */
  orm: Parameters<typeof createConnection>[0];
  /**
   * @deprecated Instead of {server: serverOpts}
   * use
   * {ezbackend: {fastify: serverOpts}}
   */
  server: Parameters<typeof fastify>[0];
  backend: {
    listen: {
      address: string | number;
      port: number | string;
      backlog?: number;
    };
    fastify: Parameters<typeof fastify>[0];
    typeorm: Parameters<typeof createConnection>[0];
    ['socket.io']: Partial<ServerOptions>;
  };
}

// TODO: Check if emojis will break instance names
// URGENT TODO: Strict types for instance, opts
async function addErrorSchema(
  instance: EzBackendInstance,
  opts: EzBackendOpts,
) {
  instance.server.addSchema({
    $id: 'ErrorResponse',
    type: 'object',
    properties: {
      statusCode: { type: 'number' },
      error: { type: 'string' },
      message: { type: 'string' },
    },
  });
}

// URGENT TODO: Make running this optional in the default config
dotenv.config();

function ajvAllowFileType(ajv: Ajv, opts: AjvOptions) {
  ajv.addKeyword('isFileType', {
    compile: (schema, parent, it) => {
      return () => true
    }
  })
  return ajv
}


const defaultConfig: EzBackendOpts['backend'] = {
  listen: {
    port: process.env.PORT || 8000,
    address: process.env.ADDRESS || '127.0.0.1',
  },
  fastify: {
    logger: {
      prettyPrint: {
        translateTime: 'SYS:HH:MM:ss',
        ignore: 'pid,hostname,reqId,responseTime,req,res',
        // @ts-ignore
        messageFormat: (log, messageKey, levelLabel) => {
          const method = log.req?.method;
          const url = log.req?.url;
          const status = log.res?.statusCode;
          const resTime = log.responseTime?.toFixed(2);
          const msg = log[messageKey];
          if (method && url) {
            return `${`[${method} ${url}`.padEnd(25, '.')}] ${msg}`;
          }
          if (status && resTime) {
            return `${`[${status} ${resTime}ms`.padEnd(25, '.')}] ${msg}`;
          }
          return msg;
        },
      },
    },
    ajv: {
      plugins: [ajvAllowFileType]
    }
  },
  typeorm: {
    type: 'better-sqlite3',
    database: 'tmp/db.sqlite',
    synchronize: true,
  },
  'socket.io': {
    cors: {
      origin: true,
      credentials: true,
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    },
  },
};

// Derived from https://github.com/jeromemacias/fastify-boom/blob/master/index.js
// Kudos to him
const ezbErrorPage: FastifyPluginCallback<{}> = (fastify, options, next) => {
  // TODO: Strict types for error
  fastify.setErrorHandler(function errorHandler(error: any, request, reply) {
    request.log.error(error);
    if (error && error.query) {
      // Assumption: It is a typeorm error if it falls here
      request.log.error(`query: ${error.query}`);
      request.log.error(`parameters: ${error.parameters}`);
      request.log.error(`driverError: ${error.driverError}`);
    }
    if (error && error.isBoom) {
      reply
        .code(error.output.statusCode)
        .type('application/json')
        .headers(error.output.headers)
        .send(error.output.payload);

      return;
    }

    reply.send(error || new Error(`Got non-error: ${error}`));
  });

  next();
};

/**
 * Child of EzApp. This is where you set up your backend setup tasks.
 */
export class EzBackend extends EzApp {
  constructor() {
    super();

    this.setDefaultOpts(defaultConfig);

    this.setInit('Create Entities Container', async (instance, opts) => {
      instance.entities = [];
    });

    this.setInit('Manage Event Subscriptions', async (instance, opts) => {
      instance.subscribers = [];
    });

    this.setPostInit('Create Database Connection', async (instance, opts) => {
      const ormOpts = opts.orm ?? this.getOpts('backend', opts)?.typeorm;

      if (ormOpts.entities) {
        ezWarning(
          'Defining your own entities outside of the EzBackend orm wrapper may result in unexpected interactions. The EzBackend orm wrapper provides the full capability of typeorm so that should be used instead.',
        );
      }

      const optionEntities = ormOpts?.entities ? ormOpts.entities : [];
      const optionSubscribers = ormOpts?.subscribers ? ormOpts.subscribers : [];

      instance.orm = await createConnection({
        ...ormOpts,
        entities: [...optionEntities, ...instance.entities],
        subscribers: [...optionSubscribers, ...instance.subscribers],
      });
    });

    this.setPreHandler('Add SocketIO', createSocketIO);

    this.setHandler('Add Custom Fastify Boom', async (instance, opts) => {
      instance.server.register(fp(ezbErrorPage));
    });

    this.setHandler('Add Fastify Multipart', async(instance,opts) => {
      instance.server.register(fastifyMultipart)
    })

    this.setHandler('Add Error Schema', addErrorSchema);

    this.setPostHandler('Create Fastify Server', async (instance, opts) => {
      const fastifyOpts = opts.server ?? this.getOpts('backend', opts)?.fastify;

      instance._server = fastify(fastifyOpts);
    });

    this.setPostHandler('Attach Socket IO', attachSocketIO);

    this.setPostHandler('Register Fastify Plugins', async (instance, opts) => {
      this.registerFastifyPlugins(instance._server, this);
    });

    this.setPostHandler(
      'Add Request Context Plugin',
      async (instance, opts) => {
        instance._server.register(fastifyRequestContextPlugin);
      },
    );

    this.setPostHandler(
      'Set Request Context For Global Access',
      async (instance, opts) => {
        instance._server.addHook('onRequest', async (req, res) => {
          requestContext.set(REALTIME.REQ_CONTEXT, req);
        });
      },
    );

    this.setPostHandler(
      'Add middleware to authenticate outgoing packets',
      outgoingPacketMiddleware,
    );

    this.setRun('Run Fastify Server', async (instance, opts) => {
      const listenOpts = this.getOpts('backend', opts);
      const port = opts.port ?? listenOpts?.listen.port;
      const address = opts.address ?? listenOpts?.listen.address;
      const backlog = listenOpts?.listen.backlog;

      await instance._server.listen(port, address, backlog);
    });

    this.scope = PluginScope.PARENT;
  }

  getInternalInstance() {
    // TODO: Figure if there is a better way of getting this data
    // @ts-ignore
    const lastPlugin = this.instance._lastUsed;
    if (lastPlugin === null) {
      throw new Error(
        'Server is still undefined, have you called app.start() yet?',
      );
    }
    return lastPlugin.server as EzBackendInstance;
  }

  getInternalServer() {
    return this.getInternalInstance()?._server;
  }

  async inject(injectOpts: string | InjectOptions) {
    const server = this.getInternalServer();
    return server.inject(injectOpts);
  }

  verifyStarted(funcName?: string) {
    if (!this.instance.started) {
      const additionalMsg = funcName ? `before running ${funcName}` : '';

      throw new EzError(
        'Instance not yet started',
        `The EzBackend instance must be started ${additionalMsg}`,
        dedent`
                await app.start()

                You must wait for the above function to finish before you can run ${funcName}
                `,
      );
    }
  }

  printRoutes() {
    this.verifyStarted('printRoutes');
    return this.getInternalServer().printRoutes();
  }

  printPlugins() {
    this.verifyStarted('printPlugins');
    return this.getInternalServer().printPlugins();
  }

  prettyPrint() {
    this.verifyStarted('prettyPrint');
    return this.instance.prettyPrint();
  }

  // URGENT TODO: Remove temporary any fix
  async start(opts?: RecursivePartial<EzBackendOpts>) {
    await super.start(opts);
  }

  async closeInternals() {
    EzRepo.unregisterEzRepos()
  }

  async close() {
    const instance = this.getInternalInstance();
    const internalServer = this.getInternalServer();
    instance?.orm && await instance.orm.close();
    internalServer && await internalServer.close();
    await this.closeInternals()
  }
}
