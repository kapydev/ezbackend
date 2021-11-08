"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzModel = exports.EzRepo = exports.isNestedNormalType = exports.isNormalType = exports.isNestedRelation = exports.isRelation = exports.Type = void 0;
var ezapp_1 = require("../ezapp");
var typeorm_1 = require("typeorm");
var api_generator_1 = require("./generators/api-generator");
var utils_1 = require("@ezbackend/utils");
var NormalType;
(function (NormalType) {
    NormalType["VARCHAR"] = "VARCHAR";
    NormalType["INT"] = "INT";
    NormalType["FLOAT"] = "FLOAT";
    NormalType["DOUBLE"] = "DOUBLE";
    NormalType["REAL"] = "REAL";
    NormalType["DATE"] = "DATE";
    NormalType["JSON"] = "JSON";
    NormalType["BOOL"] = "BOOL";
    NormalType["ENUM"] = "ENUM";
})(NormalType || (NormalType = {}));
var RelationType;
(function (RelationType) {
    RelationType["ONE_TO_ONE"] = "ONE_TO_ONE";
    RelationType["ONE_TO_MANY"] = "ONE_TO_MANY";
    RelationType["MANY_TO_ONE"] = "MANY_TO_ONE";
    RelationType["MANY_TO_MANY"] = "MANY_TO_MANY";
})(RelationType || (RelationType = {}));
exports.Type = __assign(__assign({}, RelationType), NormalType);
//URGENT TODO: Allow array?
//URGENT TODO: Allow normal typeorm types?
function normalTypeToTypeORMtype(type) {
    switch (type) {
        case NormalType.VARCHAR:
            return 'varchar';
        case NormalType.INT:
            return 'integer';
        case NormalType.FLOAT:
            return 'float';
        case NormalType.DOUBLE:
            return 'double';
        case NormalType.REAL:
            return 'real';
        case NormalType.DATE:
            return 'date';
        case NormalType.BOOL:
            return 'boolean';
        case NormalType.JSON:
            //URGENT TODO: Switch between simple json and normal json depending on postgres column?
            return 'simple-json';
        case NormalType.ENUM:
            //URGENT URGENT TODO: Test case for this
            //URGENT URGENT TODO: See if 'enum' instead of simple-enum works
            //URGENT URGENT TODO: Good error message when enum values are not specified
            return 'simple-enum';
        default:
            return type;
    }
}
function relationTypeToTypeORMrelation(type) {
    switch (type) {
        case RelationType.ONE_TO_MANY:
            return 'one-to-many';
        case RelationType.ONE_TO_ONE:
            return 'one-to-one';
        case RelationType.MANY_TO_ONE:
            return 'many-to-one';
        case RelationType.MANY_TO_MANY:
            return 'many-to-many';
    }
}
function isRelation(type) {
    return Object.values(RelationType).includes(type);
}
exports.isRelation = isRelation;
function isNestedRelation(type) {
    return Object.values(RelationType).includes(type.type);
}
exports.isNestedRelation = isNestedRelation;
function isNormalType(type) {
    return Object.values(NormalType).includes(type);
}
exports.isNormalType = isNormalType;
function isNestedNormalType(type) {
    var ColumnType = [
        "int", "int2", "int4", "int8", "integer", "tinyint", "smallint", "mediumint", "bigint", "dec", "decimal", "smalldecimal", "fixed", "numeric", "number", "geometry", "geography", "st_geometry", "st_point", "float", "double", "dec", "decimal", "smalldecimal", "fixed", "numeric", "real", "double precision", "number", "datetime", "datetime2", "datetimeoffset", "time", "time with time zone", "time without time zone", "timestamp", "timestamp without time zone", "timestamp with time zone", "timestamp with local time zone", "character varying", "varying character", "char varying", "nvarchar", "national varchar", "character", "native character", "varchar", "char", "nchar", "national char", "varchar2", "nvarchar2", "alphanum", "shorttext", "raw", "binary", "varbinary", "string", "tinyint", "smallint", "mediumint", "int", "bigint", "simple-array", "simple-json", "simple-enum", "int2", "integer", "int4", "int8", "int64", "unsigned big int", "float", "float4", "float8", "smallmoney", "money", "boolean", "bool", "tinyblob", "tinytext", "mediumblob", "mediumtext", "blob", "text", "ntext", "citext", "hstore", "longblob", "longtext", "alphanum", "shorttext", "bytes", "bytea", "long", "raw", "long raw", "bfile", "clob", "nclob", "image", "timetz", "timestamptz", "timestamp with local time zone", "smalldatetime", "date", "interval year to month", "interval day to second", "interval", "year", "seconddate", "point", "line", "lseg", "box", "circle", "path", "polygon", "geography", "geometry", "linestring", "multipoint", "multilinestring", "multipolygon", "geometrycollection", "st_geometry", "st_point", "int4range", "int8range", "numrange", "tsrange", "tstzrange", "daterange", "enum", "set", "cidr", "inet", "macaddr", "bit", "bit varying", "varbit", "tsvector", "tsquery", "uuid", "xml", "json", "jsonb", "varbinary", "hierarchyid", "sql_variant", "rowid", "urowid", "uniqueidentifier", "rowversion", "array", "cube", "ltree"
    ];
    return Object.values(NormalType).concat(ColumnType).includes(type.type);
}
exports.isNestedNormalType = isNestedNormalType;
function schemaToEntityOptions(schema) {
    var columns = {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        //URGENT TODO: Figure out why TypeORM is not automatically generating the createdAt and updatedAt dates
        // createdAt: {
        //     type: 'date',
        //     createDate: true
        // },
        // updatedAt: {
        //     type: 'date',
        //     updateDate: true
        // }
    };
    var relations = {};
    Object.entries(schema).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        //URGENT TODO: Allow proper overridding of default columns
        if (isNormalType(value)) {
            columns[key] = {
                type: normalTypeToTypeORMtype(value)
            };
            return;
        }
        if (isNestedNormalType(value)) {
            if (value.primary === true) {
                throw new utils_1.EzError("EzBackend currently only supports one Primary Column per entity", "A primary id column is created by default for all models. While typeorm supports composite primary keys, EzBackend currently does not support this feature. If you need it drop us a message in github", "\nnew EzModel(\"IllegalModel\", {\n    mySecondPrimaryColumn: {\n        type: Type.VARCHAR,\n        primary: true //This is illegal\n    }\n})");
            }
            var type = value.type, noType = __rest(value, ["type"]);
            columns[key] = __assign({ type: normalTypeToTypeORMtype(value.type) }, noType);
        }
        if (isRelation(value)) {
            throw new utils_1.EzError("You currently need to use the full declaration for specifying a relation", "Relations require additional metadata to generate the Database Tables", "\nReplace\n\nmyRelation: Type.ONE_TO_ONE\n\nWith\n\nmyRelation: {\n    type: Type.ONE_TO_ONE,\n    joinColumn: true,\n    target:'detail'\n},\n                ");
            //Note: This makes it compulsory for the key to be the name of relation
            // relations[key] = {
            //     type: relationTypeToTypeORMrelation(value),
            //     target: key
            // }
            // return
        }
        if (isNestedRelation(value)) {
            var type = value.type, noType = __rest(value, ["type"]);
            relations[key] = __assign({ type: relationTypeToTypeORMrelation(value.type) }, noType);
        }
    });
    return { columns: columns, relations: relations };
}
//TODO: Think about function naming
function entityGeneratorFactory(modelName, modelSchema, repoOpts) {
    var _this = this;
    var entityGenerator = function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
        var _a, columns, relations, newEntity;
        return __generator(this, function (_b) {
            _a = schemaToEntityOptions(modelSchema), columns = _a.columns, relations = _a.relations;
            newEntity = new typeorm_1.EntitySchema(__assign({ name: modelName, columns: columns, relations: relations }, repoOpts));
            instance.entities.push(newEntity);
            return [2 /*return*/];
        });
    }); };
    return entityGenerator;
}
var EzRepo = /** @class */ (function (_super) {
    __extends(EzRepo, _super);
    function EzRepo(modelName, modelSchema, repoOpts) {
        if (repoOpts === void 0) { repoOpts = {}; }
        var _this = _super.call(this) || this;
        _this.setInit("Create \"" + modelName + "\" Entity", entityGeneratorFactory(modelName, modelSchema, repoOpts));
        _this.setPostInit("Obtain " + modelName + " Repository", function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                instance.repo = instance.orm.getRepository(modelName);
                this._repo = instance.repo;
                return [2 /*return*/];
            });
        }); });
        return _this;
    }
    EzRepo.prototype.getRepo = function () {
        if (this._repo === undefined) {
            throw new utils_1.EzError("Can only call getRepo() in lifecyle preHandler to postRun", "The repo is only defined in the postInit lifecycle, so it can only be referenced after that", "\nmodel.setHandler(\"Handle Repo\", async (instance, opts) => {\n    const repo = model.getRepo()\n    //Do stuff with repo\n})");
        }
        return this._repo;
    };
    return EzRepo;
}(ezapp_1.EzApp));
exports.EzRepo = EzRepo;
/**
 * Child of EzApp. This is your data model.
 */
var EzModel = /** @class */ (function (_super) {
    __extends(EzModel, _super);
    function EzModel(modelName, modelSchema, opts) {
        if (opts === void 0) { opts = {}; }
        var _a;
        var _this = _super.call(this, modelName, modelSchema, (_a = opts.repoOpts) !== null && _a !== void 0 ? _a : {}) || this;
        var router = new api_generator_1.EzRouter(opts.routerOpts);
        //TODO: Think about customisability of EzRouter
        _this.addApp("router", router);
        return _this;
    }
    Object.defineProperty(EzModel.prototype, "router", {
        //TODO: Figure out automatic typings
        get: function () {
            return this.getApp('router');
        },
        enumerable: false,
        configurable: true
    });
    return EzModel;
}(EzRepo));
exports.EzModel = EzModel;
//# sourceMappingURL=model.js.map