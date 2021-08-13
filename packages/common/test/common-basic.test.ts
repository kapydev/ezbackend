import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { EzRouter, EzBackend } from "../src";
import path from 'path'

beforeAll(async () => {
  await EzBackend.start(path.resolve(__dirname,'test.config.ts'));
});

afterAll(() => {
  const ezb = EzBackend.app() as EzBackend;
  ezb.server.close();
  ezb.sequelize.close();
});

const sampleData = {
  string: "My test string",
  int: 5,
  float: 0.5,
  double: 0.55,
  real: 0.555,
  enum: "three",
  date: "2021-08-11T15:36:56.078Z",
  uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  json: {
    hello: "world",
  },
};

describe("Basic CRUD", () => {
  describe("Create", () => {
    test("Basic creation", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
        method: "POST",
        url: "/sample",
        payload: sampleData,
      });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleData);
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
        url: "/sample/1",
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleData);
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
      const updatedData = { ...sampleData };
      updatedData.string = "This is a new string";
      const response = await ezb.server.inject({
        method: "PUT",
        url: "/sample/1",
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
        method: "PUT",
        url: "/sample/999999",
        payload: sampleData,
      });
      expect(response.statusCode).toEqual(404);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
    test("Basic invalid input", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const ezb = EzBackend.app() as EzBackend;
      const updatedData = { ...sampleData };
      //@ts-ignore
      updatedData.int = "This is a new string";
      const response = await ezb.server.inject({
        method: "PUT",
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
      const updatedData = { ...sampleData };
      updatedData.string = "This is a new string";
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
