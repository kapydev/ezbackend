"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = exports.getFullSchema = exports.getCreateSchema = exports.getUpdateSchema = exports.getSchemaName = void 0;
//TODO: See if there is a json schema library that can help with this... (fluent schema?)
/**
 * Retrieves the schema name for given metadata, type, and prefix
 * @param meta
 * @param type
 * @param prefix
 * @returns
 */
function getSchemaName(meta, type, prefix) {
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
    var baseName = meta.name;
    var resolvedPrefix = prefix ? prefix + '/' : '';
    var schemaName = "" + resolvedPrefix + type + "-" + baseName;
    return schemaName;
}
exports.getSchemaName = getSchemaName;
function colMetaToSchemaProps(colMeta) {
    var type = colTypeToJsonSchemaType(colMeta.type);
    if (type === 'object') {
        //TODO: Consider if this is the best way of accepting additional properties for simple json, especially if the simple json needs to have a coerced data structure
        return {
            additionalProperties: true,
            type: "object"
        };
    }
    return {
        type: colTypeToJsonSchemaType(colMeta.type),
    };
}
//NOTE: This relation col basically means that the column is a true relation, like program => <Object>
//Not applicable to programId => <Number>
function isRelationCol(col) {
    //URGENT TODO: Confirm there are no edge cases for property names not ending in Id
    if (col.propertyName.endsWith('Id')) {
        return false;
    }
    if (col.relationMetadata) {
        return true;
    }
    return false;
}
function colTypeToJsonSchemaType(colType) {
    if (colType instanceof Function) {
        return colType.name.toLocaleLowerCase();
    }
    else {
        //URGENT TODO: Figure out if typeorm has a way of getting the js type from the sql type (Or extend the types below but thats kinda scary)
        switch (colType) {
            case "varchar":
                return 'string';
            case "simple-json":
                return 'object';
            case "integer":
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
    //If we don't know the type, return any possible json schema type
    return ["number", "string", "boolean", "object", "array", "null"];
}
function checkColIsGenerated(col) {
    return (col.isGenerated ||
        col.isCreateDate ||
        col.isUpdateDate ||
        col.isDeleteDate);
}
//TODO: Combine schemas if possible
/**
 * Retrives JSON Schema for PATCH requests for given metadata and prefix
 * @param meta
 * @param prefix
 * @returns
 */
function getUpdateSchema(meta, prefix) {
    var nonGeneratedColumns = meta.columns.filter(function (col) { return !checkColIsGenerated(col); });
    var updateSchema = Object.entries(nonGeneratedColumns)
        .filter(function (_a) {
        var key = _a[0], val = _a[1];
        return !isRelationCol(val);
    })
        .reduce(function (jsonSchema, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return {
            $id: jsonSchema.$id,
            type: jsonSchema.type,
            properties: __assign(__assign({}, jsonSchema.properties), (_b = {}, _b[value.propertyName] = colMetaToSchemaProps(value), _b)),
        };
    }, {
        "$id": getSchemaName(meta, 'updateSchema', prefix),
        type: "object",
        properties: {},
    });
    //Add cascade update columns
    var eagerMeta = getNestedMetadata(meta, 'update');
    updateSchema = eagerMeta
        .reduce(function (jsonSchema, meta) {
        var _a;
        var nestedSchema = removeId(getUpdateSchema(meta.data));
        return {
            $id: jsonSchema.$id,
            type: jsonSchema.type,
            properties: __assign(__assign({}, jsonSchema.properties), (_a = {}, _a[meta.propertyName] = meta.isMany ? makeArray(nestedSchema) : nestedSchema, _a)),
        };
    }, updateSchema);
    return updateSchema;
}
exports.getUpdateSchema = getUpdateSchema;
/**
 *  Retrives JSON Schema for POST requests for given metadata and prefix
 * @param meta
 * @param prefix
 * @returns
 */
function getCreateSchema(meta, prefix) {
    var nonGeneratedColumns = meta.columns.filter(function (col) { return !checkColIsGenerated(col); });
    var createSchema = Object.entries(nonGeneratedColumns)
        .filter(function (_a) {
        var key = _a[0], val = _a[1];
        return !isRelationCol(val);
    })
        .reduce(function (jsonSchema, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return {
            $id: jsonSchema.$id,
            type: jsonSchema.type,
            properties: __assign(__assign({}, jsonSchema.properties), (_b = {}, _b[value.propertyName] = colMetaToSchemaProps(value), _b)),
            required: jsonSchema.required
        };
    }, {
        "$id": getSchemaName(meta, 'createSchema', prefix),
        type: "object",
        properties: {},
        required: []
    });
    //Add cascade created columns
    var eagerMeta = getNestedMetadata(meta, 'create');
    createSchema = eagerMeta
        .reduce(function (jsonSchema, meta) {
        var _a;
        var nestedSchema = removeId(getCreateSchema(meta.data));
        if (meta.data.tableName == 'user') {
        }
        return {
            $id: jsonSchema.$id,
            type: jsonSchema.type,
            properties: __assign(__assign({}, jsonSchema.properties), (_a = {}, _a[meta.propertyName] = meta.isMany ? makeArray(nestedSchema) : nestedSchema, _a)),
            required: jsonSchema.required
        };
    }, createSchema);
    var requiredPropertyNames = meta.columns
        .filter(function (col) {
        return !col.isNullable && !col.isGenerated && col.default === undefined;
    })
        .map(function (col) { return col.propertyName; });
    createSchema['required'] = requiredPropertyNames;
    return createSchema;
}
exports.getCreateSchema = getCreateSchema;
function makeArray(schema) {
    return {
        type: "array",
        items: schema
    };
}
/**
 * Retrives full JSON Schema for PATCH requests for given metadata and prefix.
 * Note: This also the schema used for the database ui.
 * @param meta
 * @param prefix
 * @returns
 */
function getFullSchema(meta, prefix) {
    var fullSchema = Object.entries(meta.columns)
        //Remove all relations
        .filter(function (_a) {
        var key = _a[0], val = _a[1];
        return !isRelationCol(val);
    })
        .reduce(function (jsonSchema, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return {
            $id: jsonSchema.$id,
            type: jsonSchema.type,
            properties: __assign(__assign({}, jsonSchema.properties), (_b = {}, _b[value.propertyName] = colMetaToSchemaProps(value), _b)),
        };
    }, {
        "$id": getSchemaName(meta, 'fullSchema', prefix),
        type: "object",
        properties: {},
    });
    //Add eagerly loaded columns
    var eagerMeta = getNestedMetadata(meta, 'read');
    fullSchema = eagerMeta
        .reduce(function (jsonSchema, meta) {
        var _a;
        var nestedSchema = removeId(getFullSchema(meta.data));
        return {
            $id: jsonSchema.$id,
            type: jsonSchema.type,
            properties: __assign(__assign({}, jsonSchema.properties), (_a = {}, _a[meta.propertyName] = meta.isMany ? makeArray(nestedSchema) : nestedSchema, _a)),
        };
    }, fullSchema);
    return fullSchema;
}
exports.getFullSchema = getFullSchema;
//TODO: See if there is a way to not use any and instead ensure the obejct has '$id'
function removeId(object) {
    delete object['$id'];
    return object;
}
function getNestedMetadata(meta, type) {
    return meta.relations.filter(function (relation) {
        switch (type) {
            case 'create':
                return relation.isCascadeInsert;
            case 'update':
                return relation.isCascadeUpdate;
            case 'read':
                return relation.isEager;
        }
    }).map(function (relation) {
        return {
            data: relation.inverseEntityMetadata,
            isMany: relation.isManyToMany || relation.isOneToMany,
            propertyName: relation.propertyName
        };
    });
}
/**
 * Top-level function to convert {@link EntityMetaData} from typeOrm to {@link jsonSchema} format to return the {@link createSchema}, {@link createSchema}, and {@link fullSchema}
 * @param meta
 * @param prefix
 * @returns
 */
function convert(meta, prefix) {
    var updateSchema = getUpdateSchema(meta, prefix);
    var createSchema = getCreateSchema(meta, prefix);
    var fullSchema = getFullSchema(meta, prefix);
    return { createSchema: createSchema, updateSchema: updateSchema, fullSchema: fullSchema };
}
exports.convert = convert;
//# sourceMappingURL=typeorm-json-schema.js.map