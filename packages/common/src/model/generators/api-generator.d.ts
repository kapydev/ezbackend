import { ObjectLiteral, Repository } from "typeorm";
import { RouteOptions } from "fastify";
import { EzApp } from "../../ezapp";
import { EzBackendOpts } from "../..";
import type { EzBackendInstance } from '../../ezbackend';
export interface RouterOptions {
    schemaPrefix?: string;
    prefix?: string;
    generators?: {
        [name: string]: IGenerator;
    };
}
declare type IGenerator = (repo: Repository<ObjectLiteral>, opts?: RouterOptions) => RouteOptions | Array<RouteOptions>;
export declare type Middleware = (oldRoute: RouteOptions) => RouteOptions;
/**
 * Factory function for generating routes.
 * @param genOpts
 * @param generator
 * @param middlewares
 * @returns
 */
export declare function generateRouteFactory(genOpts: RouterOptions, generator: IGenerator, middlewares?: Array<Middleware>): (instance: EzBackendInstance, opts: EzBackendOpts) => Promise<void>;
export declare function middlewareFactory(optName: string, newValue: any): Middleware;
/**
 * Child of EzApp. Handles route generation for
 */
export declare class EzRouter extends EzApp {
    _generators: {
        [key: string]: IGenerator;
    };
    _genOpts: RouterOptions;
    constructor(opts?: RouterOptions);
    addRouteFromGenerator(generatorName: string, generator: IGenerator, middlewares?: Array<Middleware>, override?: boolean): void;
    _forFactory<KeyType>(overrideName: string, routeNames: Array<string>): (newVal: KeyType) => void;
    for(...routeNames: Array<string>): {
        method: (newVal: import("fastify").HTTPMethods | import("fastify").HTTPMethods[]) => void;
        url: (newVal: string) => void;
        schema: (newVal: import("fastify").FastifySchema | undefined) => void;
        exposeHeadRoute: (newVal: boolean | undefined) => void;
        attachValidation: (newVal: boolean | undefined) => void;
        onRequest: (newVal: import("fastify").onRequestHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown> | import("fastify").onRequestHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>[] | undefined) => void;
        preParsing: (newVal: import("fastify").preParsingHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown> | import("fastify").preParsingHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>[] | undefined) => void;
        preValidation: (newVal: import("fastify").preValidationHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown> | import("fastify").preValidationHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>[] | undefined) => void;
        preHandler: (newVal: import("fastify").preHandlerHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown> | import("fastify").preHandlerHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>[] | undefined) => void;
        preSerialization: (newVal: import("fastify").preSerializationHookHandler<unknown, import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown> | import("fastify").preSerializationHookHandler<unknown, import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>[] | undefined) => void;
        onSend: (newVal: import("fastify").onSendHookHandler<unknown, import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown> | import("fastify").onSendHookHandler<unknown, import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>[] | undefined) => void;
        onResponse: (newVal: import("fastify").onResponseHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown> | import("fastify").onResponseHookHandler<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>[] | undefined) => void;
        handler: (newVal: import("fastify").RouteHandlerMethod<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>) => void;
        errorHandler: (newVal: ((this: import("fastify").FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify").FastifyLoggerInstance>, error: import("fastify-error").FastifyError, request: import("fastify").FastifyRequest<import("fastify/types/route").RouteGenericInterface, import("http").Server, import("http").IncomingMessage>, reply: import("fastify").FastifyReply<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown>) => void) | undefined) => void;
        validatorCompiler: (newVal: import("fastify").FastifySchemaCompiler<import("fastify").FastifySchema> | undefined) => void;
        serializerCompiler: (newVal: import("fastify/types/schema").FastifySerializerCompiler<import("fastify").FastifySchema> | undefined) => void;
        schemaErrorFormatter: (newVal: ((errors: import("fastify/types/schema").FastifySchemaValidationError[], dataVar: string) => Error) | undefined) => void;
        bodyLimit: (newVal: number | undefined) => void;
        logLevel: (newVal: import("fastify").LogLevel | undefined) => void;
        config: (newVal: import("fastify").FastifyContextConfig | undefined) => void;
        version: (newVal: string | undefined) => void;
        prefixTrailingSlash: (newVal: "slash" | "no-slash" | "both" | undefined) => void;
    };
}
export {};
