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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultGenerators = exports.getPrimaryColName = void 0;
var typeorm_json_schema_1 = require("../typeorm-json-schema");
var boom_1 = __importDefault(require("@hapi/boom"));
/**
 * Returns the primary column name from given metadata
 * @param meta
 * @returns
 */
function getPrimaryColName(meta) {
    var primaryColumns = meta.primaryColumns;
    return primaryColumns[0].propertyName;
}
exports.getPrimaryColName = getPrimaryColName;
//TODO: Check if this function is efficient
var removeNestedNulls = function (obj) {
    Object.keys(obj).forEach(function (k) {
        if (obj[k] && typeof obj[k] === 'object') {
            removeNestedNulls(obj[k]);
        }
        else if (obj[k] === null) {
            delete obj[k];
        }
    });
    return obj;
};
//TODO: Remove trailing slash from path names
//TODO: Make function to get generated Cols
//TODO: We need a query builder so that we can add stuff like tags and summary in the openapi functionality
/**
 * Generates API Documentation for the current model
 * {@link createOne} - Generates API docs for a POST request for one entity
 * {@link getOne} - Generates API docs for a GET request for one entity
 * {@link getAll} - Generates API docs for a GET request for all entities the model
 * {@link udpateOne} - Generates API docs for a PATCH request to one entity
 * {@link deleteOne} - Generates API docs for a DELETE request for one entity
 *
 *
 * @returns
 */
