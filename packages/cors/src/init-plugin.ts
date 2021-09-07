import "@ezbackend/common"
import { EzBackend } from "@ezbackend/core";

export default function init(config) {
    const ezb = EzBackend.app()

    interface IOptions {
        cors?: any
    }
    
    //TODO: Log warning if the cors are not properly set up
    ezb.plugins.postInit.push((ezb,opts:IOptions,cb)=> {
        ezb.server.register(require('fastify-cors'), opts.cors)
        cb()
    })
}