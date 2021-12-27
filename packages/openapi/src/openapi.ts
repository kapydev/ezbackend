import { SwaggerOptions, fastifySwagger } from 'fastify-swagger';

import { EzApp, EzBackendOpts } from '@ezbackend/common';
import type { FastifyRegisterOptions } from 'fastify';
import { PluginScope } from '@ezbackend/core';
import { merge } from 'lodash'
declare module '@ezbackend/common' {
  interface EzBackendOpts {
    openAPI: FastifyRegisterOptions<SwaggerOptions> | undefined;
  }
}

const defaultConfig: EzBackendOpts['openAPI'] = {
  prefix: '/docs',
  routePrefix: '/docs',
  exposeRoute: true,
  // TODO: Figure out why its logging so much
  logLevel: 'warn',
  openapi: {
    info: {
      title: 'EzBackend API',
      description: 'Automatically generated documentation for EzBackend',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://github.com/kapydev/ezbackend',
      description: 'Find more info here',
    },
  },
  transform: (schema: any) => {
    // Recursively search for custom properties and add them in
    const result = recursiveCustomPropertyReplacement(schema)
    return result
  }
};

function recursiveCustomPropertyReplacement(schema: any): any {
  if (typeof schema === 'object') {

    if (schema.customSwaggerProps !== undefined) {
      // Update with the custom swagger props, if any
      schema = merge(schema, schema.customSwaggerProps)
      delete schema.customSwaggerProps
    }
    // Recursively replace properties on children if required
    const fullyReplaced = Object.fromEntries(
      Object.entries(schema).map(([key, value]) => {
        // A reliable way of ensuring it is an object (May not be performant but only used in openapi)
        if (Object.prototype.toString.call(value) === '[object Object]') {
          return [key, recursiveCustomPropertyReplacement(value)]
        }

        return [key, value]
      })
    )
    return fullyReplaced
  } else {
    // No further children, return 
    return schema
  }
}

export class EzOpenAPI extends EzApp {
  constructor() {
    super();

    this.setDefaultOpts(defaultConfig);

    this.setHandler('Add Swagger Plugin', async (instance, fullOpts) => {
      const opts = this.getOpts('openAPI', fullOpts);

      instance.server.register(fastifySwagger, opts);
    });

    this.scope = PluginScope.PARENT;
  }
}
