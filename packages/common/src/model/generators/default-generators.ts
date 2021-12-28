import Boom from '@hapi/boom';
import { RouteOptions } from 'fastify';
import {
  DeepPartial,
  EntityMetadata,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { setUsedByEzb } from '../../rules';
import { generateSchemaName } from '../typeorm-helpers';
import type { RouterOptions } from './ez-router';
// File Storage, Streaming related
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import crypto from 'crypto'
import path from 'path'
// Temporary import for testing
import { diskEngine, File } from '../../storage'

const pump = util.promisify(pipeline)

function generateId() {
  return crypto.randomBytes(16).toString('hex')
}

/**
 * Returns the primary column name from given metadata
 * @param meta
 * @returns
 */
export function getPrimaryColName(meta: EntityMetadata) {
  const primaryColumns = meta.primaryColumns;
  return primaryColumns[0].propertyName;
}

// TODO: Check if this function is efficient
const removeNestedNulls = (obj: any) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] && typeof obj[k] === 'object') {
      removeNestedNulls(obj[k]);
    } else if (obj[k] === null) {
      delete obj[k];
    }
  });
  return obj;
};

// TODO: Remove trailing slash from path names
// TODO: Make function to get generated Cols
// TODO: We need a query builder so that we can add stuff like tags and summary in the openapi functionality
/**
 * Generates API Documentation for the current model
 * {@link createOne} - Generates API docs for a POST request for one entity
 * {@link getOne} - Generates API docs for a GET request for one entity
 * {@link getAll} - Generates API docs for a GET request for all entities the model
 * {@link udpateOne} - Generates API docs for a PATCH request to one entity
 * {@link deleteOne} - Generates API docs for a DELETE request for one entity
 *
 *
 * @returns
 */

export interface Generator {
  (repo: Repository<ObjectLiteral>, opts?: RouterOptions):
    | RouteOptions
    | Array<RouteOptions>;
}

export interface Generators {
  [index: string]: Generator;
}

export type GetDefaultGenerators = {
  (): Generators;
};

