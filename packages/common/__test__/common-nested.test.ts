import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import ezb from "./test.index"

//TODO: Make tests independent of each other

beforeAll(async () => {
  await ezb.start({
    port: 3000,
    server: {
      logger:false
    }
  })
});

afterAll(async () => {
  const instance = ezb.getInternalInstance()
  await instance.orm.close();
  await instance._server.close();
});

const sampleProgram = {
  name: "My first program",
  users: [
    {
      name: "Robert",
      detail: {
        age: 27
      }

    },
  ],
};

//TODO: Add test case for edge case where the person updates without the id or object of a nested child. When getting the json schema should resolve properly.
describe("Nested CRUD", () => {
  describe("Create", () => {
    test("Cascade creation", async () => {
      const instance = ezb.getInternalInstance()
      const response = await instance._server.inject({
        method: "POST",
        url: "/Program",
        payload: sampleProgram,
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleProgram);
      expect(JSON.parse(response.body)).toHaveProperty("id");
    })

    test("No cascade creation", async () => {
      const instance = ezb.getInternalInstance()
      const response = await instance._server.inject({
        method: "POST",
        url: "/NoCascadeProgram",
        payload: sampleProgram,
      });
      //NOTE: The current implementation does not throw an error when additional fields are specified, they are just ignored
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject({ name: "My first program" });
      expect(JSON.parse(response.body)).toHaveProperty("id");
    })
  });
  describe("Read", () => {
    test("Eager Loading", async () => {
      const instance = ezb.getInternalInstance()
      const response = await instance._server.inject({
        method: "GET",
        url: "/Program/1",
      });

      expect(response.statusCode).toEqual(200);

      expect(JSON.parse(response.body)).toMatchObject(sampleProgram);
      expect(JSON.parse(response.body)).toHaveProperty("id");
    })

    test("Lazy Loading", async () => {
      const instance = ezb.getInternalInstance()
      const response = await instance._server.inject({
        method: "GET",
        url: "/NoCascadeProgram/1",
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject({ name: "My first program" });
      expect(JSON.parse(response.body)).toHaveProperty("id");
    })

  });

  describe("Update", () => {
    test("Cascade Update", async () => {
      const instance = ezb.getInternalInstance()
      const response = await instance._server.inject({
        method: "PATCH",
        url: "/Program/1",
        payload: {
          name: "My first program",
          users: [
            {
              name: "Thomas",
            },
            {
              name: "Holly",
            },
          ],
        }
      });

      expect(response.statusCode).toEqual(200);

      expect(JSON.parse(response.body)).toMatchObject({
        name: "My first program",
        users: [
          {
            name: "Thomas",
          },
          {
            name: "Holly",
          },
        ],
      });
      expect(JSON.parse(response.body)).toHaveProperty("id");
    })

    describe("Foreign Key ID", () => {
      test("Create with Foreign Key ID", async () => {
        const instance = ezb.getInternalInstance()

        const response = await instance._server.inject({
          method: "POST",
          url: "/NoCascadeUser",
          payload: {
            name: "Willip Pee",
            programId: 1
          }
        });

        expect(response.statusCode).toEqual(200);

        expect(JSON.parse(response.body)).toMatchObject({
          name: "Willip Pee",
          programId: 1
        });
        expect(JSON.parse(response.body)).toHaveProperty("id");
      })

      test("Update with Foreign Key ID", async () => {
        const instance = ezb.getInternalInstance()

        //Add a second NoCascadeProgram so that we can change the programId to 2
        await instance._server.inject({
          method: "POST",
          url: "/NoCascadeProgram",
          payload: sampleProgram,
        });

        const response = await instance._server.inject({
          method: "PATCH",
          url: "/NoCascadeUser/1",
          payload: {
            programId: 2
          }
        });

        expect(response.statusCode).toEqual(200);

        expect(JSON.parse(response.body)).toMatchObject({
          programId: 2
        });
        expect(JSON.parse(response.body)).toHaveProperty("id");
      })
      test("Get entity with just foreign key IDs", async () => {
        const instance = ezb.getInternalInstance()

        const response = await instance._server.inject({
          method: "GET",
          url: "/NoCascadeUser/1"
        });

        expect(response.statusCode).toEqual(200);

        expect(JSON.parse(response.body)).toMatchObject({
          name: "Willip Pee",
          programId: 2
        });
        expect(JSON.parse(response.body)).toHaveProperty("id");
      })

    })
  })

  describe("Delete", () => {
    test.todo("Cascade Delete")
  })

  describe("Auto ID Column Generation", () => {
    test.todo("For all relations, the id column should automatically expose")
  })

  test.todo("All relations should throw verbose errors when not all the required keys are set")

  test.todo("For all relations you should be able to specify the relation with the other object with the object instead of typing out inverseSide, etc")

});
