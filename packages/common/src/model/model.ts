import { EzApp } from '../ezapp'
import { Plugin } from 'avvio'
import { ColumnType, EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions, ObjectLiteral, Repository } from 'typeorm'
import { EntitySchemaOptions, } from 'typeorm/entity-schema/EntitySchemaOptions'
import { RelationType as TypeORMRelationType } from 'typeorm/metadata/types/RelationTypes'
import { EzRouter, RouterOptions } from './generators/api-generator'
import { EzError } from '@ezbackend/utils'

enum NormalType {
    VARCHAR = 'VARCHAR',
    INT = 'INT',
    FLOAT = 'FLOAT',
    DOUBLE = 'DOUBLE',
    REAL = 'REAL',
    DATE = 'DATE',
    JSON = 'JSON',
    BOOL = 'BOOL'
}

enum RelationType {
    ONE_TO_ONE = 'ONE_TO_ONE',
    ONE_TO_MANY = 'ONE_TO_MANY',
    MANY_TO_ONE = 'MANY_TO_ONE',
    MANY_TO_MANY = 'MANY_TO_MANY'
}

export type Type = RelationType | NormalType
export const Type = { ...RelationType, ...NormalType }

type NestedRelationType = { type: RelationType } & Omit<EntitySchemaRelationOptions, 'type'>
type NestedNormalType = { type: NormalType | ColumnType } & Omit<EntitySchemaColumnOptions, 'type'>

export type FullType =
    NormalType |
    RelationType |
    NestedNormalType |
    NestedRelationType

export type ModelSchema = {
    [index: string]: FullType

}

export type RepoOptions = Omit<EntitySchemaOptions<any>, 'name' | 'columns' | 'relations'>

//URGENT TODO: Allow array?
//URGENT TODO: Allow normal typeorm types?

function normalTypeToTypeORMtype(type: NormalType | ColumnType): ColumnType {
    switch (type) {
        case NormalType.VARCHAR:
            return 'varchar'
        case NormalType.INT:
            return 'integer'
        case NormalType.FLOAT:
            return 'float'
        case NormalType.DOUBLE:
            return 'double'
        case NormalType.REAL:
            return 'real'
        case NormalType.DATE:
            return 'date'
        case NormalType.BOOL:
            return 'boolean'
        case NormalType.JSON:
            //URGENT TODO: Switch between simple json and normal json depending on postgres column?
            return 'simple-json'
        default:
            return type
    }
}

function relationTypeToTypeORMrelation(type: RelationType): TypeORMRelationType {
    switch (type) {
        case RelationType.ONE_TO_MANY:
            return 'one-to-many'
        case RelationType.ONE_TO_ONE:
            return 'one-to-one'
        case RelationType.MANY_TO_ONE:
            return 'many-to-one'
        case RelationType.MANY_TO_MANY:
            return 'many-to-many'
    }
}

export function isRelation(type: FullType): type is RelationType {
    return Object.values(RelationType).includes(type as RelationType)
}

export function isNestedRelation(type: FullType): type is NestedRelationType {
    return Object.values(RelationType).includes((type as NestedRelationType).type)
}

export function isNormalType(type: FullType): type is NormalType {
    return Object.values(NormalType).includes(type as NormalType)
}

export function isNestedNormalType(type: FullType): type is NestedNormalType {
    const ColumnType: Array<ColumnType> = [
        "int", "int2", "int4", "int8", "integer", "tinyint", "smallint", "mediumint", "bigint", "dec", "decimal", "smalldecimal", "fixed", "numeric", "number", "geometry", "geography", "st_geometry", "st_point", "float", "double", "dec", "decimal", "smalldecimal", "fixed", "numeric", "real", "double precision", "number", "datetime", "datetime2", "datetimeoffset", "time", "time with time zone", "time without time zone", "timestamp", "timestamp without time zone", "timestamp with time zone", "timestamp with local time zone", "character varying", "varying character", "char varying", "nvarchar", "national varchar", "character", "native character", "varchar", "char", "nchar", "national char", "varchar2", "nvarchar2", "alphanum", "shorttext", "raw", "binary", "varbinary", "string", "tinyint", "smallint", "mediumint", "int", "bigint", "simple-array", "simple-json", "simple-enum", "int2", "integer", "int4", "int8", "int64", "unsigned big int", "float", "float4", "float8", "smallmoney", "money", "boolean", "bool", "tinyblob", "tinytext", "mediumblob", "mediumtext", "blob", "text", "ntext", "citext", "hstore", "longblob", "longtext", "alphanum", "shorttext", "bytes", "bytea", "long", "raw", "long raw", "bfile", "clob", "nclob", "image", "timetz", "timestamptz", "timestamp with local time zone", "smalldatetime", "date", "interval year to month", "interval day to second", "interval", "year", "seconddate", "point", "line", "lseg", "box", "circle", "path", "polygon", "geography", "geometry", "linestring", "multipoint", "multilinestring", "multipolygon", "geometrycollection", "st_geometry", "st_point", "int4range", "int8range", "numrange", "tsrange", "tstzrange", "daterange", "enum", "set", "cidr", "inet", "macaddr", "bit", "bit varying", "varbit", "tsvector", "tsquery", "uuid", "xml", "json", "jsonb", "varbinary", "hierarchyid", "sql_variant", "rowid", "urowid", "uniqueidentifier", "rowversion", "array", "cube", "ltree"
    ]
    return (Object.values(NormalType) as Array<NormalType | ColumnType>).concat(ColumnType).includes((type as NestedNormalType).type)
}

