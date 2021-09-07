import initPlugin from "@ezbackend/common"
import {EzBackend} from "@ezbackend/core"
import fastifyStatic from 'fastify-static'
import path from 'path'

export default function init(config) {

    initPlugin('hi')

    const ezb = EzBackend.app()

    ezb.plugins.preRun.push(async (ezb, opts) => {
        ezb.server.register(fastifyStatic, {
            root: path.join(__dirname, "../placeholder/build"),
            prefix: "/db-ui",
            prefixAvoidTrailingSlash: true
        })
    })
}