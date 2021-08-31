import { ColumnType, EntityMetadata } from 'typeorm'
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

//URGENT TODO: See if there is a json schema library that can help with this... (fluent schema?)

export function getSchemaName(meta: EntityMetadata | RelationMetadata, type: 'createSchema' | 'updateSchema' | 'fullSchema') {
  if (meta instanceof RelationMetadata) {
    return `${type}-${meta.type['name'] ?? meta.type}`

  } else {
    return `${type}-${meta.name}`
  }

}

function colMetaToSchemaProps(colMeta: ColumnMetadata) {
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





//TODO: Combine schemas if possible
function getUpdateSchema(meta: EntityMetadata) {

  const nonGeneratedColumns = meta.columns.filter(col => !col.isGenerated);
  let updateSchema = Object.entries(nonGeneratedColumns)
    .filter(([key, val]) => !val.relationMetadata)
    .reduce(
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
  //Add cascade update columns
  const eagerMeta = getNestedMetadata(meta, 'update')
  updateSchema = eagerMeta
    .reduce(
      (jsonSchema, meta) => {
        const nestedSchema = removeId(getUpdateSchema(meta.data))

        return {
          $id: jsonSchema.$id,
          type: jsonSchema.type,
          properties: {
            ...jsonSchema.properties,
            //URGENT TODO: Make this work with ref schemas PLEASE
            [meta.propertyName]: meta.isMany ? makeArray(nestedSchema) : nestedSchema,
          },
        };
      },
      updateSchema
    );
  return updateSchema
}

function getCreateSchema(meta: EntityMetadata) {
  const nonGeneratedColumns = meta.columns.filter(col => !col.isGenerated);
  let createSchema = Object.entries(nonGeneratedColumns)
    .filter(([key, val]) => !val.relationMetadata)
    .reduce(
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
        "$id": getSchemaName(meta, 'createSchema'),
        type: "object",
        properties: {},
      }
    );
  //Add cascade created columns
  const eagerMeta = getNestedMetadata(meta, 'create')
  createSchema = eagerMeta
    .reduce(
      (jsonSchema, meta) => {
        const nestedSchema = removeId(getCreateSchema(meta.data))
        if (meta.data.tableName == 'user') {
          
        }
        return {
          $id: jsonSchema.$id,
          type: jsonSchema.type,
          properties: {
            ...jsonSchema.properties,
            //URGENT TODO: Make this work with ref schemas PLEASE
            [meta.propertyName]: meta.isMany ? makeArray(nestedSchema) : nestedSchema,
          },
        };
      },
      createSchema
    );

  const requiredPropertyNames = meta.columns
    .filter(col => !col.isNullable && !col.isGenerated)
    .map(col => col.propertyName)
  createSchema['required'] = requiredPropertyNames
  return createSchema

}

function makeArray(schema: any) {
  return {
    type: "array",
    items: schema
  }
}

function getFullSchema(meta: EntityMetadata) {
  let fullSchema = Object.entries(meta.columns)
    //Remove all relations
    .filter(([key, val]) => !val.relationMetadata)
    .reduce(
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
  //Add eagerly loaded columns
  const eagerMeta = getNestedMetadata(meta, 'read')

  fullSchema = eagerMeta
    .reduce(
      (jsonSchema, meta) => {
        const nestedSchema = removeId(getFullSchema(meta.data))
        return {
          $id: jsonSchema.$id,
          type: jsonSchema.type,
          properties: {
            ...jsonSchema.properties,
            //URGENT TODO: Make this work with ref schemas PLEASE
            [meta.propertyName]: meta.isMany ? makeArray(nestedSchema) : nestedSchema,
          },
        };
      },
      fullSchema
    );

  return fullSchema
}

function removeId(object) {
  delete object['$id']
  return object
}

function getNestedMetadata(meta: EntityMetadata, type: 'create' | 'update' | 'read') {
  return meta.relations.filter(relation => {
    switch (type) {
      case 'create':
        return relation.isCascadeInsert
      case 'update':
        return relation.isCascadeUpdate
      case 'read':
        return relation.isEager
    }
  }
  ).map(relation => {
    return {
      data: relation.inverseEntityMetadata,
      isMany: relation.isManyToMany || relation.isOneToMany,
      propertyName: relation.propertyName
    }
  })
}

export function convert(meta: EntityMetadata) {
  const updateSchema = getUpdateSchema(meta)
  const createSchema = getCreateSchema(meta)
  const fullSchema = getFullSchema(meta)
  return { createSchema, updateSchema, fullSchema }
}
