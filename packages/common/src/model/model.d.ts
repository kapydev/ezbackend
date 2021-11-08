import { EzApp } from '../ezapp';
import { ColumnType, EntitySchemaColumnOptions, EntitySchemaRelationOptions, ObjectLiteral, Repository } from 'typeorm';
import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';
import { EzRouter, RouterOptions } from './generators/api-generator';
declare enum NormalType {
    VARCHAR = "VARCHAR",
    INT = "INT",
    FLOAT = "FLOAT",
    DOUBLE = "DOUBLE",
    REAL = "REAL",
    DATE = "DATE",
    JSON = "JSON",
    BOOL = "BOOL",
    ENUM = "ENUM"
}
declare enum RelationType {
    ONE_TO_ONE = "ONE_TO_ONE",
    ONE_TO_MANY = "ONE_TO_MANY",
    MANY_TO_ONE = "MANY_TO_ONE",
    MANY_TO_MANY = "MANY_TO_MANY"
}
export declare type Type = RelationType | NormalType;
export declare const Type: {
    VARCHAR: NormalType.VARCHAR;
    INT: NormalType.INT;
    FLOAT: NormalType.FLOAT;
    DOUBLE: NormalType.DOUBLE;
    REAL: NormalType.REAL;
    DATE: NormalType.DATE;
    JSON: NormalType.JSON;
    BOOL: NormalType.BOOL;
    ENUM: NormalType.ENUM;
    ONE_TO_ONE: RelationType.ONE_TO_ONE;
    ONE_TO_MANY: RelationType.ONE_TO_MANY;
    MANY_TO_ONE: RelationType.MANY_TO_ONE;
    MANY_TO_MANY: RelationType.MANY_TO_MANY;
};
declare type NestedRelationType = {
    type: RelationType;
} & Omit<EntitySchemaRelationOptions, 'type'>;
declare type NestedNormalType = {
    type: NormalType | ColumnType;
} & Omit<EntitySchemaColumnOptions, 'type'>;
export declare type FullType = NormalType | RelationType | NestedNormalType | NestedRelationType;
export declare type ModelSchema = {
    [index: string]: FullType;
};
export declare type RepoOptions = Omit<EntitySchemaOptions<any>, 'name' | 'columns' | 'relations'>;
export declare function isRelation(type: FullType): type is RelationType;
export declare function isNestedRelation(type: FullType): type is NestedRelationType;
export declare function isNormalType(type: FullType): type is NormalType;
export declare function isNestedNormalType(type: FullType): type is NestedNormalType;
export declare class EzRepo extends EzApp {
    _repo: Repository<ObjectLiteral> | undefined;
    constructor(modelName: string, modelSchema: ModelSchema, repoOpts?: RepoOptions);
    getRepo(): Repository<ObjectLiteral>;
}
export declare type ModelOpts = {
    repoOpts?: RepoOptions;
    routerOpts?: RouterOptions;
};
/**
 * Child of EzApp. This is your data model.
 */
export declare class EzModel extends EzRepo {
    get router(): EzRouter;
    constructor(modelName: string, modelSchema: ModelSchema, opts?: ModelOpts);
}
export {};
