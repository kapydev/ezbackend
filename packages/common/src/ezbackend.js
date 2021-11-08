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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzBackend = void 0;
var ezapp_1 = require("./ezapp");
var fastify_1 = __importDefault(require("fastify"));
var fastify_plugin_1 = __importDefault(require("fastify-plugin"));
var typeorm_1 = require("typeorm");
var core_1 = require("@ezbackend/core");
var utils_1 = require("@ezbackend/utils");
var lodash_1 = __importDefault(require("lodash"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
//TODO: Check if emojis will break instance names
//URGENT TODO: Strict types for instance, opts
function addErrorSchema(instance, opts) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            instance.server.addSchema({
                "$id": "ErrorResponse",
                type: 'object',
                properties: {
                    statusCode: { type: 'number' },
                    error: { type: 'string' },
                    message: { type: 'string' }
                }
            });
            return [2 /*return*/];
        });
    });
}
//URGENT TODO: Make running this optional in the default config
dotenv_1.default.config();
var defaultConfig = {
    port: process.env.PORT || 8000,
    address: process.env.ADDRESS || "127.0.0.1",
    server: {
        logger: {
            prettyPrint: {
                translateTime: "SYS:HH:MM:ss",
                ignore: "pid,hostname,reqId,responseTime,req,res",
                messageFormat: "[{req.method} {req.url}] {msg}",
            },
        },
    },
    orm: {
        type: "better-sqlite3",
        database: ":memory:",
        synchronize: true
    },
    auth: {
        secretKey: (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : undefined,
        secretKeyPath: path_1.default.join(process.cwd(), 'secret-key'),
        successRedirectURL: "http://localhost:8000/db-ui",
        failureRedirectURL: "http://localhost:8000/db-ui",
        google: {
            googleClientId: process.env.GOOGLE_CLIENT_ID,
            googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: ['profile'],
        }
    },
    // cors: {
    //     origin: (origin: string, cb: Function) => {
    //         if (/localhost/.test(origin)) {
    //             //  Request from localhost will pass
    //             cb(null, true)
    //             return
    //         }
    //         // Generate an error on other origins, disabling access
    //         cb(new Error("Not allowed"))
    //     }
    // }
};
// Derived from https://github.com/jeromemacias/fastify-boom/blob/master/index.js
// Kudos to him
var ezbErrorPage = function (fastify, options, next) {
    //TODO: Strict types for error
    fastify.setErrorHandler(function errorHandler(error, request, reply) {
        request.log.error(error);
        if (error && error.query) {
            //Assumption: It is a typeorm error if it falls here
            request.log.error("query: " + error.query);
            request.log.error("parameters: " + error.parameters);
            request.log.error("driverError: " + error.driverError);
        }
        if (error && error.isBoom) {
            reply
                .code(error.output.statusCode)
                .type('application/json')
                .headers(error.output.headers)
                .send(error.output.payload);
            return;
        }
        reply.send(error || new Error("Got non-error: " + error));
    });
    next();
};
/**
 * Child of EzApp. This is where you set up your backend setup tasks.
 */
var EzBackend = /** @class */ (function (_super) {
    __extends(EzBackend, _super);
    function EzBackend() {
        var _this = _super.call(this) || this;
        _this.setInit('Create Entities Container', function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                instance.entities = [];
                return [2 /*return*/];
            });
        }); });
        _this.setPostInit('Create Database Connection', function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = instance;
                        return [4 /*yield*/, (0, typeorm_1.createConnection)(__assign(__assign({}, opts.orm), { entities: instance.entities }))];
                    case 1:
                        _a.orm = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        _this.setHandler('Add Fastify Boom', function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                instance.server.register((0, fastify_plugin_1.default)(ezbErrorPage));
                return [2 /*return*/];
            });
        }); });
        _this.setHandler('Add Error Schema', addErrorSchema);
        _this.setPostHandler('Create Fastify Server', function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                instance._server = (0, fastify_1.default)(opts.server);
                return [2 /*return*/];
            });
        }); });
        _this.setPostHandler('Register Fastify Plugins', function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.registerFastifyPlugins(instance._server, this);
                return [2 /*return*/];
            });
        }); });
        _this.setRun('Run Fastify Server', function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, instance._server.listen(opts.port, opts.address)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        _this.scope = core_1.PluginScope.PARENT;
        return _this;
    }
    EzBackend.prototype.getInternalInstance = function () {
        //TODO: Figure if there is a better way of getting this data
        //@ts-ignore
        var lastPlugin = this.instance._lastUsed;
        if (lastPlugin === null) {
            throw new Error("Server is still undefined, have you called app.start() yet?");
        }
        return lastPlugin.server;
    };
    EzBackend.prototype.getInternalServer = function () {
        return this.getInternalInstance()._server;
    };
    EzBackend.prototype.inject = function (injectOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var server;
            return __generator(this, function (_a) {
                server = this.getInternalServer();
                return [2 /*return*/, server.inject(injectOpts)];
            });
        });
    };
    EzBackend.prototype.verifyStarted = function (funcName) {
        if (!this.instance.started) {
            var additionalMsg = funcName
                ? "before running " + funcName
                : '';
            throw new utils_1.EzError("Instance not yet started", "The EzBackend instance must be started " + additionalMsg, "\nawait app.start()\n\nYou must wait for the above function to finish before you can run " + funcName + "\n");
        }
    };
    EzBackend.prototype.printRoutes = function () {
        this.verifyStarted("printRoutes");
        return this.getInternalServer().printRoutes();
    };
    EzBackend.prototype.printPlugins = function () {
        this.verifyStarted("printPlugins");
        return this.getInternalServer().printPlugins();
    };
    EzBackend.prototype.prettyPrint = function () {
        this.verifyStarted("prettyPrint");
        return this.instance.prettyPrint();
    };
    //URGENT TODO: Remove temporary any fix
    EzBackend.prototype.start = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = lodash_1.default.merge(defaultConfig, opts);
                        return [4 /*yield*/, _super.prototype.start.call(this, opts)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return EzBackend;
}(ezapp_1.EzApp));
exports.EzBackend = EzBackend;
//# sourceMappingURL=ezbackend.js.map