import {EzBackend} from '@ezbackend/core'
import {SwaggerOptions} from 'fastify-swagger'
import {FastifyRegisterOptions} from 'fastify'
import type {OpenAPIV3} from 'openapi-types'

declare module '@ezbackend/core' {
    interface EzBackend{
        openapi: {
            config: FastifyRegisterOptions<SwaggerOptions>,
        }
    }
  }
  