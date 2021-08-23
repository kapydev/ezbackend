import { cloneDeep } from "lodash";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { EzBackend } from "../src";
import path from "path";

beforeAll(async () => {
  const ezb = EzBackend.app()
  ezb.plugins.run = async (ezb, opts, cb) => {
    //@ts-ignore
    await ezb.sequelize.sync();
    cb();
  };
  await EzBackend.start(path.resolve(__dirname, "test.config.ts"));
});

afterAll(() => {
  const ezb = EzBackend.app() as EzBackend;
  ezb.server.close();
  ezb.sequelize.close();
});

const sampleProgram = {
  name: "My first program",
  users: [
    {
      name: "Robert",
      detail: {
        age: 20,
      },
    },
  ],
};

describe("Nested CRUD", () => {
  describe("Create", () => {
    test("Nested creation", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
        method: "POST",
        url: "/program",
        payload: sampleProgram,
      });
      
      expect(response.statusCode).toEqual(200);

      expect(JSON.parse(response.body)).toMatchObject(sampleProgram);
      expect(JSON.parse(response.body)).toHaveProperty("createdAt");
      expect(JSON.parse(response.body)).toHaveProperty("id");
      expect(JSON.parse(response.body)).toHaveProperty("updatedAt");
    })
  });
  describe("Read", () => {
    test("Basic read", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
        method: "GET",
        url: "/program/1",
      });

      expect(response.statusCode).toEqual(200);

      expect(JSON.parse(response.body)).toMatchObject({"gaddz":"bdaz"});
      expect(JSON.parse(response.body)).toHaveProperty("createdAt");
      expect(JSON.parse(response.body)).toHaveProperty("id");
      expect(JSON.parse(response.body)).toHaveProperty("updatedAt");
    })
  });
});
