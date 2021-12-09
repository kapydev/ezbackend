import { convert } from "../src";
import { EntitySchema, createConnection, Connection } from "typeorm";
import Ajv from "ajv";

describe("TypeORM to JSON Schema", () => {
  let CategoryEntity: EntitySchema;
  let connection: Connection;

  beforeAll(async () => {
    CategoryEntity = new EntitySchema({
      name: "category",
      columns: {
        id: {
          type: Number,
          primary: true,
          generated: true,
        },
        name: {
          type: String,
        },
      },
    });

    connection = await createConnection({
      type: "better-sqlite3",
      database: ":memory:",
      synchronize: true,
      entities: [CategoryEntity],
    });
  });
  it("Convert should create valid json schemas from Entity Metadata", () => {
    const entityMeta = connection.getMetadata(CategoryEntity);
    const { updateSchema, createSchema, fullSchema } = convert(entityMeta);

    const ajv = new Ajv();

    expect(ajv.validateSchema(updateSchema)).toBe(true);
    expect(ajv.validateSchema(createSchema)).toBe(true);
    expect(ajv.validateSchema(fullSchema)).toBe(true);
  });
});
