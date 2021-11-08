import { EntityMetadata, ObjectLiteral, Repository } from "typeorm";
import { RouteOptions } from "fastify";
import type { RouterOptions } from './api-generator';
/**
 * Returns the primary column name from given metadata
 * @param meta
 * @returns
 */
export declare function getPrimaryColName(meta: EntityMetadata): string;
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
export declare const getDefaultGenerators: () => {
    createOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions | undefined) => RouteOptions<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown, import("fastify").FastifySchema>;
    getOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions | undefined) => RouteOptions<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown, import("fastify").FastifySchema>;
    getAll: (repo: Repository<ObjectLiteral>, opts?: RouterOptions | undefined) => RouteOptions<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown, import("fastify").FastifySchema>;
    updateOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions | undefined) => RouteOptions<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown, import("fastify").FastifySchema>;
    deleteOne: (repo: Repository<ObjectLiteral>, opts?: RouterOptions | undefined) => RouteOptions<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown, import("fastify").FastifySchema>;
};
