import { ColumnType, EntityMetadata } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export function colTypeToJsonSchemaType(colType: ColumnType | string | Function) {
  if (colType instanceof Function) {
    return colType.name.toLocaleLowerCase();
  } else {
    // URGENT TODO: Figure out if typeorm has a way of getting the js type from the sql type (Or extend the types below but thats kinda scary)
    switch (colType) {
      case 'varchar':
        return 'string';
      case 'simple-json':
        return 'object';
      case 'integer':
        return 'number';
      case 'float':
        return 'number';
      case 'double':
        return 'number';
      case 'real':
        return 'number';
      case 'date':
        return 'string';
      case 'boolean':
        return 'boolean';
      case 'simple-enum':
        return 'string';
    }
  }
  // If we don't know the type, return any possible json schema type
  return ['number', 'string', 'boolean', 'object', 'array', 'null'];
}


export function generateSchemaName(
  name: string,
  type: 'createSchema' | 'updateSchema' | 'fullSchema' | 'formCreateSchema' | 'formUpdateSchema',
  prefix?: string,
) {
  // Uncomment this to support getting schema name for relation metadata
  // let baseName
  // if (meta instanceof RelationMetadata) {

  //   if (typeof meta.type === 'string') {
  //     baseName = meta.type
  //   } else {
  //     baseName = meta.type['name']
  //   }

  // } else {
  //   baseName = meta.name
  // }
  const baseName = name;
  const resolvedPrefix = prefix ? prefix + '/' : '';
  const schemaName = `${resolvedPrefix}${type}-${baseName}`;
  return schemaName;
}
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * EVERYTHING BELOW IS DEPRECATED, FUNCTIONALITY HAS BEEN MOVED TO EZREPO
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// TODO: See if there is a json schema library that can help with this... (fluent schema?)
/**
 * @deprecated Use Generate Schema Name instead and pass in the name yourself instead of the EntityMetadata
 */
 export function getSchemaName(
  meta: EntityMetadata,
  type: 'createSchema' | 'updateSchema' | 'fullSchema',
  prefix?: string,
) {
  return generateSchemaName(meta.name,type,prefix)
}

/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 */
function colMetaToSchemaProps(colMeta: ColumnMetadata) {
  const type = colTypeToJsonSchemaType(colMeta.type);
  if (type === 'object') {
    // TODO: Consider if this is the best way of accepting additional properties for simple json, especially if the simple json needs to have a coerced data structure
    return {
      additionalProperties: true,
      type: 'object',
    };
  }
  return {
    type: colTypeToJsonSchemaType(colMeta.type),
  };
}




// NOTE: This relation col basically means that the column is a true relation, like program => <Object>
// Not applicable to programId => <Number>
/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 */
function isRelationCol(col: ColumnMetadata) {
  // URGENT TODO: Confirm there are no edge cases for property names not ending in Id
  if (col.propertyName.endsWith('Id')) {
    return false;
  }
  if (col.relationMetadata) {
    return true;
  }
  return false;
}


/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 */
function checkColIsGenerated(col: ColumnMetadata) {
  return (
    col.isGenerated || col.isCreateDate || col.isUpdateDate || col.isDeleteDate
  );
}

// TODO: Combine schemas if possible
/**
 * Retrives JSON Schema for PATCH requests for given metadata and prefix
 * @param meta
 * @param prefix
 * @returns
 */
/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 */
export function getUpdateSchema(meta: EntityMetadata, prefix?: string) {
  const nonGeneratedColumns = meta.columns.filter(
    (col) => !checkColIsGenerated(col),
  );
  let updateSchema = Object.entries(nonGeneratedColumns)
    .filter(([key, val]) => !isRelationCol(val))
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
        $id: generateSchemaName(meta.name, 'updateSchema', prefix),
        type: 'object',
        properties: {},
      },
    );
  // Add cascade update columns
  const eagerMeta = getNestedMetadata(meta, 'update');
  updateSchema = eagerMeta.reduce((jsonSchema, meta) => {
    const nestedSchema = removeId(getUpdateSchema(meta.data));

    return {
      $id: jsonSchema.$id,
      type: jsonSchema.type,
      properties: {
        ...jsonSchema.properties,
        // TODO: Make this work with ref schemas PLEASE
        [meta.propertyName]: meta.isMany
          ? makeArray(nestedSchema)
          : nestedSchema,
      },
    };
  }, updateSchema);
  return updateSchema;
}

