import { ColumnType, EntityMetadata } from 'typeorm'
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

export function getSchemaName(meta: EntityMetadata | RelationMetadata, type: 'createSchema' | 'updateSchema' | 'fullSchema') {
  if (meta instanceof RelationMetadata) {
    return `${type}-${meta.type['name'] ?? meta.type}`

  } else {
    return `${type}-${meta.name}`
  }

}

function colMetaToSchemaProps(colMeta: ColumnMetadata) {

  if (colMeta.relationMetadata) {
    return {
      "$ref": `${getSchemaName(colMeta.relationMetadata, 'createSchema')}#`,
    };
  } else {
    const type = colTypeToJsonSchemaType(colMeta.type)
    if (type === 'object') {
      //TODO: Consider if this is the best way of accepting additional properties for simple json, especially if the simple json needs to have a coerced data structure
      return {
        additionalProperties: true,
        type: "object"
      }
    }
    return {
      type: colTypeToJsonSchemaType(colMeta.type),
    };
  }
}


function colTypeToJsonSchemaType(colType: ColumnType | string | Function) {
  if (colType instanceof Function) {
    return colType.name.toLocaleLowerCase()
  } else {
    //URGENT TODO: Figure out if typeorm has a way of getting the js type from the sql type (Or extend the types below but thats kinda scary)
    switch (colType) {
      case "varchar":
        return 'string'
      case "simple-json":
        return 'object'
      case "integer":
        return 'number'
      case 'float':
        return 'number'
      case 'double':
        return 'number'
      case 'real':
        return 'number'
      case 'date':
        return 'string'
    }
  }
  throw `Unable to determine the Json Schema type for col type ${colType}`
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
      "$id": getSchemaName(meta, 'updateSchema'),
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
    "$id": getSchemaName(meta, 'createSchema'),
  }

}

function getFullSchema(meta: EntityMetadata) {
  const fullSchema = Object.entries(meta.columns).reduce(
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
      "$id": getSchemaName(meta, 'fullSchema'),
      type: "object",
      properties: {},
    }
  );
  return fullSchema
}

export function convert(meta: EntityMetadata) {
  const updateSchema = getUpdateSchema(meta)
  const createSchema = getCreateSchema(meta, updateSchema)
  const fullSchema = getFullSchema(meta)
  return { createSchema, updateSchema, fullSchema }
}
