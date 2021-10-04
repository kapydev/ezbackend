//@ts-nocheck
//We use nocheck here because its too troublesome to create all the types for the test cases
import { describe, it, expect } from "@jest/globals";
import { App } from "../src";
import fastify from 'fastify'
import override from 'fastify/lib/pluginOverride'
import { kRoutePrefix } from 'fastify/lib/symbols'
import fastq from 'fastq'

let app

beforeEach(() => {
    app = new App()

    app.setInit('Create Fastify Server', async (instance, opts) => {
        instance.server = fastify()
    })

    //TODO: Switch this with .ready()
    app.setRun("Run Fastify Server", async (instance, opts) => {
        await instance.server.listen()
    })

    app.setPostRun("Kill Server", async (instance, opts) => {
        await instance.server.close()
    })

    //The location of this function should not matter
    app.setCustomOverride("server", (old, fn, opts) => {
        const newObj = override(old, fn, opts)

        type Arg = {
            fn: Function,
            args: any
        }

        function worker(qObj: Arg, cb: Function) {

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

        const queue = fastq(worker, 1)

        newObj.register = (func: Function) => {
            const childServer = override(newObj, () => { }, opts)
            //Reference from avvio: https://github.com/fastify/avvio/blob/master/plugin.js#:~:text=const%20promise%20%3D%20func,%7D

            queue.push({
                fn: func,
                args: [childServer, opts]
            })

        }
        //URGENT TODO: Check if after, ready, listen work
        //URGENT TODO: Any issues with fastify plugin?
        //Maybe we can run the tests with the fastify test suite?
        return newObj
    })
})

describe("test with fastify", () => {
    it("Should share instances between init, handler, run despite custom override", async () => {
        const instanceContainer = []

        app.setHandler("get handler instance", async (instance, opts) => {
            instanceContainer.push(instance.server)
        })

        app.setRun("get run instance", async (instance, opts) => {
            instanceContainer.push(instance.server)
        })

        app.setPostRun("get post run instance", async (instance, opts) => {
            instanceContainer.push(instance.server)
        })

        await app.start()

        expect(instanceContainer[0]).not.toBeUndefined()
        expect(instanceContainer[1]).not.toBeUndefined()
        expect(instanceContainer[2]).not.toBeUndefined()
        expect(instanceContainer[0]).toBe(instanceContainer[1])
        expect(instanceContainer[1]).toBe(instanceContainer[2])
    })
    it("Child should have prefix depending on opts it was added with", async () => {
        const prefixedChild = new App()

        app.addApp('Prefixed Child', prefixedChild, { prefix: 'prefix' })

        prefixedChild.setHandler("Check for prefix", async (instance, opts) => {
            expect(instance.server[kRoutePrefix]).toBe('/prefix')
        })

        await app.start()

    })

    it("Child should have same server instance in different lifecycle states", async () => {
        const prefixedChild = new App()

        app.addApp('Prefixed Child', prefixedChild, { prefix: 'prefix' })

        const instanceContainer = []

        prefixedChild.setHandler("add handler server", async (instance, opts) => {
            instanceContainer.push(instance.server)
        })

        prefixedChild.setPostHandler("add post handler server", async (instance, opts) => {
            instanceContainer.push(instance.server)
        })

        await app.start()

        expect(instanceContainer[0]).not.toBeUndefined()
        expect(instanceContainer[1]).not.toBeUndefined()
        expect(instanceContainer[0]).toBe(instanceContainer[1])

    })

    it("Stuff in parent should be found in child, but not vice versa", async () => {
        const prefixedChild = new App()

        app.addApp('Prefixed Child', prefixedChild, { prefix: 'prefix' })

        prefixedChild.setInit('create child var', async (instance, opts) => {
            instance.server.childVar = 'childVar'
        })

        app.setHandler('create parent var', async (instance, opts) => {
            instance.server.parentVar = "parentVar"
            expect(instance.server.childVar).toBeUndefined()
        })

        prefixedChild.setHandler("check child var", async (instance, opts) => {
            expect(instance.server.parentVar).toBe("parentVar")
            expect(instance.server.childVar).toBe("childVar")
        })

        await app.start()
    })

    describe('Schema testing', () => {

        let prefixedChild

        const schema = {
            $id: 'schemaId',
            type: 'object',
            properties: {
                hello: { type: 'string' }
            }
        }

        const schema2 = {
            $id: 'schemaId2',
            type: 'object',
            properties: {
                hello: { type: 'string' }
            }
        }

        beforeEach(() => {
            prefixedChild = new App()

            app.addApp('Prefixed Child', prefixedChild, { prefix: 'prefix' })

            app.setPreHandler('create schema', async (instance, opts) => {
                instance.server.addSchema(schema)
            })
        })
        it("Schema in parent should be found in child", async () => {

            prefixedChild.setHandler('check schema', async (instance, opts) => {
                expect(instance.server.getSchema('schemaId')).toEqual(schema)
            })

            await app.start()
        })

        it("Manually registered plugins should have parent schemas", async () => {

            prefixedChild.setHandler('check schema in manual plugin', async (instance, opts) => {
                instance.server.register(async (server, opts) => {
                    expect(server.getSchema('schemaId')).toEqual(schema)
                })
            })


        })

        it("Plugins two levels deep should share schemas", async () => {
            const v1 = new App()
            const modelStub = new App()
            const routerStub = new App()

            app.addApp('v1', v1)
            v1.addApp('model', modelStub)
            modelStub.addApp('router', routerStub)

            const schema2 = {
                $id: 'schemaId2',
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }

            const combinedSchema = { schemaId: schema, schemaId2: schema2 }

            modelStub.setPreHandler('Add Create Schema', async (instance, opts) => {
                instance.server.addSchema(schema2)
            })

            modelStub.setHandler('Simulate Route Generation', async (instance, opts) => {
                expect(instance.server.getSchemas()).toEqual(combinedSchema)
            })

            await app.start()
        })

        it("Instance two levels deep should be the same", async () => {
            const v1 = new App()
            const modelStub = new App()
            const routerStub = new App()

            app.addApp('v1', v1)
            v1.addApp('model', modelStub)
            modelStub.addApp('router', routerStub)

            let preHandlerServer

            modelStub.setPreHandler('Add Create Schema', async (instance, opts) => {
                preHandlerServer = instance.server
            })

            modelStub.setHandler('Simulate Route Generation', async (instance, opts) => {
                expect(instance.server).toBe(preHandlerServer)
            })
        })

        //URGENT TODO: Move this test to common
        it("Manually registered plugins should load in the correct order", async () => {

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            let order = []

            app.setHandler("Test custom register", async (instance, opts) => {
                instance.server.register(async (server, opts) => {
                    server.register(async (server, opts) => {
                        server.register((server, opts, done) => {
                            setTimeout(() => {
                                //URGENT TODO: Figure out why the tests are ending before this is called
                                order.push(3)
                                done()
                            }, 100)
                        })
                        await sleep(200)
                        order.push(2)
                    })
                    await sleep(300)
                    order.push(1)
                })
            })
            await app.start()

            expect(order).toEqual([1, 2, 3])

        })

        //URGENT TODO: Move this test to common
        it("Manually registered plugins two levels deep should share schemas", async () => {

            const v1 = new App()
            const modelStub = new App()
            const routerStub = new App()

            app.addApp('v1', v1, { prefix: "v1" })
            v1.addApp('model', modelStub, { prefix: "model" })
            modelStub.addApp('router', routerStub)

            let preHandlerSchema

            v1.setPreHandler("Add v1 schema", async (instance, opts) => {
                instance.server.addSchema({
                    $id: 'v1Schema',
                    type: 'object',
                    properties: {
                        hello: { type: 'string' }
                    }
                })
            })

            modelStub.setPreHandler('Add Create Schema', async (instance, opts) => {
                instance.server.addSchema(schema2)
                preHandlerSchema = instance.server.getSchemas()
            })

            //URGENT TODO: Make important disclaimer regarding encapsulation vs fastify encapsulation
            //URGENT TODO: Make important Error message regarding encapsulation vs fastify encapsulation (override register function)
            v1.setHandler("Print some server instance to see difference", async (instance, opts) => {
                // console.dir(instance.server,{depth:4})
            })

            modelStub.setHandler('Simulate Route Generation', async (instance, opts) => {

                instance.server.register(async (server, opts) => {
                    expect(server.getSchemas()).toEqual(preHandlerSchema)

                    //Go big with double nested register
                    server.register(async (server, opts) => {
                        expect(server.getSchemas()).toEqual(preHandlerSchema)

                    })
                }, opts)

                instance.server.register((server, opts, done) => {
                    expect(server.getSchemas()).toEqual(preHandlerSchema)
                    done()
                })


            })

            await app.start()
        })
    })


})