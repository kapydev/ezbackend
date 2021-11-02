import { App, PluginScope } from "@ezbackend/core"
import fastifyCors from "fastify-cors"

export class EzCors extends App {
    constructor() {
        super()

        this.setHandler('Add Cors Plugin', async (instance, opts) => {
            //URGENT TODO: Make sure that user updates these values before going to production
            instance.server.register(fastifyCors, {
                origin: true,
                credentials: true,
                methods: ['GET','PUT','POST','PATCH','DELETE', 'OPTIONS']
            })
        })

        //TODO: Think about naming of PluginScope for scope... should it be a function instead?
        this.scope = PluginScope.PARENT
    }
}