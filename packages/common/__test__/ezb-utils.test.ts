import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";

import { EzBackend } from '../src'
import ezb from "./test.index"

describe("Test Utils", () => {

    it("Should throw an error if the instance has not started and you try to use printRoutes, printPlugins or prettyPrint", async () => {

        const app = new EzBackend()

        const errored = {
            printRoutes: false,
            printPlugins: false,
            prettyPrint: false
        }
        try {
            app.printRoutes()
        } catch (e) {
            errored.printRoutes = true
        }
        try {
            app.printPlugins()
        } catch (e) {
            errored.printPlugins = true
        }
        try {
            app.prettyPrint()
        } catch (e) {
            errored.prettyPrint = true
        }
        expect(errored).toEqual({
            printRoutes: true,
            printPlugins: true,
            prettyPrint: true
        })
    })

    describe("Functionality test", () => {
        beforeAll(async () => {
            await ezb.start({
                port: 3000,
                backend: {
                    fastify: {
                        logger: false
                    },
                    typeorm: {
                        database: ':memory:'
                    }
                }
            })


        });

        afterAll(async () => {
            const instance = ezb.getInternalInstance()
            await instance.orm.close();
            await instance._server.close();
        });

        it("Should be able to print routes", async () => {

            //Injection to initialize fastify to view the routes
            await ezb.inject({
                method: "GET",
                url: "/"
            })

            expect(ezb.printRoutes()).toMatchSnapshot()
        })

        it("Should be able to print all fastify plugins nicely", async () => {

            //Injection to initialize fastify to view the routes
            await ezb.inject({
                method: "GET",
                url: "/"
            })

            const fastifyPluginsWithoutLoadTimings = ezb.printPlugins().replace(/\d+ ms/gm, "")

            expect(fastifyPluginsWithoutLoadTimings).toMatchSnapshot()
        })

        it("Should be able to print the plugin tree for debugging", async () => {
            //Injection to initialize fastify to view the routes
            await ezb.inject({
                method: "GET",
                url: "/"
            })
            //TODO: Make it able to easily obtain the plugin names
            const pluginsWithoutLoadTimings = ezb.prettyPrint().replace(/\d+ ms/gm, "")

            expect(pluginsWithoutLoadTimings).toMatchSnapshot()

        })

    })


})