var getDefaultGenerators = function () {
    return {
        createOne: function (repo, opts) {
            var generatedCols = repo.metadata.columns.filter(function (col) { return col.isGenerated; }).map(function (col) { return col.propertyName; });
            var routeDetails = {
                method: "POST",
                url: "/",
                schema: {
                    //TODO: Figure out how to import types from fastify swagger correctly for this and below
                    //@ts-ignore
                    summary: "Create " + repo.metadata.name,
                    tags: [repo.metadata.name],
                    description: "During creation, you are not allowed to specify the values of generated columns (e.g. " + generatedCols.toString() + ").\n        All non nullable columns must be specified on creation",
                    body: { $ref: (0, typeorm_json_schema_1.getSchemaName)(repo.metadata, 'createSchema', opts === null || opts === void 0 ? void 0 : opts.schemaPrefix) + "#" },
                    response: {
                        200: { $ref: (0, typeorm_json_schema_1.getSchemaName)(repo.metadata, 'fullSchema', opts === null || opts === void 0 ? void 0 : opts.schemaPrefix) + "#" },
                        400: { $ref: "ErrorResponse#" }
                    },
                },
                handler: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var data, newObj, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                data = req.body;
                                return [4 /*yield*/, repo.save(data)];
                            case 1:
                                newObj = _a.sent();
                                return [2 /*return*/, removeNestedNulls(newObj)];
                            case 2:
                                e_1 = _a.sent();
                                //Assumption: If it fails, it is because of a bad request, not the code breaking
                                throw boom_1.default.badRequest(e_1);
                            case 3: return [2 /*return*/];
                        }
                    });
                }); },
            };
            return routeDetails;
        },
        getOne: function (repo, opts) {
            var _a;
            var primaryCol = getPrimaryColName(repo.metadata);
            var routeDetails = {
                method: "GET",
                url: "/:" + primaryCol,
                schema: {
                    //@ts-ignore
                    summary: "Get " + repo.metadata.name + " by " + primaryCol,
                    tags: [repo.metadata.name],
                    description: "If the " + primaryCol + " does not contain the value specified in the url parameters, there will be a 'not found' error.",
                    params: {
                        type: "object",
                        properties: (_a = {},
                            _a[primaryCol] = { type: "number" },
                            _a),
                    },
                    response: {
                        200: { $ref: (0, typeorm_json_schema_1.getSchemaName)(repo.metadata, 'fullSchema', opts === null || opts === void 0 ? void 0 : opts.schemaPrefix) + "#" },
                        404: { $ref: "ErrorResponse#" }
                    },
                },
                handler: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var id, newObj, e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                id = req.params[primaryCol];
                                return [4 /*yield*/, repo.findOneOrFail(id)];
                            case 1:
                                newObj = _a.sent();
                                return [2 /*return*/, removeNestedNulls(newObj)];
                            case 2:
                                e_2 = _a.sent();
                                throw boom_1.default.notFound(e_2);
                            case 3: return [2 /*return*/];
                        }
                    });
                }); },
            };
            return routeDetails;
        },
        getAll: function (repo, opts) {
            var routeDetails = {
                method: "GET",
                url: "/",
                schema: {
                    //@ts-ignore
                    summary: "Get all " + repo.metadata.name + " instances",
                    tags: [repo.metadata.name],
                    description: "If none exist, an empty array is returned",
                    response: {
                        200: {
                            type: "array",
                            items: { $ref: (0, typeorm_json_schema_1.getSchemaName)(repo.metadata, 'fullSchema', opts === null || opts === void 0 ? void 0 : opts.schemaPrefix) + "#" },
                        },
                    },
                },
                handler: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var newObj;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, repo.find()];
                            case 1:
                                newObj = _a.sent();
                                return [2 /*return*/, removeNestedNulls(newObj)];
                        }
                    });
                }); },
            };
            return routeDetails;
        },
        updateOne: function (repo, opts) {
            var _a;
            var primaryCol = getPrimaryColName(repo.metadata);
            var generatedCols = repo.metadata.columns.filter(function (col) { return col.isGenerated; }).map(function (col) { return col.propertyName; });
            var routeDetails = {
                method: "PATCH",
                url: "/:" + primaryCol,
                schema: {
                    //@ts-ignore
                    summary: "Update " + repo.metadata.name + " by " + primaryCol,
                    tags: [repo.metadata.name],
                    description: "The " + repo.metadata.name + " with the " + primaryCol + " specified must exist, otherwise a 'not found' error is returned\n        During creation, you are not allowed to specify the values of generated columns (e.g. " + generatedCols.toString() + ")",
                    body: { $ref: (0, typeorm_json_schema_1.getSchemaName)(repo.metadata, "updateSchema", opts === null || opts === void 0 ? void 0 : opts.schemaPrefix) + "#" },
                    response: {
                        200: { $ref: (0, typeorm_json_schema_1.getSchemaName)(repo.metadata, "fullSchema", opts === null || opts === void 0 ? void 0 : opts.schemaPrefix) + "#" },
                        400: { $ref: "ErrorResponse#" },
                        404: { $ref: "ErrorResponse#" }
                    },
                    params: {
                        type: "object",
                        properties: (_a = {},
                            _a[primaryCol] = { type: "number" },
                            _a),
                    },
                },
                handler: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var id, e_3, updatedObj;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                id = req.params[primaryCol];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, repo.findOneOrFail(id)];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                e_3 = _a.sent();
                                throw boom_1.default.notFound(e_3);
                            case 4: return [4 /*yield*/, repo.save(__assign({ id: id }, req.body))];
                            case 5:
                                updatedObj = _a.sent();
                                return [2 /*return*/, updatedObj];
                        }
                    });
                }); },
            };
            return routeDetails;
        },
        deleteOne: function (repo, opts) {
            var _a;
            var primaryCol = getPrimaryColName(repo.metadata);
            var routeDetails = {
                method: "DELETE",
                url: "/:" + primaryCol,
                schema: {
                    //@ts-ignore
                    summary: "Delete " + repo.metadata.name + " by " + primaryCol,
                    tags: [repo.metadata.name],
                    description: "The " + repo.metadata.name + " with the " + primaryCol + " specified must exist, otherwise a 'not found' error is returned",
                    params: {
                        type: "object",
                        properties: (_a = {},
                            _a[primaryCol] = { type: "number" },
                            _a),
                    },
                    response: {
                        200: {
                            type: "object",
                            properties: {
                                success: {
                                    type: "boolean",
                                },
                                id: {
                                    type: ["integer", "string"],
                                },
                            },
                            required: ["success", "id"],
                        },
                        400: { $ref: "ErrorResponse#" },
                        404: { $ref: "ErrorResponse#" }
                    },
                },
                handler: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var id, e_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                id = req.params[primaryCol];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, repo.findOneOrFail(id)];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                e_4 = _a.sent();
                                res.status(404).send(e_4);
                                return [3 /*break*/, 4];
                            case 4: return [4 /*yield*/, repo.delete(id)];
                            case 5:
                                _a.sent();
                                return [2 /*return*/, {
                                        success: true,
                                        id: id,
                                    }];
                        }
                    });
                }); },
            };
            return routeDetails;
        }
    };
};
exports.getDefaultGenerators = getDefaultGenerators;
//# sourceMappingURL=default-generators.js.map