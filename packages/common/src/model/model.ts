import { App } from '@ezbackend/core'
import { Plugin } from 'avvio'
import { ColumnType, EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from 'typeorm'
import { EntitySchemaOptions,  } from 'typeorm/entity-schema/EntitySchemaOptions'
import { RelationType as TypeORMRelationType } from 'typeorm/metadata/types/RelationTypes'
import { EzRouter } from './generators/api-generator'

enum NormalType {
    VARCHAR = 'VARCHAR',
    INT = 'INT',
    FLOAT = 'FLOAT',
    DOUBLE = 'DOUBLE',
    REAL = 'REAL',
    DATE = 'DATE',
    JSON = 'JSON',
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

export type ModelOptions = Omit<EntitySchemaOptions<any>, 'name' | 'columns' | 'relations'>

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

function isRelation(type:FullType): type is RelationType {
    return Object.values(RelationType).includes(type as RelationType)
}

function isNestedRelation(type:FullType): type is NestedRelationType {
    return Object.values(RelationType).includes((type as NestedRelationType).type)
}

function isNormalType(type:FullType): type is NormalType {
    return Object.values(NormalType).includes(type as NormalType)
}

function isNestedNormalType(type:FullType): type is NestedNormalType {
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
function entityGeneratorFactory (modelName: string, modelSchema: ModelSchema, modelOptions: ModelOptions) {
    const entityGenerator: Plugin<any, any> = async (instance, opts) => {
        const {columns,relations} = schemaToEntityOptions(modelSchema)
        const newEntity = new EntitySchema({
            name: modelName,
            columns,
            relations,
            ...modelOptions
        })
        instance.entities.push(newEntity)
    }
    return entityGenerator
}

export class EzModel extends App {
    constructor(modelName: string, modelSchema: ModelSchema, modelOptions: ModelOptions = {}) {
        super()
        this.setInit(`Create "${modelName}" Entity`, entityGeneratorFactory(modelName, modelSchema, modelOptions))

        this.setPostInit(`Obtain ${modelName} Repository`, async(instance,opts) => {
            instance.repo = instance.orm.getRepository(modelName)
        })

        const router = new EzRouter()

        //TODO: Think about customisability of EzRouter
        this.addApp("Router", router)
    }

}