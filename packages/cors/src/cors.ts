import { PluginScope } from "@ezbackend/core"
import fastifyCors, {FastifyCorsOptions} from "fastify-cors"
import { EzApp } from "@ezbackend/common"
import type { EzBackendOpts } from "@ezbackend/common"

declare module "@ezbackend/common" {
    interface EzBackendOpts {
        cors: FastifyCorsOptions
    }
}

const defaultConfig: EzBackendOpts['cors'] =  {
    origin: true,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}

export class EzCors extends EzApp {
    constructor(corsOpts?: EzBackendOpts['cors']) {
        super()

        this.setDefaultOpts(defaultConfig)

        this.setHandler('Add Cors Plugin', async (instance, fullOpts) => {
            const opts = this.getOpts('cors',fullOpts,corsOpts)

            if (opts.origin === true) {
                console.warn("Reflecting the cors origin leaves you backend vulnerable to CSRF attacks. Set it only to trusted urls.")
            }

            instance.server.register(fastifyCors,opts)
        })

        //TODO: Think about naming of PluginScope for scope... should it be a function instead?
        this.scope = PluginScope.PARENT
    }
}