function schemaToEntityOptions(schema: ModelSchema) {
    const columns: { [key: string]: EntitySchemaColumnOptions } = {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        //URGENT TODO: Figure out why TypeORM is not automatically generating the createdAt and updatedAt dates
        // createdAt: {
        //     type: 'date',
        //     createDate: true
        // },
        // updatedAt: {
        //     type: 'date',
        //     updateDate: true
        // }
    }
    const relations: { [key: string]: EntitySchemaRelationOptions } = {}
    Object.entries(schema).forEach(([key, value]) => {
        //URGENT TODO: Allow proper overridding of default columns
        if (isNormalType(value)) {
            columns[key] = {
                type: normalTypeToTypeORMtype(value)
            }
            return
        }
        if (isNestedNormalType(value)) {
            const { type, ...noType } = value
            columns[key] = {
                type: normalTypeToTypeORMtype(value.type),
                ...noType
            }
        }
        if (isRelation(value)) {
            //Note: This makes it compulsory for the key to be the name of relation
            relations[key] = {
                type: relationTypeToTypeORMrelation(value),
                target: key
            }
            return
        }
        if (isNestedRelation(value)) {
            const { type, ...noType } = value
            relations[key] = {
                type: relationTypeToTypeORMrelation(value.type),
                ...noType
            }
        }
    })
    return { columns, relations }
}

//TODO: Think about function naming
function entityGeneratorFactory(modelName: string, modelSchema: ModelSchema, repoOpts: RepoOptions) {
    const entityGenerator: Plugin<any, any> = async (instance, opts) => {
        const { columns, relations } = schemaToEntityOptions(modelSchema)
        const newEntity = new EntitySchema({
            name: modelName,
            columns,
            relations,
            ...repoOpts
        })
        instance.entities.push(newEntity)
    }
    return entityGenerator
}

export class EzRepo extends EzApp {

    _repo: Repository<ObjectLiteral> | undefined

    constructor(modelName: string, modelSchema: ModelSchema, repoOpts: RepoOptions = {}) {
        super()
        this.setInit(`Create "${modelName}" Entity`, entityGeneratorFactory(modelName, modelSchema, repoOpts))

        this.setPostInit(`Obtain ${modelName} Repository`, async (instance, opts) => {
            instance.repo = instance.orm.getRepository(modelName)
            this._repo = instance.repo
        })
    }

    getRepo(): Repository<ObjectLiteral> {
        if (this._repo === undefined) {
            throw new EzError(
                "Can only call getRepo() in lifecyle preHandler to postRun",
                "The repo is only defined in the postInit lifecycle, so it can only be referenced after that",
                `
model.setHandler("Handle Repo", async (instance, opts) => {
    const repo = model.getRepo()
    //Do stuff with repo
})`
            )
        }
        return this._repo
    }
}

export type ModelOpts = {
    repoOpts?: RepoOptions
    routerOpts?: RouterOptions
}

/**
 * Child of EzApp. This is your data model.
 */
export class EzModel extends EzRepo {

    //TODO: Figure out automatic typings
    get router(): EzRouter {
        return this.getApp('router') as EzRouter
    }

    constructor(modelName: string, modelSchema: ModelSchema, opts: ModelOpts = {}) {
        super(modelName, modelSchema, opts.repoOpts ?? {})

        const router = new EzRouter(opts.routerOpts)

        //TODO: Think about customisability of EzRouter
        this.addApp("router", router)
    }

}