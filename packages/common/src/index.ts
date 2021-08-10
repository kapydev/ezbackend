import {EzBackend as EzBackendBase} from '@ezbackend/core'
import {Sequelize} from "sequelize"
import {fastify, FastifyInstance} from "fastify"
import path from 'path'

//TODO: Think about programatically adding types
export class EzBackend extends EzBackendBase {
    sequelize: Sequelize
    server: FastifyInstance
}

const ezb = EzBackend.app() as EzBackend

//Configure defaults
ezb.plugins.init = () => {
    ezb.sequelize = new Sequelize("sqlite::memory")
    ezb.server = fastify({ logger: {
        prettyPrint:{
            translateTime: 'SYS:HH:MM:ss',
            ignore:'pid,hostname,reqId,responseTime,req,res',
            messageFormat: '[{req.method} {req.url}] {msg}'

        }
    }})
}

ezb.plugins.handler = () => {
    //TODO: Allow user to specify the ezb path he wants
    const customEzbPath = path.join(process.cwd(), '.ezb/index.ts')
    require(customEzbPath)
}


ezb.plugins.run = async () => {
    const port = process.env.PORT ? Number(process.env.PORT) : 8888
    await ezb.server.listen(port, function(err,address) {
        if (err) {
            console.log(err)
            process.exit(1)
        }
    })
}
