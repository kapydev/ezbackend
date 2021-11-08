/// <reference types="node" />
import { EzApp, EzBackendServer } from "./ezapp";
import fastify, { FastifyInstance } from "fastify";
import { Connection, createConnection, EntitySchema, ObjectLiteral, Repository } from "typeorm";
import { InjectOptions } from "light-my-request";
export interface EzBackendInstance {
    entities: Array<EntitySchema>;
    server: EzBackendServer;
    _server: FastifyInstance;
    repo: Repository<ObjectLiteral>;
    orm: Connection;
}
export interface EzBackendOpts {
    address: string;
    port: number;
    orm: Parameters<typeof createConnection>[0];
    server: Parameters<typeof fastify>[0];
}
/**
 * Child of EzApp. This is where you set up your backend setup tasks.
 */
export declare class EzBackend extends EzApp {
    constructor();
    getInternalInstance(): EzBackendInstance;
    getInternalServer(): FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify").FastifyLoggerInstance>;
    inject(injectOpts: string | InjectOptions): Promise<import("light-my-request").Response>;
    verifyStarted(funcName?: string): void;
    printRoutes(): string;
    printPlugins(): string;
    prettyPrint(): string;
    start(opts?: any): Promise<void>;
}
