import { ColumnType, EntityMetadata } from 'typeorm'
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';


/*
URGENT TODO:
We need the following 3 schemas to be made at the same time
1. Schema with no primary generated (createSchema)
2. Schema with primary generated columns (fullSchema)
3. Schema with required columns (updateSchema)
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




export function getSchemaName(meta: EntityMetadata | RelationMetadata, type: 'createSchema'|'updateSchema'|'fullSchema') {
  //@ts-ignore
  return `${type}-${meta.name}`
}

function getUpdateSchema(meta: EntityMetadata) {
  const nonGeneratedColumns = meta.columns.filter(col => !col.isGenerated);
  return Object.entries(nonGeneratedColumns).reduce(
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
      "$id": getSchemaName(meta,'updateSchema'),
      type: "object",
      properties: {},
    }
  );
}

function getCreateSchema(meta: EntityMetadata, updateSchema) {
  const requiredPropertyNames = meta.columns
    .filter(col => !col.isNullable && !col.isGenerated)
    .map(col => col.propertyName)
  return {
    ...updateSchema,
    required: requiredPropertyNames,
    "$id": getSchemaName(meta,'createSchema'),
  }

}

function getFullSchema(meta: EntityMetadata, createSchema) {
  const generatedColumns = meta.generatedColumns
  const fullSchema = Object.entries(generatedColumns).reduce(
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
    createSchema
  );
  fullSchema["$id"] = getSchemaName(meta,'fullSchema')
  return fullSchema
}

export function convert(meta: EntityMetadata) {
  const updateSchema = getUpdateSchema(meta)
  const createSchema = getCreateSchema(meta,updateSchema)
  const fullSchema = getFullSchema(meta, createSchema)
  return {createSchema,updateSchema,fullSchema}
}
