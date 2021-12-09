import { EzBackend, EzModel, Type } from "@ezbackend/common";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";

import { EzDbUI } from "../src";
import { EzOpenAPI } from "@ezbackend/openapi";

let app: EzBackend;

beforeEach(async () => {
  app = new EzBackend();

  // ---Plugins---
  app.addApp(new EzOpenAPI());
  app.addApp(new EzDbUI());
  // ---Plugins---

  const userDetails = new EzModel("UserDetails", {
    company: Type.VARCHAR,
    age: Type.INT,
    score: Type.FLOAT,
  });

  const session = new EzModel("Session", {
    name: Type.VARCHAR,
    users: {
      type: Type.ONE_TO_MANY,
      target: "User",
      inverseSide: "session",
      eager: true,
    },
  });

  const user = new EzModel("User", {
    name: Type.VARCHAR,
    age: Type.INT,
    userDetails: {
      type: Type.ONE_TO_ONE,
      joinColumn: true,
      cascade: true,
      eager: true,
      target: "UserDetails",
    },
    session: {
      type: Type.MANY_TO_ONE,
      target: "Session",
      inverseSide: "users",
    },
  });

  app.addApp("User", user, { prefix: "user" });
  app.addApp("Session", session, { prefix: "session" });
  app.addApp("UserDetails", userDetails, { prefix: "user-details" });

  app.removeHook("_run", "Run Fastify Server");

  await app.start({
    backend: {
      fastify: {
        logger: false,
      },
      typeorm: {
        database: ":memory:",
      },
    },
  });
  // run the internal fastify boot sequence
  await app.inject({
    method: "GET",
    url: "/",
  });
});

afterEach(async () => {
  const instance = app.getInternalInstance();
  await instance.orm.close();
  await instance._server.close();
});

describe("DB UI Endpoints", () => {
    it("Should run even with nested instances", async () => {
    })
    it("Should generate the OpenAPI spec at /docs/json", async () => {

        const result = await app.inject({
            method: "GET",
            url: "/docs/json"
        })

        expect(result.statusCode).toBe(200)
    })

    //TODO: Figure out why this runs differently on github actions
    it.skip("Should render the DB-UI", async () => {

        const result = await app.inject({
            method: "GET",
            url: "/db-ui/"
        })

        expect(result.statusCode).toBe(200)
    })

    it("Should redirect to DB-UI when visiting an extended path", async() => {

        const extendedPath = await app.inject({
            method: "GET",
            url: "/db-ui/api-documentation"
        })

        expect(extendedPath.statusCode).toBe(302)
        // expect(extendedPath.body).toMatch(dbUIpath.body)
        expect(extendedPath.headers.location).toBe('/db-ui')
    })

    it.todo("Should be able to obtain values from db-ui endpoints even with EzRules enabled")
    it.todo("Should open to the same page when refreshed, instead of going back to DB-UI (This removes the need for redirecting)")

    it.todo("Should throw an error if the OpenAPI plugin is not installed")

})
