import {App, PluginScope} from "@ezbackend/core"
import fastifyCors from "fastify-cors"

export class EzCors extends App {
    constructor() {
        super()

        this.setHandler('Add Cors Plugin', async (instance,opts) => {
            instance.server.register(fastifyCors,opts.cors)
        })

        //TODO: Think about naming of PluginScope for scope... should it be a function instead?
        this.scope = PluginScope.PARENT
    }
}