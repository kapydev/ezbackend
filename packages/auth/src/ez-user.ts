import { EzModel, ModelSchema, ModelOpts, Type } from '@ezbackend/common'
import providers from './providers'

export type Providers = Array<'google'>

function addProviderToSchema(providerName: string, schema: ModelSchema) {
    const idCol = `${providerName}Id`
    const dataCol = `${providerName}Data`
    if (idCol in schema) {
        throw `${idCol} is automatically generated for the user model and cannot be specified`
    }
    if (dataCol in schema) {
        throw `${dataCol} is automatically generated for the user model and cannot be specified`
    }
    schema[idCol] = Type.VARCHAR //TODO: Confirm this is always varchar or coeracable to varchar
    schema[dataCol] = Type.JSON
    return schema
}

export class EzUser extends EzModel {

    constructor(modelName: string, providerNames: Providers, modelSchema: ModelSchema = {}, modelOptions: ModelOpts = {}) {

        //Modify the schema to introduce things required by the providers
        providerNames.forEach(providerName => {
            modelSchema = addProviderToSchema(providerName, modelSchema)
        })

        super(modelName, modelSchema, modelOptions)

        //Add the providers as child apps
        providerNames.forEach(providerName => {
            const Provider = providers[providerName]
            const provider = new Provider(modelName)
            this.addApp(`${providerName} auth`,provider)

        })
    }

}