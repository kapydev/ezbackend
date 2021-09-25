import { App } from "@ezbackend/core";
import fastify from "fastify";
import fastifyBoom from 'fastify-boom'
import { createConnection } from "typeorm";
import override from 'fastify/lib/pluginOverride'
import fastq from 'fastq'


//TODO: Check if emojis will break instance names
//URGENT TODO: Strict types for instance, opts
async function addErrorSchema(instance, opts) {
    instance.server.addSchema({
        "$id": "ErrorResponse",
        type: 'object',
        properties: {
            statusCode: { type: 'number' },
            error: { type: 'string' },
            message: { type: 'string' }
        }
    })
}

type Arg = {
    fn: Function,
    args: any
}

function asyncQueuedWorker(qObj: Arg, cb: Function) {

    //The normal callback is just done() so we need a wrapper function for that
    //p1 can either be the callback value or the error, whereas p2 is the callback val
    const done = (p1, p2) => {
        if (p1 && !p2) {
            cb(null, p1)
            return
        }
        if (p1 && p2 || !p1 && p2) {
            cb(p1, p2)
            return
        }
        if (!p1 && !p2) {
            cb(null, null)
            return
        }
        throw "All possible cases should be reached by here"

    }

    //Run the function with the specified arguments, with the done callback
    const promise = qObj.fn(...qObj.args, done)

    //Handling promises so we account for signature (s,opts,done) and async(s,opts)
    if (promise && typeof promise.then === 'function') {
        promise.then(
            () => { process.nextTick(done) },
            (e) => process.nextTick(done, e))
    }
}

export class EzBackend extends App {
    constructor() {
        super()
        this.setInit('Create Fastify Server', async (instance, opts) => {
            const queue = fastq(asyncQueuedWorker, 1)
            instance.server = fastify(opts.server)
            instance.server.register = (func: Function, registerOpts = {}) => {
                const childServer = override(instance.server, func, registerOpts)
                //Reference from avvio: https://github.com/fastify/avvio/blob/master/plugin.js#:~:text=const%20promise%20%3D%20func,%7D
                //LEFT OFF:Seems like something wrong with the onRegister or onReady hook (fastify swagger /util/common)
                //Perhaps can we directly copy whatever fastify did? So what they did when loading
                //Probably in actual fastify file -> look at hook calling implementation
                

                queue.push({
                    fn: func,
                    args: [childServer, registerOpts]
                })
            }
        })
        this.setInit('Add Fastify Boom', async (instance, opts) => {
            instance.server.register(fastifyBoom)
        })
        this.setInit('Create Entities Container', async (instance, opts) => {
            instance.entities = []
        })
        this.setPostInit('Create Database Connection', async (instance, opts) => {
            instance.orm = await createConnection(
                {
                    ...opts.orm,
                    entities: instance.entities
                }
            )
        })
        this.setPreHandler('Add Error Schema', addErrorSchema)

        this.setRun('Run Fastify Server', async (instance, opts) => {
            await instance.server.listen(opts.port)
        })

        this.setCustomOverride("server", (old, fn, opts) => {
            const newObj = override(old, fn, opts)
            
            //URGENT TODO: Check if after, ready, listen work
            //URGENT TODO: Any issues with fastify plugin?
            //Maybe we can run the tests with the fastify test suite?
            return newObj

        })

        this.setCustomOverride("server", override)

    }
}