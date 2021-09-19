import { getSchemaName } from "../typeorm-json-schema";
import Boom from '@hapi/boom'
import { EntityMetadata, Repository } from "typeorm";
import { RouteOptions } from "fastify";

export function getPrimaryColName(meta: EntityMetadata) {
    const primaryColumns = meta.primaryColumns
    if (primaryColumns.length > 1) {
        throw "EzBackend currently only supports one Primary Column per entity. Raise an issue on github with your use case if you need more than one primary column in your entity"
    }
    return primaryColumns[0].propertyName
}

//TODO: Check if this function is efficient
const removeNestedNulls = (obj) => {
    Object.keys(obj).forEach(k =>
        (obj[k] && typeof obj[k] === 'object') && removeNestedNulls(obj[k]) ||
        (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
};

//URGENT TODO: Neaten this up, we can't have opts everywhere
export interface GenerateOpts {
    schemaPrefix?: string
}

//TODO: Remove trailing slash from path names
//URGENT TODO: We need a query builder so that we can add stuff like tags and summary in the openapi functionality
export const getDefaultGenerators = () => {
    return {
        createOne: (repo: Repository<unknown>, opts?: GenerateOpts) => {
            const routeDetails: RouteOptions = {
                method: "POST",
                url: "/",
                schema: {
                    body: { $ref: `${getSchemaName(repo.metadata, 'createSchema', opts?.schemaPrefix)}#` },
                    response: {
                        200: { $ref: `${getSchemaName(repo.metadata, 'fullSchema', opts?.schemaPrefix)}#` },
                        400: { $ref: `ErrorResponse#` }
                    },
                },
                handler: async (req, res) => {
                    try {
                        const newObj = await repo.save(req.body);
                        return removeNestedNulls(newObj);
                    } catch (e) {
                        //Assumption: If it fails, it is because of a bad request, not the code breaking
                        throw Boom.badRequest(e)
                    }
                },
            };
            return routeDetails;
        },
        getOne: (repo: Repository<unknown>, opts?: GenerateOpts) => {
            const primaryCol = getPrimaryColName(repo.metadata)
            const routeDetails: RouteOptions = {
                method: "GET",
                url: `/:${primaryCol}`,
                schema: {
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
                        const newObj = await repo.findOneOrFail(req.params[primaryCol]);
                        return removeNestedNulls(newObj);
                    } catch (e) {
                        throw Boom.notFound(e)
                    }
                },
            };
            return routeDetails;
        },
        getAll: (repo: Repository<unknown>, opts?: GenerateOpts) => {
            const routeDetails: RouteOptions = {
                method: "GET",
                url: "/",
                schema: {
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
        updateOne: (repo: Repository<unknown>, opts?: GenerateOpts) => {
            const primaryCol = getPrimaryColName(repo.metadata)
            const routeDetails: RouteOptions = {
                method: "PATCH",
                url: `/:${primaryCol}`,
                schema: {
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
                    try {
                        await repo.findOneOrFail(req.params[primaryCol]);
                    } catch (e) {
                        throw Boom.notFound(e)
                    }
                    //URGENT TODO: Right now typeorm sqlite does NOT throw an error, even if you save a string in an integer column!!!

                    try {
                        const updatedObj = await repo.save({
                            id: req.params[primaryCol],
                            //@ts-ignore
                            ...req.body,
                        });
                        return updatedObj;
                    } catch (e) {
                        throw Boom.badRequest(e)
                    }
                },
            };
            return routeDetails;
        },
        deleteOne: (repo: Repository<unknown>, opts?: GenerateOpts) => {
            const primaryCol = getPrimaryColName(repo.metadata)
            const routeDetails: RouteOptions = {
                method: "DELETE",
                url: `/:${primaryCol}`,
                schema: {
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
                    try {
                        await repo.findOneOrFail(req.params[primaryCol]);
                    } catch (e) {
                        res.status(404).send(e);
                    }
                    try {
                        await repo.delete(req.params[primaryCol]);
                        return {
                            success: true,
                            id: req.params[primaryCol],
                        }
                    } catch (e) {
                        throw Boom.badRequest(e)
                    }
                },
            };
            return routeDetails;
        }
    }
}