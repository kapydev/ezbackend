import { EzBackend } from "@ezbackend/core";
import { mixedInstance } from "avvio";

const ezb = EzBackend.app()

interface IOptions {
    cors?: any
}

//TODO: Log warning if the cors are not properly set up
ezb.plugins.postInit.push((ezb: mixedInstance<EzBackend>,opts:IOptions,cb)=> {
    ezb.server.register(require('fastify-cors'), opts.cors)
    cb()
})