import { EzBackend, EzPlugin } from "@ezbackend/core";
import * as _ from "lodash"; //TODO: Tree shaking
import { Entity, Repository, } from "typeorm";
import { APIGenerator } from "./generators/api-generator";
import { convert } from "./typeorm-json-schema";
import {EzError} from '@ezbackend/utils'

//TODO: Type checking for include and exclude arrays
type IEzModelOpts = Partial<{
}> & (
    { include?: Array<string> } |
    { exclude?: Array<string> }
  )



//TODO: Give options for prefix
export function EzModel(modelOpts?: IEzModelOpts): ClassDecorator {
  return function (target) {
    Entity()(target);
    const ezb = EzBackend.app();
    if (ezb.models === undefined) {
      ezb.models = [];
    }
    const meta = new EzModelMeta(target)

    if (modelOpts) {
      const configureGenerator = async (emm, opts) => {
        const generators = emm.generator.generators
        let unusedKeys
        if ('include' in modelOpts) {
          unusedKeys = new Set(modelOpts.include)
          emm.generator.generators = Object.keys(generators).reduce((filtered,key) => {
            if (modelOpts.include.includes(key)) {
              filtered[key] = generators[key]
              unusedKeys.delete(key)
            }
            return filtered
          }, {})

        } else if ('exclude' in modelOpts) {
          unusedKeys = new Set(modelOpts.exclude)
          emm.generator.generators = Object.keys(generators).reduce((filtered,key) => {
            if (!modelOpts.exclude.includes(key)) {
              filtered[key] = generators[key]
              unusedKeys.delete(key)
            }
            return filtered
          }, {})
        }
        if (unusedKeys.size !== 0) {
          const includeOrExclude = 'include' in modelOpts ? 'include' : 'exclude'
          const msg = `"${Array.from(unusedKeys)}" was not used in "${includeOrExclude}" for model "${meta.model.name}"`
          const desc = `The values provided to "${includeOrExclude}" must be of one of the values ${Object.keys(generators)}`
          throw new EzError(msg,desc)
        }
      }

      meta.plugins.postInit.push(configureGenerator)
    }


    ezb.models.push(meta);
  };
}

interface IEzModelMeta {

}

//URGENT TODO: Fix the type declarations so that when a class extends ezplugin it gets the new types
export class EzModelMeta extends EzPlugin<IEzModelMeta>{
  model: any
  generator: APIGenerator
  //TODO: Give this a proper type definition from the constructor
  repo: Repository<unknown>

  constructor(model) {
    super()
    this.model = model
    this.initGenerator()
  }

  initGenerator() {

    //TODO: Add types to these
    const addSchemas = async (emm, opts) => {
      const ezb = EzBackend.app()
      //Add all models to be a schema
      emm.repo = ezb.orm.getRepository(emm.model)
      const { createSchema, updateSchema, fullSchema } = convert(emm.repo.metadata)
      //URGENT TODO: Figure out why the error for adding a schema repeatedly is thrown when 'Detail' comes after 'User' in the specification
      ezb.server.addSchema(createSchema)
      ezb.server.addSchema(updateSchema)
      ezb.server.addSchema(fullSchema)
      emm.generator = new APIGenerator(emm.repo, { prefix: emm.model.name })
    }

    this.plugins.init = addSchemas

    const generateRoutes = async (emm, opts) => {
      emm.generator.generateRoutes()

    }
    this.plugins.run = generateRoutes
  }
}

export * from './generators/api-generator'
export * from './generators/default-generators'




