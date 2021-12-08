import { EzRouter, RouterOptions } from './generators/ez-router'
import { EzRepo, EzRules, ModelSchema, RepoOptions } from './repo'
import dedent from 'dedent-js'


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

    get rules(): EzRules {
        return this.getApp('rules') as EzRules
    }

    constructor(modelName: string, modelSchema: ModelSchema, opts: ModelOpts = {}) {
        super(modelName, modelSchema, opts.repoOpts ?? {})

        const router = new EzRouter(opts.routerOpts)

        const rules = new EzRules(modelName)

        this.addApp("router", router)
        this.addApp("rules", rules)
    }

}