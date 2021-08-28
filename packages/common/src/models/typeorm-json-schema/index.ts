import { ColumnType, EntityMetadata } from 'typeorm'
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';


/*
URGENT TODO:
We need the following 3 schemas to be made at the same time
1. Schema with no primary generated
2. Schema with primary generated columns
3. Schema with required columns
*/

function colMetaToSchemaProps(colMeta: ColumnMetadata) {
  if (colMeta.relationMetadata) {
    return {
      //@ts-ignore
      "$ref": `${getSchemaName(colMeta.relationMetadata.type)}#`,
    };
  } else {
    return {
      type: colTypeToJsonSchemaType(colMeta.type),
    };
  }
}

function colTypeToJsonSchemaType(colType: ColumnType) {
  if (colType instanceof Function) {
    return colType.name.toLocaleLowerCase()
  } else {
    //URGENT TODO: Figure out if typeorm has a way of getting the js type from the sql type
    switch (colType) {
      case "varchar":
        return 'string'
      case "simple-json":
        return 'string'
    }
  }
  throw `Unable to determine the Json Schema type for col type ${colType}`
}


export function getSchemaName(meta: EntityMetadata | RelationMetadata) {
  //@ts-ignore
  return meta.name
}

export function convert(meta: EntityMetadata) {
  const columns = meta.columns;
  return Object.entries(columns).reduce(
    (jsonSchema, [key, value]) => {
      return {
        $id: jsonSchema.$id,
        type: jsonSchema.type,
        properties: {
          ...jsonSchema.properties,
          [value.propertyName]: colMetaToSchemaProps(value),
        },
      };
    },
    {
      "$id": getSchemaName(meta),
      type: "object",
      properties: {},
    }
  );
}
