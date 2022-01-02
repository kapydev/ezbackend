import Boom from '@hapi/boom';
import crypto from 'crypto';
import { FastifyRequest, FastifySchema, RouteOptions } from 'fastify';
import {
  DeepPartial,
  EntityMetadata,
  ObjectLiteral,
  Repository
} from 'typeorm';
import { setUsedByEzb } from '../../rules';
// Temporary import for testing
import { diskEngine, File, StorageEngine } from '../../storage';
import { generateSchemaName } from '../typeorm-helpers';
import type { RouterOptions } from './ez-router';
import type { MultipartFile } from 'fastify-multipart';
import 'fastify-multipart'
import { EzRepo } from '..';
// URGENT TODO: Can we use the in built fastify AJV instead for consistency?
import Ajv from 'ajv'



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


function getDefaultEngine() {
  return diskEngine({
    // URGENT TODO: make destination dependent on environement variable for tmp file destination
    destination: 'tmp/uploads',
    filename: (req, file, cb) => {
      return cb(null, crypto.randomBytes(16).toString('hex') + '-' + file.originalname)
    }
  })
}

function getStorageEngine(routerOpts: RouterOptions, req: FastifyRequest) {

  const storageEngine = routerOpts?.storage?.engine ??
    req.ezbOpts.backend?.storage?.engine ??
    getDefaultEngine()
  return storageEngine
}

