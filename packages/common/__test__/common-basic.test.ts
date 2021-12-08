import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import ezb from "./test.index"

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
  enum: "type1",
  smallint: 12
};

//TODO: Test case for creating with ID
describe("Basic CRUD", () => {
  describe("Create", () => {
    test("Basic creation", async () => {
      const instance = ezb.getInternalInstance()

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
      const instance = ezb.getInternalInstance()
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
      const instance = ezb.getInternalInstance()
      const response = await instance._server.inject({
        method: "GET",
        url: "/Sample/1",
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleData);
      expect(JSON.parse(response.body)).toHaveProperty("id");
    });

    test("Basic read all", async () => {

      const response = await ezb.inject({
        method: "GET",
        url: "/Sample"
      })

      expect(response.statusCode).toEqual(200);
      const allRows = JSON.parse(response.body)
      expect(allRows[0]).toMatchObject(sampleData);
      expect(allRows[0]).toHaveProperty("id");
    })
    test("Basic 404", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const instance = ezb.getInternalInstance()
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
      const instance = ezb.getInternalInstance()
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
      const instance = ezb.getInternalInstance()
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
    test("Basic invalid input", async () => {
      //TODO: Think if it is good that it accepts coercable strings
      const instance = ezb.getInternalInstance()
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
      const instance = ezb.getInternalInstance()
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
      const instance = ezb.getInternalInstance()
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

  const sampleNullableInput = {
    varchar: "",
    int: 0,
    boolean: false
  }
  describe("Creation Edge Case", () => {
    test("Creating an object with nullish values should return the nullish values", async () => {
      const result = await ezb.inject({
        method: 'POST',
        url: '/SampleNullable',
        payload: sampleNullableInput
      })
      expect(JSON.parse(result.body)).toMatchObject(sampleNullableInput)
    })
    test("Creating a object with null values should return null values", async () => {
      const result = await ezb.inject({
        method: 'POST',
        url: '/SampleNullable',
        payload: {}
      })
      expect(JSON.parse(result.body)).not.toHaveProperty('varchar')
      expect(JSON.parse(result.body)).not.toHaveProperty('boolean')
      expect(JSON.parse(result.body)).not.toHaveProperty('int')
    })
  })

  describe("Typeorm Error Handling", () => {

    test("TypeORM errors should be returned verbosely when facing them", async () => {
      const payload = { idNumber: 1 }
      await ezb.inject({
        method: 'POST',
        url: '/SampleUnique',
        payload: payload
      })
      const result = await ezb.inject({
        method: 'POST',
        url: '/SampleUnique',
        payload: payload
      })
      expect(result.statusCode).toBe(400)
      expect(result.body).toMatchSnapshot()
    })
  })
})
