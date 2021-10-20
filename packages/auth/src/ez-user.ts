import { EzModel, ModelSchema, ModelOpts, Type, isRelation, isNestedRelation, isNormalType, isNestedNormalType } from '@ezbackend/common'
import providerDict from './providers'
import { BaseProvider } from '.'

//URGENT TODO: Figure out base provider type from abstract class
export type Providers = Array<'google' | any>

function addProviderToSchema(providerName: string, schema: ModelSchema) {
    const idCol = `${providerName}Id`
    const dataCol = `${providerName}Data`
    if (idCol in schema) {
        throw new Error(`${idCol} is automatically generated for the user model and cannot be specified`)
    }
    if (dataCol in schema) {
        throw new Error(`${dataCol} is automatically generated for the user model and cannot be specified`)
    }
    schema[idCol] = {
        type: Type.VARCHAR,
        unique: true
    } //TODO: Confirm this is always varchar or coeracable to varchar
    schema[dataCol] = Type.JSON
    return schema
}

function checkGeneratable(modelSchema: ModelSchema) {
    Object.values(modelSchema).forEach(col => {
        if (isRelation(col) || isNormalType(col)) {
            throw new Error("Columns of EzUser need to either have a default value or be nullable")
        } else if (col.default === undefined && (col.nullable === false || col.nullable === undefined)) {
            throw new Error("Columns of EzUser need to either have a default value or be nullable")
        }
    })
}

export class EzUser extends EzModel {

    constructor(modelName: string, providers: Providers, modelSchema: ModelSchema = {}, modelOptions: ModelOpts = {}) {

        //Check that all schemas within the model either have default or are nullable
        checkGeneratable(modelSchema)

        //Modify the schema to introduce things required by the providers
        providers.forEach(providerOrProviderName => {
            if (typeof providerOrProviderName === 'string') {
                const providerName = providerOrProviderName
                modelSchema = addProviderToSchema(providerName, modelSchema)
            } else {
                const tempProvider = new providerOrProviderName()
                const providerName = tempProvider.providerName
                modelSchema = addProviderToSchema(providerName, modelSchema)



            }
        })

        super(modelName, modelSchema, modelOptions)

        //Add the providers as child apps
        providers.forEach(providerOrProviderName => {
            if (typeof providerOrProviderName === 'string') {
                const providerName = providerOrProviderName
                //URGENT TODO: Get rid of ts-ignore
                //@ts-ignore
                const Provider = providerDict[providerName]
                const provider = new Provider(modelName)
                this.addApp(`${providerName} auth`, provider)
            } else {
                const provider = new providerOrProviderName(modelName)
                const providerName = provider.providerName
                this.addApp(`${providerName} auth`, provider)
            }


        })
    }

}