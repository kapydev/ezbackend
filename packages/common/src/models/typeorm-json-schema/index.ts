import {ColumnType, EntityMetadata} from 'typeorm'
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
      //@ts-ignore
      type: colMeta.type.name.toLocaleLowerCase(),
    };
  }
}


export function getSchemaName(meta: EntityMetadata |RelationMetadata) {
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