export const getDefaultGenerators: GetDefaultGenerators = () => {
  return {
    createOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions) => {
      // URGENT TODO: What if there are multipart fields? Should the file value always be nullable? Should the file value be validated before entry? What if there are malicious entries?
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
            const result = removeNestedNulls(newObj)
            return result;
          } catch (e: any) {
            // Assumption: If it fails, it is because of a bad request, not the code breaking
            throw Boom.badRequest(e);
          }
        },
      };
      return routeDetails;
    },
    createOneMultipart: (repo: Repository<ObjectLiteral>, opts: RouterOptions = {}) => {
      // Type coercion is required because multipart/form-data has no associated types
      const ajv = new Ajv({ coerceTypes: true })
      const validationSchema = EzRepo.getEzRepo(repo.metadata.name).getFormCreateSchema()
      const validateData = ajv.compile(validationSchema)
      const generatedCols = repo.metadata.columns
        .filter((col) => col.isGenerated)
        .map((col) => col.propertyName);
      const routeDetails: RouteOptions = {
        method: 'POST',
        url: '/multipart',
        schema: {
          // @ts-ignore
          summary: `Create ${repo.metadata.name} using the format multipart/form-data`,
          tags: [repo.metadata.name],
          description: `During creation, you are not allowed to specify the values of generated columns (e.g. ${generatedCols.toString()}).
        All non nullable columns must be specified on creation.
        All fields inserted will be coerced to their respective types using ajv. For example, if you have a boolean field and supply the value 'false', it will be coerced to the boolean value false.
        `,
          consumes: ['multipart/form-data'],
          // URGENT TODO: Consider edge case if repo name is possibly not ezrepo name
          body: validationSchema,
          response: {
            200: {
              $ref: `${generateSchemaName(
                repo.metadata.name,
                'fullSchema',
                opts?.schemaPrefix,
              )}#`,
            },
            400: { $ref: `ErrorResponse#` },
          }
        } as FastifySchema
        ,
        preValidation: async (req, res) => {
          // Validation Hack is required because body is empty in fastify when schema consumes multipart/form-data
          req.body = {}
        },
        validatorCompiler: function () {
          // Always return the data as 'validated'. Actual validation takes place in the handler after the multipart data is parsed
          return () => true
        },
        handler: async (req, res) => {

          const parts = req.parts(opts.storage?.multipartOpts)

          const storageEngine = getStorageEngine(opts, req)

          async function removeFile(file: File) {
            const result = await new Promise((resolve) => {
              storageEngine._removeFile(req, file, (...result) => resolve(result))
            })
            return result
          }

          async function handleFile(part: MultipartFile) {
            // @ts-ignore
            if (part.truncated) {
              throw Boom.badRequest(`The file ${part.filename} is too big`)
            }
            // URGENT TODO: Switch this to resolve reject style, resolving the error is very strange
            try {
              const value = await new Promise<Partial<File>>((resolve, reject) => {
                // Morph multipart 'part' to multer 'file'
                const file: File = {
                  fieldname: part.fieldname,
                  originalname: part.filename,
                  encoding: part.encoding,
                  mimetype: part.mimetype,
                  stream: part.file
                }
                storageEngine._handleFile(req, file, (err, info) => {
                  if (err) return reject(err)
                  resolve({
                    ...info,
                    mimetype: part.mimetype,
                    originalname: part.filename,
                    fieldname: part.fieldname,
                    encoding: part.encoding
                  })
                })
              })
              return {
                name: part.fieldname,
                value: value
              }
            } catch (e) {
              throw Boom.badRequest(String(e))
            }

          }

          async function handleField(part: MultipartFile) {
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
            // @ts-ignore
            if (!part.value) {
              throw Boom.badRequest(`Value for field is nullish!`)
            }
            return {
              name: part.fieldname,
              // @ts-ignore
              value: part.value
            }

          }

          const fullData: {
            [key: string]: unknown
          } = {}

          const files = []

          for await (const part of parts) {

            if (part.file) {
              const fileData = await handleFile(part)
              // URGENT TODO: Handle edge case of same key being sent twice
              fullData[fileData.name] = fileData.value
              files.push(fileData.value)
            } else {
              const fieldData = await handleField(part)
              fullData[fieldData.name] = fieldData.value
            }
          }

          try {
            const validationResult = validateData(fullData)
            if (validationResult === false) {
              throw ajv.errorsText(validateData.errors)
            }
            const newObj = await repo.save(fullData);
            req.io?.emit('entity_created', repo.metadata.name, newObj);
            return removeNestedNulls(newObj);
          } catch (e: any) {
            // Assumption: If it fails, it is because of a bad request, not the code breaking
            for await (const file of files) {
              await removeFile(file as File)
            }
            throw Boom.badRequest(e);
          }

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
    getOneFileData: (repo: Repository<ObjectLiteral>, opts: RouterOptions = {}) => {
      const primaryCol = getPrimaryColName(repo.metadata);
      const routeDetails: RouteOptions = {
        method: 'GET',
        url: `/:${primaryCol}/file/:fieldName`,
        schema: {
          // @ts-ignore
          summary: `Download files for ${repo.metadata.name} by ${primaryCol} and property name`,
          // URGENT TODO: Add in description why the swagger documentation doesn't work
          tags: [repo.metadata.name],
          description: `If the ${primaryCol} does not contain the value specified in the url parameters, there will be a 'not found' error.`,
          params: {
            type: 'object',
            properties: {
              [primaryCol]: { type: 'number' },
              // URGENT TODO: Make this an enum of possible file fieldnames instead 
              fieldName: { type: 'string' }
            },
          },
          response: {
            200: {
              type: 'string',
              format: 'binary',
            },
            400: { $ref: `ErrorResponse#` },

          },
        },
        handler: async (req, res) => {
          const storageEngine = getStorageEngine(opts, req)
          setUsedByEzb();
          try {
            const id = (req.params as any)[primaryCol];
            const fieldName = (req.params as any).fieldName

            // URGENT TODO: Validate that fieldname is valid
            const newObj = await repo.findOneOrFail(id);
            const file = newObj[fieldName] as File
            const readableStream = await new Promise((resolve, reject) => {
              storageEngine._readFile(req, file, (err, result) => {
                if (err) return reject(err)
                resolve(result)
              })
            })
            res.type(file.mimetype)
            return res.send(readableStream);
          } catch (e: any) {
            throw Boom.badRequest(e);
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
      const routeDetails: RouteOptions = {
        method: 'PATCH',
        url: `/:${primaryCol}`,
        schema: {
          // @ts-ignore
          summary: `Update ${repo.metadata.name} by ${primaryCol}`,
          tags: [repo.metadata.name],
          description: `The ${repo.metadata.name} with the ${primaryCol} specified must exist, otherwise a 'not found' error is returned`,
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
            // URGENT TODO: Figure out why there is no remove nested nulls here
            return updatedObj;
          } catch (e: any) {
            throw Boom.notFound(e);
          }
          // URGENT TODO: Currently this causes race conditions, need to do within one request
        },
      };
      return routeDetails;
    },
    updateOneMultipart: (repo: Repository<ObjectLiteral>, opts: RouterOptions = {}) => {
      // Type coercion is required because multipart/form-data has no associated types
      const ajv = new Ajv({ coerceTypes: true })
      const validationSchema = EzRepo.getEzRepo(repo.metadata.name).getFormUpdateSchema()
      const validateData = ajv.compile(validationSchema)
      const primaryCol = getPrimaryColName(repo.metadata);
      const routeDetails: RouteOptions = {
        method: 'PATCH',
        url: `/:${primaryCol}/multipart`,
        schema: {
          // @ts-ignore
          summary: `Update ${repo.metadata.name} using the format multipart/form-data`,
          tags: [repo.metadata.name],
          description: `The ${repo.metadata.name} with the ${primaryCol} specified must exist, otherwise a 'not found' error is returned
        All fields inserted will be coerced to their respective types using ajv. For example, if you have a boolean field and supply the value 'false', it will be coerced to the boolean value false.
        `,
          consumes: ['multipart/form-data'],
          // URGENT TODO: Consider edge case if repo name is possibly not ezrepo name
          body: validationSchema,
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
            400: { $ref: `ErrorResponse#` },
          }
        } as FastifySchema
        ,
        preValidation: async (req, res) => {
          // Validation Hack is required because body is empty in fastify when schema consumes multipart/form-data
          req.body = {}
        },
        validatorCompiler: function () {
          // Always return the data as 'validated'. Actual validation takes place in the handler after the multipart data is parsed
          return () => true
        },
        handler: async (req, res) => {

          const parts = req.parts(opts.storage?.multipartOpts)

          const storageEngine = getStorageEngine(opts, req)

          // URGENT TODO: Refactor away reused code
          // URGENT TODO: Split default-generators.ts into multiple smaller files
          async function removeFile(file: File) {
            const result = await new Promise((resolve) => {
              storageEngine._removeFile(req, file, (...result) => resolve(result))
            })
            return result
          }

          async function handleFile(part: MultipartFile) {
            // @ts-ignore
            if (part.truncated) {
              throw Boom.badRequest(`The file ${part.filename} is too big`)
            }
            // URGENT TODO: Switch this to resolve reject style, resolving the error is very strange
            try {
              const value = await new Promise<Partial<File>>((resolve, reject) => {
                // Morph multipart 'part' to multer 'file'
                const file: File = {
                  fieldname: part.fieldname,
                  originalname: part.filename,
                  encoding: part.encoding,
                  mimetype: part.mimetype,
                  stream: part.file
                }
                storageEngine._handleFile(req, file, (err, info) => {
                  if (err) return reject(err)
                  resolve({
                    ...info,
                    mimetype: part.mimetype,
                    originalname: part.filename,
                    fieldname: part.fieldname,
                    encoding: part.encoding
                  })
                })
              })
              return {
                name: part.fieldname,
                value: value
              }
            } catch (e) {
              throw Boom.badRequest(String(e))
            }

          }

          async function handleField(part: MultipartFile) {
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
            // @ts-ignore
            if (!part.value) {
              // @ts-ignore
              part.value = undefined
            }
            return {
              name: part.fieldname,
              // @ts-ignore
              value: part.value
            }

          }

          const fullData: {
            [key: string]: unknown
          } = {}

          const fileKeys = []
          const files = []

          for await (const part of parts) {

            if (part.file) {
              const fileData = await handleFile(part)
              // URGENT TODO: Handle edge case of same key being sent twice
              fullData[fileData.name] = fileData.value
              fileKeys.push(fileData.name)
              files.push(fileData.value)
            } else {
              const fieldData = await handleField(part)
              if (fieldData.value) {
                fullData[fieldData.name] = fieldData.value
              }
            }
          }

          setUsedByEzb();
          // @ts-ignore
          const id = req.params[primaryCol];

          try {
            const validationResult = validateData(fullData)
            if (validationResult === false) {
              throw ajv.errorsText(validateData.errors)
            }
            const oldObj = await repo.findOneOrFail(id);
            const updatedObj = await repo.save({
              id: id,
              ...oldObj,
              ...fullData,
            });
            // Remove the old saved file(s)
            for await (const fileKey of fileKeys) {
              try {
                await removeFile(oldObj[fileKey] as File)
              } catch (e) {

              }
            }

            req.io?.emit('entity_updated', repo.metadata.name, updatedObj);
            return updatedObj;
          } catch (e: any) {
            // Assumption: If it fails, it is because of a bad request, not the code breaking
            for await (const file of files) {
              // URGENT TODO: Add this edge case handling for create side as well, because file may stop uploading halfway
              try {
                await removeFile(file as File)
              } catch (e) {

              }
            }
            throw Boom.badRequest(e);
          }

        }
      }

      return routeDetails
    },
    deleteOne: (repo: Repository<ObjectLiteral>, opts: RouterOptions = {}) => {
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

          const storageEngine = getStorageEngine(opts, req)

          // URGENT TODO: Refactor away reused code
          // URGENT TODO: Split default-generators.ts into multiple smaller files
          async function removeFile(file: File) {
            const result = await new Promise((resolve) => {
              storageEngine._removeFile(req, file, (...result) => resolve(result))
            })
            return result
          }

          setUsedByEzb();
          // @ts-ignore
          const id = req.params[primaryCol];
          try {
            // URGENT TODO: Consider edge cases for nested data
            // URGENT TODO: Consider if file deletion fail and entity deletion succeed or vice versa
            const result = await repo.findOneOrFail(id);
            for await (const key of Object.keys(result)) {
              // URGENT TODO: Consider edge case when use has his own property 'filename'
              if (typeof result[key] !== 'object') continue
              if (!Object.keys(result[key]).includes('filename')) continue
              await removeFile(result[key])
            }
            await repo.remove(result);
            req.io?.emit('entity_deleted', repo.metadata.name, result);
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
