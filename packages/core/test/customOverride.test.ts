import { describe, it, expect } from "@jest/globals";
import { App } from "../src";
import fastify from 'fastify'
import override from 'fastify/lib/pluginOverride'
import { kRoutePrefix } from 'fastify/lib/symbols'

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
    app.setCustomOverride("server", override)
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

        it("Manually registered plugins two levels deep should share schemas", async () => {

            const v1 = new App()
            const modelStub = new App()
            const routerStub = new App()

            app.addApp('v1', v1)
            v1.addApp('model', modelStub)
            modelStub.addApp('router', routerStub)

            let preHandlerSchema
            
            v1.setPreHandler("Add v1 schema", async (instance,opts) => {
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

            modelStub.setHandler('Simulate Route Generation', async (instance, opts) => {
                expect(instance.server.getSchemas()).toEqual(preHandlerSchema)
                instance.server.register(async (server, opts) => {
                    //It has schema1 but not schema2... So where is that added?
                    //schema 1 is added in app...
                    //What is I add a schema in v1?
                    //The v1 schema DOES NOT get loaded as well... Is it only getting schemas from root?
                    //Seems like an app only schema gets loaded, perhaps when register is called, the encapsulation is not properly done, so it inherits from the parent?
                    //Can we fix this by manually running register, then returning the instance from inside?
                    console.log(server.getSchemas())
                    expect(server.getSchemas()).toEqual(preHandlerSchema)
                })
            })

            await app.start()

            console.log(app.instance.prettyPrint())
        })
    })


})