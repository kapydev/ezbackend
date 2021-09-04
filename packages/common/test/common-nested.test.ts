import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { EzBackend } from "@ezbackend/core";
import path from "path";
import "../src"

//TODO: Make tests independent of each other

beforeAll(async () => {
  const ezb = EzBackend.app()
  ezb.plugins.run = (ezb, opts, cb) => { cb() }
  await EzBackend.start(path.resolve(__dirname, "test.config.ts"));
});

afterAll(() => {
  const ezb = EzBackend.app();
  ezb.server.close();
  ezb.orm.close()
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

describe("Nested CRUD", () => {
  describe("Create", () => {
    test("Cascade creation", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
        method: "POST",
        url: "/Program",
        payload: sampleProgram,
      });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toMatchObject(sampleProgram);
      expect(JSON.parse(response.body)).toHaveProperty("id");
    })

    test("No cascade creation", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
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
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
        method: "GET",
        url: "/Program/1",
      });

      expect(response.statusCode).toEqual(200);

      expect(JSON.parse(response.body)).toMatchObject(sampleProgram);
      expect(JSON.parse(response.body)).toHaveProperty("id");
    })

    test("Lazy Loading", async () => {
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
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
      const ezb = EzBackend.app() as EzBackend;
      const response = await ezb.server.inject({
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
        const ezb = EzBackend.app() as EzBackend;
        
        const response = await ezb.server.inject({
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
        const ezb = EzBackend.app() as EzBackend;

        //Add a second NoCascadeProgram so that we can change the programId to 2
        await ezb.server.inject({
          method: "POST",
          url: "/NoCascadeProgram",
          payload: sampleProgram,
        });
        
        const response = await ezb.server.inject({
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
        const ezb = EzBackend.app() as EzBackend;
        
        const response = await ezb.server.inject({
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
    test("Cascade Delete", async () => {

    })
  })

});
