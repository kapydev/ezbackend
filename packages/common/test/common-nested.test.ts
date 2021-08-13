import { cloneDeep } from "lodash";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { EzBackend } from "../src";
import path from "path";

beforeAll(async () => {
  await EzBackend.start(path.resolve(__dirname, "test.config.ts"));
});

afterAll(() => {
  const ezb = EzBackend.app() as EzBackend;
  ezb.server.close();
  ezb.sequelize.close();
});

const sampleUser = {
  name: "Robert",
  detail: {
    age: 20,
  },
};

describe("Nested CRUD", () => {
  describe("Create", () => {
    test("Nested creation", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
        method: "POST",
        url: "/user",
        payload: sampleUser,
      });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleUser);
      expect(JSON.parse(response.body)).toHaveProperty("createdAt");
      expect(JSON.parse(response.body)).toHaveProperty("id");
      expect(JSON.parse(response.body)).toHaveProperty("updatedAt");
    });
    test("Basic invalid input", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const ezb = EzBackend.app() as EzBackend;
      const input = {};
      const response = await ezb.server.inject({
        method: "POST",
        url: "/sample",
        payload: input,
      });
      const expectedResponse = {
        statusCode: 400,
        error: "Bad Request",
      };
      expect(response.statusCode).toEqual(400);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
  });
  describe("Read", () => {
    test("Basic read", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
        method: "GET",
        url: "/user/1",
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleUser);
      expect(JSON.parse(response.body)).toHaveProperty("createdAt");
      expect(JSON.parse(response.body)).toHaveProperty("id");
      expect(JSON.parse(response.body)).toHaveProperty("updatedAt");
    });
    test("Basic 404", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const ezb = EzBackend.app() as EzBackend;
      const input = {};
      const expectedResponse = {
        statusCode: 404,
        error: "Not found",
      };
      const response = await ezb.server.inject({
        method: "GET",
        url: "/sample/99999",
        payload: input,
      });
      expect(response.statusCode).toEqual(404);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
  });
  describe("Update", () => {
    test("Basic update", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const updatedData = cloneDeep(sampleUser);
      updatedData.detail.age = 25;
      const response = await ezb.server.inject({
        method: "PATCH",
        url: "/user/1",
        payload: updatedData,
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(updatedData);
      expect(JSON.parse(response.body)).toHaveProperty("createdAt");
      expect(JSON.parse(response.body)).toHaveProperty("id");
      expect(JSON.parse(response.body)).toHaveProperty("updatedAt");
    });
    test("Basic 404", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const ezb = EzBackend.app() as EzBackend;
      const input = {};
      const expectedResponse = {
        statusCode: 404,
        error: "Not found",
      };
      const response = await ezb.server.inject({
        method: "PATCH",
        url: "/sample/999999",
        payload: sampleUser,
      });
      expect(response.statusCode).toEqual(404);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
    test("Basic invalid input", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const ezb = EzBackend.app() as EzBackend;
      const updatedData = cloneDeep(sampleUser);
      //@ts-ignore
      updatedData.detail.age = "This is a new string";
      const response = await ezb.server.inject({
        method: "PATCH",
        url: "/sample/1",
        payload: updatedData,
      });
      const expectedResponse = {
        statusCode: 400,
        error: "Bad Request",
      };
      expect(response.statusCode).toEqual(400);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
  });
  describe("Delete", () => {
    test("Basic delete", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const updatedData = cloneDeep(sampleUser);
      updatedData.detail.age = 25;
      const response = await ezb.server.inject({
        method: "DELETE",
        url: "/sample/1",
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(updatedData);
      expect(JSON.parse(response.body)).toHaveProperty("createdAt");
      expect(JSON.parse(response.body)).toHaveProperty("id");
      expect(JSON.parse(response.body)).toHaveProperty("updatedAt");
    });
    test("Basic 404", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const ezb = EzBackend.app() as EzBackend;
      const input = {};
      const expectedResponse = {
        statusCode: 404,
        error: "Not found",
      };
      const response = await ezb.server.inject({
        method: "DELETE",
        url: "/sample/99999",
        payload: input,
      });
      expect(response.statusCode).toEqual(404);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
  });
});
