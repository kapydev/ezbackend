import { EzBackend, EzPlugin } from "@ezbackend/core";
import * as _ from "lodash"; //TODO: Tree shaking
import { Entity, Repository, } from "typeorm";
import { APIGenerator } from "./generators/api-generator";
import { convert } from "./typeorm-json-schema";

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
        //URGENT TODO: Throw error message with allowed include and excludes if an invalid include or exclude is used
        if ('include' in modelOpts) {
          emm.generator.generators = Object.fromEntries(
            Object.entries(generators).filter(([k, v]) => modelOpts.include.includes(k)
            )
          )

        } else if ('exclude' in modelOpts) {
          emm.generator.generators = Object.fromEntries(
            Object.entries(generators).filter(([k, v]) => !(modelOpts.exclude.includes(k)))
          )
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




