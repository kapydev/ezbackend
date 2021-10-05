import { EzApp } from '../ezapp'
import { Plugin } from 'avvio'
import { ColumnType, EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions, ObjectLiteral, Repository } from 'typeorm'
import { EntitySchemaOptions,  } from 'typeorm/entity-schema/EntitySchemaOptions'
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
type NestedNormalType = { type: NormalType } & Omit<EntitySchemaColumnOptions, 'type'>

export type FullType =
    NormalType |
    RelationType |
    NestedNormalType|
    NestedRelationType

export type ModelSchema = {
    [index: string]: FullType

}

export type RepoOptions = Omit<EntitySchemaOptions<any>, 'name' | 'columns' | 'relations'>

//URGENT TODO: Allow array?
//URGENT TODO: Allow normal typeorm types?

function normalTypeToTypeORMtype(type:NormalType):ColumnType {
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
    }
}

function relationTypeToTypeORMrelation(type:RelationType):TypeORMRelationType {
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

export function isRelation(type:FullType): type is RelationType {
    return Object.values(RelationType).includes(type as RelationType)
}

export function isNestedRelation(type:FullType): type is NestedRelationType {
    return Object.values(RelationType).includes((type as NestedRelationType).type)
}

export function isNormalType(type:FullType): type is NormalType {
    return Object.values(NormalType).includes(type as NormalType)
}

export function isNestedNormalType(type:FullType): type is NestedNormalType {
    return Object.values(NormalType).includes((type as NestedNormalType).type)
}

function schemaToEntityOptions(schema: ModelSchema) {
    const columns:{[key:string]:EntitySchemaColumnOptions} = {
        id : {
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
    const relations:{[key:string]:EntitySchemaRelationOptions} = {}
    Object.entries(schema).forEach(([key, value]) => {
        //URGENT TODO: Allow proper overridding of default columns
        if (isNormalType(value)) {
            columns[key] = {
                type: normalTypeToTypeORMtype(value)
            }
            return
        }
        if (isNestedNormalType(value)) {
            const {type,...noType} = value
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
            const {type,...noType} = value
            relations[key] = {
                type: relationTypeToTypeORMrelation(value.type),
                ...noType
            }
        }
    })
    return {columns,relations}
}

//TODO: Think about function naming
function entityGeneratorFactory (modelName: string, modelSchema: ModelSchema, repoOpts: RepoOptions) {
    const entityGenerator: Plugin<any, any> = async (instance, opts) => {
        const {columns,relations} = schemaToEntityOptions(modelSchema)
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

export class EzModelRepo extends EzApp {

    _repo: Repository<ObjectLiteral> | undefined

    constructor(modelName: string, modelSchema: ModelSchema, repoOpts: RepoOptions = {}) {
        super()
        this.setInit(`Create "${modelName}" Entity`, entityGeneratorFactory(modelName, modelSchema, repoOpts))

        this.setPostInit(`Obtain ${modelName} Repository`, async(instance,opts) => {
            instance.repo = instance.orm.getRepository(modelName)
            this._repo = instance.repo
        })
    }

    getRepo() : Repository<ObjectLiteral> {
        if (this._repo === undefined) {
            throw new EzError(
"Can only call getRepo() in lifecyle preHandler to postRun",
"The repo is only defined in the postInit lifecycle, so it can only be referenced after that",
`model.setHandler("Handle Repo", async (instance, opts) => {
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
export class EzModel extends EzModelRepo {

    //TODO: Figure out automatic typings
    get router():EzRouter {
        return this.getApp('router') as EzRouter
    }

    constructor(modelName: string, modelSchema: ModelSchema, opts: ModelOpts = {}) {
        super(modelName, modelSchema, opts.repoOpts ?? {})

        const router = new EzRouter(opts.routerOpts)

        //TODO: Think about customisability of EzRouter
        this.addApp("router", router)
    }

}