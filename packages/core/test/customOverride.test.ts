import { describe, it, expect } from "@jest/globals";
import { App } from "../src";
import fastify from 'fastify'
import override from 'fastify/lib/pluginOverride'
import { kRoutePrefix } from 'fastify/lib/symbols'

let app

beforeEach(() => {
    app = new App()

    app.setInit('add fastify instance', async (instance, opts) => {
        instance.server = fastify()
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
        let schema

        beforeEach(() => {
            prefixedChild = new App()

            app.addApp('Prefixed Child', prefixedChild, { prefix: 'prefix' })

            schema = {
                $id: 'schemaId',
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }

            app.setHandler('create schema', async (instance, opts) => {
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
            const prefixedChild = new App()

            app.addApp('Prefixed Child', prefixedChild, { prefix: 'prefix' })

            prefixedChild.setHandler('check schema in manual plugin', async (instance, opts) => {
                instance.server.register(async(server,opts) => {
                    expect(server.getSchema('schemaId')).toEqual(schema)
                })
            })


        })
    })


})