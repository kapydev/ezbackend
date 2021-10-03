import { getSchemaName } from "../typeorm-json-schema";
import Boom from '@hapi/boom'
import { DeepPartial, EntityMetadata, ObjectLiteral, Repository } from "typeorm";
import { RouteOptions } from "fastify";

/**
 * Returns the primary column name from given metadata
 * @param meta 
 * @returns 
 */
export function getPrimaryColName(meta: EntityMetadata) {
    const primaryColumns = meta.primaryColumns
    if (primaryColumns.length > 1) {
        throw "EzBackend currently only supports one Primary Column per entity. Raise an issue on github with your use case if you need more than one primary column in your entity"
    }
    return primaryColumns[0].propertyName
}

//TODO: Check if this function is efficient
//URGENT URGENT TODO: This function is probably removing zeros by detecting them as nulls, this needs to be fixed
const removeNestedNulls = (obj: any) => {
    Object.keys(obj).forEach(k =>
        (obj[k] && typeof obj[k] === 'object') && removeNestedNulls(obj[k]) ||
        (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
};

export interface GenerateOpts {
    schemaPrefix?: string
}

//TODO: Remove trailing slash from path names
//TODO: Make function to get generated Cols
//URGENT TODO: We need a query builder so that we can add stuff like tags and summary in the openapi functionality
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
export const getDefaultGenerators = () => {
    return {
        createOne: (repo: Repository<ObjectLiteral>, opts?: GenerateOpts) => {
            const generatedCols = repo.metadata.columns.filter(col => col.isGenerated).map(col => col.propertyName)
            const routeDetails: RouteOptions = {
                method: "POST",
                url: "/",
                schema: {
                    //TODO: Figure out how to import types from fastify swagger correctly for this and below
                    //@ts-ignore
                    summary: `Create ${repo.metadata.name}`,
                    tags: [repo.metadata.name],
                    description: `During creation, you are not allowed to specify the values of generated columns (e.g. ${generatedCols.toString()}).
        All non nullable columns must be specified on creation`,
                    body: { $ref: `${getSchemaName(repo.metadata, 'createSchema', opts?.schemaPrefix)}#` },
                    response: {
                        200: { $ref: `${getSchemaName(repo.metadata, 'fullSchema', opts?.schemaPrefix)}#` },
                        400: { $ref: `ErrorResponse#` }
                    },
                },
                handler: async (req, res) => {
                    try {
                        const data = req.body as DeepPartial<ObjectLiteral>
                        const newObj = await repo.save(data);
                        return removeNestedNulls(newObj);
                    } catch (e: any) {
                        //Assumption: If it fails, it is because of a bad request, not the code breaking
                        throw Boom.badRequest(e)
                    }
                },
            };
            return routeDetails;
        },
        getOne: (repo: Repository<ObjectLiteral>, opts?: GenerateOpts) => {
            const primaryCol = getPrimaryColName(repo.metadata)
            const routeDetails: RouteOptions = {
                method: "GET",
                url: `/:${primaryCol}`,
                schema: {
                    //@ts-ignore
                    summary: `Get ${repo.metadata.name} by ${primaryCol}`,
                    tags: [repo.metadata.name],
                    description: `If the ${primaryCol} does not contain the value specified in the url parameters, there will be a 'not found' error.`,
                    params: {
                        type: "object",
                        properties: {
                            [primaryCol]: { type: "number" },
                        },
                    },
                    response: {
                        200: { $ref: `${getSchemaName(repo.metadata, 'fullSchema', opts?.schemaPrefix)}#` },
                        404: { $ref: `ErrorResponse#` }
                    },
                },
                handler: async (req, res) => {
                    try {
                        //@ts-ignore
                        const id = req.params[primaryCol]
                        const newObj = await repo.findOneOrFail(id);
                        return removeNestedNulls(newObj);
                    } catch (e: any) {
                        throw Boom.notFound(e)
                    }
                },
            };
            return routeDetails;
        },
        getAll: (repo: Repository<ObjectLiteral>, opts?: GenerateOpts) => {
            const routeDetails: RouteOptions = {
                method: "GET",
                url: "/",
                schema: {
                    //@ts-ignore
                    summary: `Get all ${repo.metadata.name} instances`,
                    tags: [repo.metadata.name],
                    description: `If none exist, an empty array is returned`,
                    response: {
                        200: {
                            type: "array",
                            items: { $ref: `${getSchemaName(repo.metadata, 'fullSchema', opts?.schemaPrefix)}#` },
                        },
                    },
                },
                handler: async (req, res) => {
                    const newObj = await repo.find();
                    return removeNestedNulls(newObj);
                },
            };
            return routeDetails;
        },
        updateOne: (repo: Repository<ObjectLiteral>, opts?: GenerateOpts) => {
            const primaryCol = getPrimaryColName(repo.metadata)
            const generatedCols = repo.metadata.columns.filter(col => col.isGenerated).map(col => col.propertyName)
            const routeDetails: RouteOptions = {
                method: "PATCH",
                url: `/:${primaryCol}`,
                schema: {
                    //@ts-ignore
                    summary: `Update ${repo.metadata.name} by ${primaryCol}`,
                    tags: [repo.metadata.name],
                    description: `The ${repo.metadata.name} with the ${primaryCol} specified must exist, otherwise a 'not found' error is returned
        During creation, you are not allowed to specify the values of generated columns (e.g. ${generatedCols.toString()})`,
                    body: { $ref: `${getSchemaName(repo.metadata, "updateSchema", opts?.schemaPrefix)}#` },
                    response: {
                        200: { $ref: `${getSchemaName(repo.metadata, "fullSchema", opts?.schemaPrefix)}#` },
                        400: { $ref: `ErrorResponse#` },
                        404: { $ref: `ErrorResponse#` }
                    },
                    params: {
                        type: "object",
                        properties: {
                            [primaryCol]: { type: "number" },
                        },
                    },
                },
                handler: async (req, res) => {
                    //@ts-ignore
                    const id = req.params[primaryCol]
                    try {
                        await repo.findOneOrFail(id);
                    } catch (e: any) {
                        throw Boom.notFound(e)
                    }
                    //URGENT TODO: Right now typeorm sqlite does NOT throw an error, even if you save a string in an integer column!!!
                    //URGENT TODO: Currently this causes race conditions, need to do within one request

                    try {
                        const updatedObj = await repo.save({
                            //@ts-ignore
                            id: id,
                            //@ts-ignore
                            ...req.body,
                        });
                        return updatedObj;
                    } catch (e: any) {
                        throw Boom.badRequest(e)
                    }
                },
            };
            return routeDetails;
        },
        deleteOne: (repo: Repository<ObjectLiteral>, opts?: GenerateOpts) => {
            const primaryCol = getPrimaryColName(repo.metadata)
            const routeDetails: RouteOptions = {
                method: "DELETE",
                url: `/:${primaryCol}`,
                schema: {
                    //@ts-ignore
                    summary: `Delete ${repo.metadata.name} by ${primaryCol}`,
                    tags: [repo.metadata.name],
                    description: `The ${repo.metadata.name} with the ${primaryCol} specified must exist, otherwise a 'not found' error is returned`,
                    params: {
                        type: "object",
                        properties: {
                            [primaryCol]: { type: "number" },
                        },
                    },
                    response: {
                        200: {
                            type: "object",
                            properties: {
                                success: {
                                    type: "boolean",
                                },
                                id: {
                                    type: ["integer", "string"],
                                },
                            },
                            required: ["success", "id"],
                        },
                        400: { $ref: `ErrorResponse#` },
                        404: { $ref: `ErrorResponse#` }

                    },
                },
                handler: async (req, res) => {
                    //@ts-ignore
                    const id = req.params[primaryCol]
                    try {
                        await repo.findOneOrFail(id);
                    } catch (e) {
                        res.status(404).send(e);
                    }
                    try {
                        await repo.delete(id);
                        return {
                            success: true,
                            id: id,
                        }
                    } catch (e: any) {
                        throw Boom.badRequest(e)
                    }
                },
            };
            return routeDetails;
        }
    }
}