export const getDefaultGenerators: GetDefaultGenerators = () => {
  return {
    createOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions) => {
      const generatedCols = repo.metadata.columns
        .filter((col) => col.isGenerated)
        .map((col) => col.propertyName);
      const routeDetails: RouteOptions = {
        method: 'POST',
        url: '/',
        schema: {
          // TODO: Figure out how to import types from fastify swagger correctly for this and below
          // @ts-ignore
          summary: `Create ${repo.metadata.name}`,
          tags: [repo.metadata.name],
          description: `During creation, you are not allowed to specify the values of generated columns (e.g. ${generatedCols.toString()}).
        All non nullable columns must be specified on creation`,
          body: {
            $ref: `${generateSchemaName(
              repo.metadata.name,
              'createSchema',
              opts?.schemaPrefix,
            )}#`,
          },
          response: {
            200: {
              $ref: `${generateSchemaName(
                repo.metadata.name,
                'fullSchema',
                opts?.schemaPrefix,
              )}#`,
            },
            400: { $ref: `ErrorResponse#` },
          },
        },
        handler: async (req, res) => {
          setUsedByEzb();
          try {
            const data = req.body as DeepPartial<ObjectLiteral>;
            const newObj = await repo.save(data);
            req.io?.emit('entity_created', repo.metadata.name, newObj);
            return removeNestedNulls(newObj);
          } catch (e: any) {
            // Assumption: If it fails, it is because of a bad request, not the code breaking
            throw Boom.badRequest(e);
          }
        },
      };
      return routeDetails;
    },
    createOneMultipart: (repo: Repository<ObjectLiteral>, opts?: RouterOptions) => {
      const routeDetails: RouteOptions = {
        method: 'POST',
        url: '/multipart',
        handler: async (req, res) => {

          const parts = req.parts()
          for await (const part of parts) {

            if (part.file) {
              // @ts-ignore
              if (part.truncated) {
                throw Boom.badRequest(`The file ${part.filename} is too big`)
              }
              const storer = diskEngine({
                destination: path.join('tmp/uploads', part.fieldname),
                filename: (req, file, cb) => {
                  return cb(null, generateId() + '-' + part.filename)
                }
              })
              await new Promise((resolve) => {
                // Morph multipart 'part' to multer 'file'
                const file: File = {
                  fieldname: part.fieldname,
                  originalname: part.filename,
                  encoding: part.encoding,
                  mimetype: part.mimetype,
                  stream: part.file
                }
                storer._handleFile(req, file, resolve)
              })
            } else {
              // TODO: Fix types
              // @ts-ignore
              if (part.fieldnameTruncated) {
                throw Boom.badRequest(`The fieldname ${part.fieldname} is too long`)
              }
              // @ts-ignore
              if (part.valueTruncated) {
                // @ts-ignore
                throw Boom.badRequest(`The value ${part.value} is too long`)
              }
            }
          }
          return { success: true }
        }
      }

      return routeDetails
    },
    getOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions) => {
      const primaryCol = getPrimaryColName(repo.metadata);
      const routeDetails: RouteOptions = {
        method: 'GET',
        url: `/:${primaryCol}`,
        schema: {
          // @ts-ignore
          summary: `Get ${repo.metadata.name} by ${primaryCol}`,
          tags: [repo.metadata.name],
          description: `If the ${primaryCol} does not contain the value specified in the url parameters, there will be a 'not found' error.`,
          params: {
            type: 'object',
            properties: {
              [primaryCol]: { type: 'number' },
            },
          },
          response: {
            200: {
              $ref: `${generateSchemaName(
                repo.metadata.name,
                'fullSchema',
                opts?.schemaPrefix,
              )}#`,
            },
            404: { $ref: `ErrorResponse#` },
          },
        },
        handler: async (req, res) => {
          setUsedByEzb();
          try {
            // @ts-ignore
            const id = req.params[primaryCol];
            const newObj = await repo.findOneOrFail(id);
            return removeNestedNulls(newObj);
          } catch (e: any) {
            throw Boom.notFound(e);
          }
        },
      };
      return routeDetails;
    },
    getAll: (repo: Repository<ObjectLiteral>, opts?: RouterOptions) => {
      const routeDetails: RouteOptions = {
        method: 'GET',
        url: '/',
        schema: {
          // @ts-ignore
          summary: `Get all ${repo.metadata.name} instances`,
          tags: [repo.metadata.name],
          description: `If none exist, an empty array is returned`,
          response: {
            200: {
              type: 'array',
              items: {
                $ref: `${generateSchemaName(
                  repo.metadata.name,
                  'fullSchema',
                  opts?.schemaPrefix,
                )}#`,
              },
            },
          },
        },
        handler: async (req, res) => {
          setUsedByEzb();
          const newObj = await repo.find();
          return removeNestedNulls(newObj);
        },
      };
      return routeDetails;
    },
    updateOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions) => {
      const primaryCol = getPrimaryColName(repo.metadata);
      const generatedCols = repo.metadata.columns
        .filter((col) => col.isGenerated)
        .map((col) => col.propertyName);
      const routeDetails: RouteOptions = {
        method: 'PATCH',
        url: `/:${primaryCol}`,
        schema: {
          // @ts-ignore
          summary: `Update ${repo.metadata.name} by ${primaryCol}`,
          tags: [repo.metadata.name],
          description: `The ${repo.metadata.name
            } with the ${primaryCol} specified must exist, otherwise a 'not found' error is returned
        During creation, you are not allowed to specify the values of generated columns (e.g. ${generatedCols.toString()})`,
          body: {
            $ref: `${generateSchemaName(
              repo.metadata.name,
              'updateSchema',
              opts?.schemaPrefix,
            )}#`,
          },
          response: {
            200: {
              $ref: `${generateSchemaName(
                repo.metadata.name,
                'fullSchema',
                opts?.schemaPrefix,
              )}#`,
            },
            400: { $ref: `ErrorResponse#` },
            404: { $ref: `ErrorResponse#` },
          },
          params: {
            type: 'object',
            properties: {
              [primaryCol]: { type: 'number' },
            },
          },
        },
        handler: async (req, res) => {
          setUsedByEzb();
          // @ts-ignore
          const id = req.params[primaryCol];
          try {
            const oldObj = await repo.findOneOrFail(id);
            const updatedObj = await repo.save({
              id: id,
              ...oldObj,
              // @ts-ignore
              ...req.body,
            });
            req.io?.emit('entity_updated', repo.metadata.name, updatedObj);
            return updatedObj;
          } catch (e: any) {
            throw Boom.notFound(e);
          }
          // URGENT TODO: Currently this causes race conditions, need to do within one request
        },
      };
      return routeDetails;
    },
    deleteOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions) => {
      const primaryCol = getPrimaryColName(repo.metadata);
      const routeDetails: RouteOptions = {
        method: 'DELETE',
        url: `/:${primaryCol}`,
        schema: {
          // @ts-ignore
          summary: `Delete ${repo.metadata.name} by ${primaryCol}`,
          tags: [repo.metadata.name],
          description: `The ${repo.metadata.name} with the ${primaryCol} specified must exist, otherwise a 'not found' error is returned`,
          params: {
            type: 'object',
            properties: {
              [primaryCol]: { type: 'number' },
            },
          },
          response: {
            200: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                },
                id: { type: ['integer', 'string'] },
              },
              required: ['success', 'id'],
            },
            400: { $ref: `ErrorResponse#` },
            404: { $ref: `ErrorResponse#` },
          },
        },
        handler: async (req, res) => {
          setUsedByEzb();
          // @ts-ignore
          const id = req.params[primaryCol];
          try {
            const result = await repo.findOneOrFail(id);
            req.io?.emit('entity_deleted', repo.metadata.name, result);
            await repo.remove(result);
          } catch (e) {
            res.status(404).send(e);
          }
          return {
            success: true,
            id: id,
          };
        },
      };
      return routeDetails;
    },
  };
};
