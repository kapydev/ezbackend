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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzRouter = exports.middlewareFactory = exports.generateRouteFactory = void 0;
var ezapp_1 = require("../../ezapp");
var typeorm_json_schema_1 = require("../typeorm-json-schema");
var default_generators_1 = require("./default-generators");
//TODO: Custom routes involving apps?
/**
 * Factory function for generating routes.
 * @param genOpts
 * @param generator
 * @param middlewares
 * @returns
 */
function generateRouteFactory(genOpts, generator, middlewares) {
    var _this = this;
    if (middlewares === void 0) { middlewares = []; }
    return function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
        var routes;
        return __generator(this, function (_a) {
            routes = [].concat(generator(instance.repo, genOpts));
            routes.forEach(function (route) {
                var modifiedRoute = route;
                middlewares.forEach(function (middleware) {
                    modifiedRoute = middleware(modifiedRoute);
                });
                //TODO: Figure out why types don't match
                instance.server.route(modifiedRoute);
            });
            return [2 /*return*/];
        });
    }); };
}
exports.generateRouteFactory = generateRouteFactory;
function middlewareFactory(optName, newValue) {
    var newMiddleware = function (oldRoute) {
        var newRoute = oldRoute;
        //@ts-ignore
        newRoute[optName] = newValue;
        return newRoute;
    };
    return newMiddleware;
}
exports.middlewareFactory = middlewareFactory;
//TODO: Think about function naming
//TODO: Figure out what the heck this genOpts done and if its useless remove it
/**
 * Child of EzApp. Handles route generation for
 */
var EzRouter = /** @class */ (function (_super) {
    __extends(EzRouter, _super);
    function EzRouter(opts) {
        if (opts === void 0) { opts = { prefix: '', generators: (0, default_generators_1.getDefaultGenerators)() }; }
        var _a;
        var _this = _super.call(this) || this;
        _this._genOpts = opts;
        _this._generators = (_a = opts.generators) !== null && _a !== void 0 ? _a : {};
        _this.setHandler("Add Create Schema", function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            var schema;
            return __generator(this, function (_a) {
                schema = (0, typeorm_json_schema_1.getCreateSchema)(instance.repo.metadata);
                instance.server.addSchema(schema);
                return [2 /*return*/];
            });
        }); });
        _this.setHandler("Add Update Schema", function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            var schema;
            return __generator(this, function (_a) {
                schema = (0, typeorm_json_schema_1.getUpdateSchema)(instance.repo.metadata);
                instance.server.addSchema(schema);
                return [2 /*return*/];
            });
        }); });
        _this.setHandler("Add Full Schema", function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            var schema;
            return __generator(this, function (_a) {
                schema = (0, typeorm_json_schema_1.getFullSchema)(instance.repo.metadata);
                instance.server.addSchema(schema);
                return [2 /*return*/];
            });
        }); });
        //URGENT TODO: Allow inclusion and exclusion of routes
        Object.entries(_this._generators).forEach(function (_a) {
            var generatorName = _a[0], generator = _a[1];
            _this.addRouteFromGenerator(generatorName, generator);
        });
        return _this;
    }
    //TODO: Refactor so that its not such a nested affair of functions
    EzRouter.prototype.addRouteFromGenerator = function (generatorName, generator, middlewares, override) {
        if (middlewares === void 0) { middlewares = []; }
        if (override === void 0) { override = false; }
        //TODO: Consider about not using spaces in naming conventions
        var handlerName = "Generate " + generatorName + " route";
        if (override) {
            this.removeHook('_handler', handlerName);
        }
        this.setHandler(handlerName, generateRouteFactory(this._genOpts, generator, middlewares));
    };
    //URGENT TODO: Make it such that invalid routeNames throw error which informs of possible route names
    EzRouter.prototype._forFactory = function (overrideName, routeNames) {
        var _this = this;
        return function (newVal) {
            var middleware = middlewareFactory(overrideName, newVal);
            Object.entries(_this._generators).forEach(function (_a) {
                var generatorName = _a[0], generator = _a[1];
                if (routeNames.includes(generatorName)) {
                    _this.addRouteFromGenerator(generatorName, generator, [middleware], true);
                }
            });
        };
    };
    EzRouter.prototype.for = function () {
        var routeNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            routeNames[_i] = arguments[_i];
        }
        return {
            method: this._forFactory('method', routeNames),
            url: this._forFactory('url', routeNames),
            schema: this._forFactory('schema', routeNames),
            exposeHeadRoute: this._forFactory('exposeHeadRoute', routeNames),
            attachValidation: this._forFactory('attachValidation', routeNames),
            onRequest: this._forFactory('onRequest', routeNames),
            preParsing: this._forFactory('preParsing', routeNames),
            preValidation: this._forFactory('preValidation', routeNames),
            preHandler: this._forFactory('preHandler', routeNames),
            preSerialization: this._forFactory('preSerialization', routeNames),
            onSend: this._forFactory('onSend', routeNames),
            onResponse: this._forFactory('onResponse', routeNames),
            handler: this._forFactory('handler', routeNames),
            errorHandler: this._forFactory('errorHandler', routeNames),
            validatorCompiler: this._forFactory('validatorCompiler', routeNames),
            serializerCompiler: this._forFactory('serializerCompiler', routeNames),
            schemaErrorFormatter: this._forFactory('schemaErrorFormatter', routeNames),
            bodyLimit: this._forFactory('bodyLimit', routeNames),
            logLevel: this._forFactory('logLevel', routeNames),
            config: this._forFactory('config', routeNames),
            version: this._forFactory('version', routeNames),
            prefixTrailingSlash: this._forFactory('prefixTrailingSlash', routeNames),
        };
    };
    return EzRouter;
}(ezapp_1.EzApp));
exports.EzRouter = EzRouter;
//# sourceMappingURL=api-generator.js.map