/**
 *  Retrives JSON Schema for POST requests for given metadata and prefix
 * @param meta
 * @param prefix
 * @returns
 */
/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 */
export function getCreateSchema(meta: EntityMetadata, prefix?: string) {
  const nonGeneratedColumns = meta.columns.filter(
    (col) => !checkColIsGenerated(col),
  );

  let createSchema = Object.entries(nonGeneratedColumns)
    .filter(([key, val]) => !isRelationCol(val))
    .reduce(
      (jsonSchema, [key, value]) => {
        return {
          $id: jsonSchema.$id,
          type: jsonSchema.type,
          properties: {
            ...jsonSchema.properties,
            [value.propertyName]: colMetaToSchemaProps(value),
          },
          required: jsonSchema.required,
        };
      },
      {
        $id: generateSchemaName(meta.name, 'createSchema', prefix),
        type: 'object',
        properties: {},
        required: [] as Array<string>,
      },
    );
  // Add cascade created columns
  const eagerMeta = getNestedMetadata(meta, 'create');
  createSchema = eagerMeta.reduce((jsonSchema, meta) => {
    const nestedSchema = removeId(getCreateSchema(meta.data));
    return {
      $id: jsonSchema.$id,
      type: jsonSchema.type,
      properties: {
        ...jsonSchema.properties,
        // TODO: Make this work with ref schemas PLEASE
        [meta.propertyName]: meta.isMany
          ? makeArray(nestedSchema)
          : nestedSchema,
      },
      required: jsonSchema.required,
    };
  }, createSchema);

  const requiredPropertyNames = meta.columns
    .filter((col) => {
      return !col.isNullable && !col.isGenerated && col.default === undefined;
    })
    .map((col) => col.propertyName);

  createSchema.required = requiredPropertyNames;

  return createSchema;
}

/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 */
function makeArray(schema: any) {
  return {
    type: 'array',
    items: schema,
  };
}

/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 * Retrives full JSON Schema for PATCH requests for given metadata and prefix.
 * Note: This also the schema used for the database ui.
 * @param meta
 * @param prefix
 * @returns
 */
export function getFullSchema(meta: EntityMetadata, prefix?: string) {
  let fullSchema = Object.entries(meta.columns)
    // Remove all relations
    .filter(([key, val]) => !isRelationCol(val))
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
        $id: generateSchemaName(meta.name, 'fullSchema', prefix),
        type: 'object',
        properties: {},
      },
    );
  // Add eagerly loaded columns
  const eagerMeta = getNestedMetadata(meta, 'read');
  fullSchema = eagerMeta.reduce((jsonSchema, meta) => {
    const nestedSchema = removeId(getFullSchema(meta.data));
    return {
      $id: jsonSchema.$id,
      type: jsonSchema.type,
      properties: {
        ...jsonSchema.properties,
        // TODO: Make this work with ref schemas PLEASE
        [meta.propertyName]: meta.isMany
          ? makeArray(nestedSchema)
          : nestedSchema,
      },
    };
  }, fullSchema);


  return fullSchema;
}

// TODO: See if there is a way to not use any and instead ensure the obejct has '$id'
/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 */
function removeId(object: any) {
  delete object.$id;
  return object;
}

/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 */
function getNestedMetadata(
  meta: EntityMetadata,
  type: 'create' | 'update' | 'read',
) {
  return (
    meta.relations
      // eslint-disable-next-line array-callback-return
      .filter((relation) => {
        switch (type) {
          case 'create':
            return relation.isCascadeInsert;
          case 'update':
            return relation.isCascadeUpdate;
          case 'read':
            return relation.isEager;
        }
      })
      .map((relation) => {
        return {
          data: relation.inverseEntityMetadata,
          isMany: relation.isManyToMany || relation.isOneToMany,
          propertyName: relation.propertyName,
        };
      })
  );
}

/**
 * @deprecated Functionality has been shifted directly to EzRepo to reduce coupling with typeorm
 * Top-level function to convert {@link EntityMetaData} from typeOrm to {@link jsonSchema} format to return the {@link createSchema}, {@link createSchema}, and {@link fullSchema}
 * @param meta
 * @param prefix
 * @returns
 */
export function convert(meta: EntityMetadata, prefix?: string) {
  const updateSchema = getUpdateSchema(meta, prefix);
  const createSchema = getCreateSchema(meta, prefix);
  const fullSchema = getFullSchema(meta, prefix);
  return { createSchema, updateSchema, fullSchema };
}
