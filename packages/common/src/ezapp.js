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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzApp = void 0;
var core_1 = require("@ezbackend/core");
var fastify_plugin_1 = __importDefault(require("fastify-plugin"));
function generateFastifyFuncWrapper(parent, funcName) {
    return function () {
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        parent.functions.push(
        //any has to be used here because of typescript recursion limit
        function (server) { return server[funcName].apply(server, opts); });
    };
}
//TODO: Add types based on fastify instance
//TODO: Tests for all stubbing performed
function createServer(parent) {
    return {
        //TODO: Figure out how to get types with overrides
        //Routes
        delete: generateFastifyFuncWrapper(parent, 'delete'),
        get: generateFastifyFuncWrapper(parent, 'get'),
        head: generateFastifyFuncWrapper(parent, 'head'),
        patch: generateFastifyFuncWrapper(parent, 'patch'),
        post: generateFastifyFuncWrapper(parent, 'post'),
        put: generateFastifyFuncWrapper(parent, 'put'),
        options: generateFastifyFuncWrapper(parent, 'options'),
        all: generateFastifyFuncWrapper(parent, 'all'),
        route: generateFastifyFuncWrapper(parent, 'route'),
        //This one specifically uses the 23 overload parameters because otherwise the recursion is too deep for typescript to automatically detect the type
        addHook: generateFastifyFuncWrapper(parent, 'addHook'),
        addSchema: generateFastifyFuncWrapper(parent, 'addSchema'),
        setSerializerCompiler: generateFastifyFuncWrapper(parent, 'setSerializerCompiler'),
        addContentTypeParser: generateFastifyFuncWrapper(parent, 'addContentTypeParser'),
        decorate: generateFastifyFuncWrapper(parent, 'decorate'),
        decorateReply: generateFastifyFuncWrapper(parent, 'decorateReply'),
        decorateRequest: generateFastifyFuncWrapper(parent, 'decorateRequest'),
        inject: generateFastifyFuncWrapper(parent, 'inject'),
        //TODO: Figure out why the type inference cannot handle async/callback styles
        register: generateFastifyFuncWrapper(parent, 'register'),
        setNotFoundHandler: generateFastifyFuncWrapper(parent, 'setNotFoundHandler'),
        setErrorHandler: generateFastifyFuncWrapper(parent, 'setErrorHandler'),
    };
}
/**
 * Building block to build a plugin system
 * Child of {@link App}  {@link App} class
 */
var EzApp = /** @class */ (function (_super) {
    __extends(EzApp, _super);
    /**
     * Creates a fastify instance
     */
    function EzApp() {
        var _this = _super.call(this) || this;
        _this._functions = [];
        //Make routing with apps easy
        //URGENT TODO: Should we do this within the handler to be part of the plugin tree?
        _this.delete = generateFastifyFuncWrapper(_this, 'delete');
        _this.get = generateFastifyFuncWrapper(_this, 'get');
        _this.head = generateFastifyFuncWrapper(_this, 'head');
        _this.patch = generateFastifyFuncWrapper(_this, 'patch');
        _this.post = generateFastifyFuncWrapper(_this, 'post');
        _this.put = generateFastifyFuncWrapper(_this, 'put');
        _this.options = generateFastifyFuncWrapper(_this, 'options');
        _this.all = generateFastifyFuncWrapper(_this, 'all');
        _this.route = generateFastifyFuncWrapper(_this, 'route');
        _this.addHook = generateFastifyFuncWrapper(_this, 'addHook');
        _this.addSchema = generateFastifyFuncWrapper(_this, 'addSchema');
        _this.setSerializerCompiler = generateFastifyFuncWrapper(_this, 'setSerializerCompiler');
        _this.addContentTypeParser = generateFastifyFuncWrapper(_this, 'addContentTypeParser');
        _this.decorate = generateFastifyFuncWrapper(_this, 'decorate');
        _this.decorateReply = generateFastifyFuncWrapper(_this, 'decorateReply');
        _this.decorateRequest = generateFastifyFuncWrapper(_this, 'decorateRequest');
        _this.register = generateFastifyFuncWrapper(_this, 'register'); //TODO: Why is the async one not working?
        _this.setNotFoundHandler = generateFastifyFuncWrapper(_this, 'setNotFoundHandler');
        _this.setErrorHandler = generateFastifyFuncWrapper(_this, 'setErrorHandler');
        //NOTE: Inject is being used by EzBackend which is why we remove it
        // inject = generateFastifyFuncWrapper(this, 'inject')
        _this.setPreInit = function (funcName, plugin) { _super.prototype.setPreInit.call(_this, funcName, plugin); };
        _this.setInit = function (funcName, plugin) { _super.prototype.setInit.call(_this, funcName, plugin); };
        _this.setPostInit = function (funcName, plugin) { _super.prototype.setPostInit.call(_this, funcName, plugin); };
        _this.setPreHandler = function (funcName, plugin) { _super.prototype.setPreHandler.call(_this, funcName, plugin); };
        _this.setHandler = function (funcName, plugin) { _super.prototype.setHandler.call(_this, funcName, plugin); };
        _this.setPostHandler = function (funcName, plugin) { _super.prototype.setPostHandler.call(_this, funcName, plugin); };
        _this.setPreRun = function (funcName, plugin) { _super.prototype.setPreRun.call(_this, funcName, plugin); };
        _this.setRun = function (funcName, plugin) { _super.prototype.setRun.call(_this, funcName, plugin); };
        _this.setPostRun = function (funcName, plugin) { _super.prototype.setPostRun.call(_this, funcName, plugin); };
        _this.setHandler("Create Server Stub", function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                instance.server = createServer(this);
                return [2 /*return*/];
            });
        }); });
        _this.setPostHandler("Remove Server Stub", function (instance, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //URGENT TODO: Make sure that error message when trying to get decorators that are not present is clear
                //@ts-ignore
                delete instance.server;
                return [2 /*return*/];
            });
        }); });
        return _this;
    }
    Object.defineProperty(EzApp.prototype, "functions", {
        get: function () { return this._functions; },
        enumerable: false,
        configurable: true
    });
    /**
     * Registers all fastify plugins to server instance of ezbackend application
     * @param server Server instance
     * @param parent EzBackend Object
     */
    EzApp.prototype.registerFastifyPlugins = function (server, parent) {
        var _this = this;
        var childFunc = function (server) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                parent.functions.forEach(function (func) {
                    func(server);
                });
                parent.apps.forEach(function (app) {
                    if (app instanceof EzApp) {
                        app.registerFastifyPlugins(server, app);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        //TODO: Add test case that tests encapsulation requirements for plugins when parent.scope == PluginScope.PARENT
        var scopedChildFunc = (parent.scope === core_1.PluginScope.PARENT) ? (0, fastify_plugin_1.default)(childFunc) : childFunc;
        server.register(scopedChildFunc, parent.opts);
    };
    return EzApp;
}(core_1.App));
exports.EzApp = EzApp;
//# sourceMappingURL=ezapp.js.map