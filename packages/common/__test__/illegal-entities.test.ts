import { EzBackend, EzBackendOpts, EzModel, RecursivePartial, Type } from "../src"
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";

import { EzError } from "@ezbackend/utils";

const defaultConfig: RecursivePartial<EzBackendOpts> = {
    ezbackend: {
        fastify: {
            logger: false
        },
        typeorm: {
            database: ':memory:'
        }
    }
}
describe("Illegal Entity Creation", () => {

    let app: EzBackend

    beforeAll(async () => {
        app = new EzBackend()
        app.removeHook("_run", "Run Fastify Server")

    })

    test("Creating a relation without the full syntax should be illegal", async () => {
        let errored = false

        try {
            app.addApp(new EzModel("IllegalModel", {
                relation: Type.ONE_TO_ONE
            }))
            await app.start(defaultConfig)

        } catch (e: unknown) {
            const err = e as EzError
            expect(err.summary).toMatchSnapshot()
            expect(err.description).toMatchSnapshot()
            expect(err.code).toMatchSnapshot()
            errored = true
        }

        expect(errored).toBe(true)
    })

    test("Creating Model with more than one primary column is illegal", async () => {
        let errored = false

        try {
            app.addApp(new EzModel("IllegalModel", {
                mySecondPrimaryColumn: {
                    type: Type.VARCHAR,
                    primary: true
                }
            }))
            await app.start(defaultConfig)

        } catch (e) {
            expect(e).toMatchSnapshot()
            errored = true
        }

        expect(errored).toBe(true)
    })

});
