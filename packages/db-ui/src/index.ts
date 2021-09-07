import {EzBackend} from "@ezbackend/core"
import fastifyStatic from 'fastify-static'
import "@ezbackend/common"
import path from 'path'

const ezb = EzBackend.app()

ezb.plugins.preRun.push(async (ezb,opts) => {
    ezb.server.register(fastifyStatic, {
        root: path.join(__dirname,"../placeholder/build"),
        prefix: "/db-ui",
        prefixAvoidTrailingSlash: true
    })
})