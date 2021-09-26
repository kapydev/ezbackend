import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import ezb from "./test.index"
import { EzBackend } from "@ezbackend/common";

//TODO: Figure if there is a better way of getting this data
function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}



beforeAll(async () => {
  await ezb.start({
    port: 3000,
    server: {
    },
    orm: {
      type: "sqlite",
      database: ":memory:",
      synchronize: true
    }
  })
});

afterAll(async () => {
  const instance = getInternalInstance(ezb)
  await instance.orm.close();
  await instance._server.close();
});

const sampleData = {
  varchar: "My test string",
  int: 5,
  float: 0.5,
  double: 0.55,
  real: 0.555,
  date: "2021-08-11T15:36:56.078Z",
  json: {
    field1: "hello", field2: 1997
  },
};

//TODO: Test case for creating with ID
describe("Basic CRUD", () => {
  describe("Create", () => {
    test("Basic creation", async () => {
      const instance = getInternalInstance(ezb)

      //@ts-ignore
      const response = await instance._server.inject({
        method: "POST",
        url: "/Sample",
        payload: sampleData,
      });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleData);
      expect(JSON.parse(response.body)).toHaveProperty("id");
    });
    test("Basic invalid input", async () => {
      const instance = getInternalInstance(ezb)
      const input = {};
      const response = await instance._server.inject({
        method: "POST",
        url: "/Sample",
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
      const instance = getInternalInstance(ezb)
      const response = await instance._server.inject({
        method: "GET",
        url: "/Sample/1",
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleData);
      expect(JSON.parse(response.body)).toHaveProperty("id");
    });
    test("Basic 404", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const instance = getInternalInstance(ezb)
      const input = {};
      const expectedResponse = {
        statusCode: 404,
        error: "Not Found",
      };
      //@ts-ignore
      const response = await instance._server.inject({
        method: "GET",
        url: "/Sample/99999",
        payload: input,
      });
      expect(response.statusCode).toEqual(404);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
  });
  describe("Update", () => {
    test("Basic update", async () => {
      const instance = getInternalInstance(ezb)
      const updatedData = { ...sampleData };
      updatedData.varchar = "This is a new string";
      //@ts-ignore
      const response = await instance._server.inject({
        method: "PATCH",
        url: "/Sample/1",
        payload: updatedData,
      });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(updatedData);
      expect(JSON.parse(response.body)).toHaveProperty("id");
    });
    test("Basic 404", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const instance = getInternalInstance(ezb)
      const input = {};
      const expectedResponse = {
        statusCode: 404,
        error: "Not Found",
      };
      //@ts-ignore
      const response = await instance._server.inject({
        method: "PATCH",
        url: "/Sample/999999",
        payload: sampleData,
      });
      expect(response.statusCode).toEqual(404);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
    test.skip("Basic invalid input", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const instance = getInternalInstance(ezb)
      const updatedData = { ...sampleData };
      //@ts-ignore
      updatedData.int = "This is a new string";
      //@ts-ignore
      const response = await instance._server.inject({
        method: "PATCH",
        url: "/Sample/1",
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
      const instance = getInternalInstance(ezb)
      const updatedData = { ...sampleData };
      updatedData.varchar = "This is a new string";
      //@ts-ignore
      const response = await instance._server.inject({
        method: "DELETE",
        url: "/Sample/1",
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject({
        id: 1,
        success: true
      });
    });
    test("Basic 404", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const instance = getInternalInstance(ezb)
      const input = {};
      const expectedResponse = {
        statusCode: 404,
        error: "Not Found",
      };
      //@ts-ignore
      const response = await instance._server.inject({
        method: "DELETE",
        url: "/Sample/99999",
        payload: input,
      });
      expect(response.statusCode).toEqual(404);
      expect(JSON.parse(response.body)).toMatchObject(expectedResponse);
      expect(JSON.parse(response.body)).toHaveProperty("message");
    });
  });
});
