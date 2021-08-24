import {EntityMetadata} from 'typeorm'
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";


function colMetaToSchemaProps(colMeta: ColumnMetadata) {
  if (colMeta.relationMetadata) {
    return {
      //@ts-ignore
      "#ref": colMeta.relationMetadata.type.name.toLocaleLowerCase(),
    };
  } else {
    return {
      //@ts-ignore
      type: colMeta.type.name.toLocaleLowerCase(),
    };
  }
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
      "$id": meta.name,
      type: "object",
      properties: {},
    }
  );
}
