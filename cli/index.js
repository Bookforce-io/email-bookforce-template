#!/usr/bin/env node
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _async_iterator(iterable) {
    var method, async, sync, retry = 2;
    for("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;){
        if (async && null != (method = iterable[async])) return method.call(iterable);
        if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable));
        async = "@@asyncIterator", sync = "@@iterator";
    }
    throw new TypeError("Object is not async iterable");
}
function AsyncFromSyncIterator(s) {
    function AsyncFromSyncIteratorContinuation(r) {
        if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
        var done = r.done;
        return Promise.resolve(r.value).then(function(value) {
            return {
                value: value,
                done: done
            };
        });
    }
    return AsyncFromSyncIterator = function(s) {
        this.s = s, this.n = s.next;
    }, AsyncFromSyncIterator.prototype = {
        s: null,
        n: null,
        next: function() {
            return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
        },
        return: function(value) {
            var ret = this.s.return;
            return void 0 === ret ? Promise.resolve({
                value: value,
                done: !0
            }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
        },
        throw: function(value) {
            var thr = this.s.return;
            return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
        }
    }, new AsyncFromSyncIterator(s);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function _ts_values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = function(to, from, except, desc) {
    if (from && typeof from === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toESM = function(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod);
};
// src/cli/index.ts
var import_commander = require("commander");
// package.json
var package_default = {
    name: "react-email",
    version: "2.1.6",
    description: "A live preview of your emails right in your browser.",
    bin: {
        email: "./cli/index.js"
    },
    scripts: {
        build: "tsup",
        dev: "tsup --watch",
        test: "vitest run",
        "test:watch": "vitest",
        clean: "rm -rf dist",
        lint: "eslint . && tsc"
    },
    license: "MIT",
    repository: {
        type: "git",
        url: "https://github.com/resend/react-email.git",
        directory: "packages/react-email"
    },
    keywords: [
        "react",
        "email"
    ],
    engines: {
        node: ">=18.0.0"
    },
    dependencies: {
        "@babel/core": "7.24.5",
        "@babel/parser": "7.24.5",
        "@radix-ui/colors": "1.0.1",
        "@radix-ui/react-collapsible": "1.1.0",
        "@radix-ui/react-popover": "1.1.1",
        "@radix-ui/react-slot": "1.1.0",
        "@radix-ui/react-toggle-group": "1.1.0",
        "@radix-ui/react-tooltip": "1.1.1",
        "@swc/core": "1.3.101",
        "@types/react": "18.2.47",
        "@types/react-dom": "^18.2.0",
        "@types/webpack": "5.28.5",
        autoprefixer: "10.4.14",
        chalk: "4.1.2",
        chokidar: "3.5.3",
        clsx: "2.1.0",
        commander: "11.1.0",
        debounce: "2.0.0",
        esbuild: "0.19.11",
        "eslint-config-prettier": "9.0.0",
        "eslint-config-turbo": "1.10.12",
        "framer-motion": "10.17.4",
        glob: "10.3.4",
        "log-symbols": "4.1.0",
        "mime-types": "2.1.35",
        next: "14.1.4",
        "normalize-path": "3.0.0",
        ora: "5.4.1",
        postcss: "8.4.38",
        "prism-react-renderer": "2.1.0",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "socket.io": "4.7.3",
        "socket.io-client": "4.7.3",
        sonner: "1.3.1",
        "source-map-js": "1.0.2",
        "stacktrace-parser": "0.1.10",
        "tailwind-merge": "2.2.0",
        tailwindcss: "3.4.0",
        typescript: "5.1.6"
    },
    devDependencies: {
        "@react-email/components": "workspace:*",
        "@react-email/render": "workspace:*",
        "@types/babel__core": "7.20.5",
        "@types/fs-extra": "11.0.1",
        "@types/mime-types": "2.1.4",
        "@types/node": "18.0.0",
        "@types/normalize-path": "3.0.2",
        "@vercel/style-guide": "5.1.0",
        eslint: "8.50.0",
        tsup: "7.2.0",
        tsx: "4.9.0",
        vitest: "1.1.3"
    }
};
// src/cli/commands/dev.ts
var import_node_fs4 = __toESM(require("fs"));
// src/cli/utils/tree.ts
var import_node_fs = require("fs");
var import_node_os = __toESM(require("os"));
var import_node_path = __toESM(require("path"));
var SYMBOLS = {
    BRANCH: "├── ",
    EMPTY: "",
    INDENT: "    ",
    LAST_BRANCH: "└── ",
    VERTICAL: "│   "
};
var getTreeLines = function() {
    var _ref = _async_to_generator(function(dirPath, depth) {
        var currentDepth, base, dirFullpath, dirname, lines, dirStat, _loop, childDirents, i;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    currentDepth = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : 0;
                    base = process.cwd();
                    dirFullpath = import_node_path.default.resolve(base, dirPath);
                    dirname = import_node_path.default.basename(dirFullpath);
                    lines = [
                        dirname
                    ];
                    return [
                        4,
                        import_node_fs.promises.stat(dirFullpath)
                    ];
                case 1:
                    dirStat = _state.sent();
                    if (!(dirStat.isDirectory() && currentDepth < depth)) return [
                        3,
                        6
                    ];
                    _loop = function(i) {
                        var dirent, isLast, branchingSymbol, verticalSymbol, pathToDirectory, treeLinesForSubDirectory;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    dirent = childDirents[i];
                                    isLast = i === childDirents.length - 1;
                                    branchingSymbol = isLast ? SYMBOLS.LAST_BRANCH : SYMBOLS.BRANCH;
                                    verticalSymbol = isLast ? SYMBOLS.INDENT : SYMBOLS.VERTICAL;
                                    if (!dirent.isFile()) return [
                                        3,
                                        1
                                    ];
                                    lines.push("".concat(branchingSymbol).concat(dirent.name));
                                    return [
                                        3,
                                        3
                                    ];
                                case 1:
                                    pathToDirectory = import_node_path.default.join(dirFullpath, dirent.name);
                                    return [
                                        4,
                                        getTreeLines(pathToDirectory, depth, currentDepth + 1)
                                    ];
                                case 2:
                                    treeLinesForSubDirectory = _state.sent();
                                    lines = lines.concat(treeLinesForSubDirectory.map(function(line, index) {
                                        return index === 0 ? "".concat(branchingSymbol).concat(line) : "".concat(verticalSymbol).concat(line);
                                    }));
                                    _state.label = 3;
                                case 3:
                                    return [
                                        2
                                    ];
                            }
                        });
                    };
                    return [
                        4,
                        import_node_fs.promises.readdir(dirFullpath, {
                            withFileTypes: true
                        })
                    ];
                case 2:
                    childDirents = _state.sent();
                    childDirents.sort(function(a, b) {
                        if (a.isDirectory() && b.isFile()) {
                            return -1;
                        } else if (a.isFile() && b.isDirectory()) {
                            return 1;
                        }
                        return b.name > a.name ? -1 : 1;
                    });
                    i = 0;
                    _state.label = 3;
                case 3:
                    if (!(i < childDirents.length)) return [
                        3,
                        6
                    ];
                    return [
                        5,
                        _ts_values(_loop(i))
                    ];
                case 4:
                    _state.sent();
                    _state.label = 5;
                case 5:
                    i++;
                    return [
                        3,
                        3
                    ];
                case 6:
                    return [
                        2,
                        lines
                    ];
            }
        });
    });
    return function getTreeLines(dirPath, depth) {
        return _ref.apply(this, arguments);
    };
}();
var tree = function() {
    var _ref = _async_to_generator(function(dirPath, depth) {
        var lines;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        getTreeLines(dirPath, depth)
                    ];
                case 1:
                    lines = _state.sent();
                    return [
                        2,
                        lines.join(import_node_os.default.EOL)
                    ];
            }
        });
    });
    return function tree(dirPath, depth) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/utils/preview/hot-reloading/setup-hot-reloading.ts
var import_node_path5 = __toESM(require("path"));
var import_socket = require("socket.io");
var import_chokidar = require("chokidar");
var import_debounce = __toESM(require("debounce"));
// src/cli/utils/preview/hot-reloading/create-dependency-graph.ts
var import_node_path4 = __toESM(require("path"));
var import_node_fs3 = require("fs");
// src/cli/utils/preview/hot-reloading/get-imported-modules.ts
var import_core = require("@babel/core");
var import_parser = require("@babel/parser");
var getImportedModules = function(contents) {
    var importedPaths = [];
    var parsedContents = (0, import_parser.parse)(contents, {
        sourceType: "unambiguous",
        strictMode: false,
        errorRecovery: true,
        plugins: [
            "jsx",
            "typescript"
        ]
    });
    (0, import_core.traverse)(parsedContents, {
        ImportDeclaration: function ImportDeclaration(param) {
            var node = param.node;
            importedPaths.push(node.source.value);
        },
        ExportAllDeclaration: function ExportAllDeclaration(param) {
            var node = param.node;
            importedPaths.push(node.source.value);
        },
        ExportNamedDeclaration: function ExportNamedDeclaration(param) {
            var node = param.node;
            if (node.source) {
                importedPaths.push(node.source.value);
            }
        },
        CallExpression: function CallExpression(param) {
            var node = param.node;
            if ("name" in node.callee && node.callee.name === "require") {
                if (node.arguments.length === 1) {
                    var importPathNode = node.arguments[0];
                    if (importPathNode.type === "StringLiteral") {
                        importedPaths.push(importPathNode.value);
                    }
                }
            }
        }
    });
    return importedPaths;
};
// src/cli/utils/preview/start-dev-server.ts
var import_node_path3 = __toESM(require("path"));
var import_node_http = __toESM(require("http"));
var import_node_url = __toESM(require("url"));
var import_next = __toESM(require("next"));
var import_ora = __toESM(require("ora"));
var import_log_symbols = __toESM(require("log-symbols"));
var import_chalk = __toESM(require("chalk"));
// src/cli/utils/close-ora-on-sigint.ts
var closeOraOnSIGNIT = function(spinner) {
    process.on("SIGINT", function() {
        spinner.stop();
    });
};
// src/cli/utils/preview/serve-static-file.ts
var import_node_path2 = __toESM(require("path"));
var import_node_fs2 = require("fs");
var import_mime_types = require("mime-types");
var serveStaticFile = function() {
    var _ref = _async_to_generator(function(res, parsedUrl, staticDirRelativePath) {
        var staticBaseDir, pathname, ext, fileAbsolutePath, fileHandle, fileData, exception;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    staticBaseDir = import_node_path2.default.join(process.cwd(), staticDirRelativePath);
                    pathname = parsedUrl.pathname;
                    ext = import_node_path2.default.parse(pathname).ext;
                    fileAbsolutePath = import_node_path2.default.join(staticBaseDir, pathname);
                    return [
                        4,
                        import_node_fs2.promises.open(fileAbsolutePath, "r")
                    ];
                case 1:
                    fileHandle = _state.sent();
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        4,
                        5,
                        6
                    ]);
                    return [
                        4,
                        import_node_fs2.promises.readFile(fileHandle)
                    ];
                case 3:
                    fileData = _state.sent();
                    res.setHeader("Content-type", (0, import_mime_types.lookup)(ext) || "text/plain");
                    res.end(fileData);
                    return [
                        3,
                        6
                    ];
                case 4:
                    exception = _state.sent();
                    console.error("Could not read file at ".concat(fileAbsolutePath, " to be served, here's the exception:"), exception);
                    res.statusCode = 500;
                    res.end("Could not read file to be served! Check your terminal for more information.");
                    return [
                        3,
                        6
                    ];
                case 5:
                    fileHandle.close();
                    return [
                        7
                    ];
                case 6:
                    return [
                        2
                    ];
            }
        });
    });
    return function serveStaticFile(res, parsedUrl, staticDirRelativePath) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/utils/preview/get-env-variables-for-preview-app.ts
var import_path = __toESM(require("path"));
var getEnvVariablesForPreviewApp = function(relativePathToEmailsDirectory, cliPackageLocation, cwd) {
    return {
        NEXT_PUBLIC_EMAILS_DIR_RELATIVE_PATH: relativePathToEmailsDirectory,
        NEXT_PUBLIC_CLI_PACKAGE_LOCATION: cliPackageLocation,
        NEXT_PUBLIC_OS_PATH_SEPARATOR: import_path.default.sep,
        NEXT_PUBLIC_USER_PROJECT_LOCATION: cwd
    };
};
// src/cli/utils/preview/start-dev-server.ts
var devServer;
var safeAsyncServerListen = function(server, port) {
    return new Promise(function(resolve2) {
        server.listen(port, function() {
            resolve2({
                portAlreadyInUse: false
            });
        });
        server.on("error", function(e) {
            if (e.code === "EADDRINUSE") {
                resolve2({
                    portAlreadyInUse: true
                });
            }
        });
    });
};
var isRunningBuilt = __filename.endsWith(import_node_path3.default.join("cli", "index.js"));
var cliPacakgeLocation = isRunningBuilt ? import_node_path3.default.resolve(__dirname, "..") : import_node_path3.default.resolve(__dirname, "../../../..");
var startDevServer = function() {
    var _ref = _async_to_generator(function(emailsDirRelativePath, staticBaseDirRelativePath, port) {
        var portAlreadyInUse, nextPortToTry, spinner, timeBeforeNextReady, app, isNextReady, nextReadyPromise, nextHandleRequest, secondsToNextReady;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    devServer = import_node_http.default.createServer(function(req, res) {
                        if (!req.url) {
                            res.end(404);
                            return;
                        }
                        var parsedUrl = import_node_url.default.parse(req.url, true);
                        res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
                        res.setHeader("Pragma", "no-cache");
                        res.setHeader("Expires", "-1");
                        try {
                            if (parsedUrl.path && parsedUrl.path.includes("static/") && !parsedUrl.path.includes("_next/static/")) {
                                void serveStaticFile(res, parsedUrl, staticBaseDirRelativePath);
                            } else if (!isNextReady) {
                                void nextReadyPromise.then(function() {
                                    return nextHandleRequest === null || nextHandleRequest === void 0 ? void 0 : nextHandleRequest(req, res, parsedUrl);
                                });
                            } else {
                                void (nextHandleRequest === null || nextHandleRequest === void 0 ? void 0 : nextHandleRequest(req, res, parsedUrl));
                            }
                        } catch (e) {
                            console.error("caught error", e);
                            res.writeHead(500);
                            res.end();
                        }
                    });
                    return [
                        4,
                        safeAsyncServerListen(devServer, port)
                    ];
                case 1:
                    portAlreadyInUse = _state.sent().portAlreadyInUse;
                    if (!portAlreadyInUse) {
                        console.log(import_chalk.default.greenBright("    React Email ".concat(package_default.version)));
                        console.log("    Running preview at:          http://localhost:".concat(port, "\n"));
                    } else {
                        nextPortToTry = port + 1;
                        console.warn(" ".concat(import_log_symbols.default.warning, " Port ").concat(port, " is already in use, trying ").concat(nextPortToTry));
                        return [
                            2,
                            startDevServer(emailsDirRelativePath, staticBaseDirRelativePath, nextPortToTry)
                        ];
                    }
                    devServer.on("close", /*#__PURE__*/ _async_to_generator(function() {
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    return [
                                        4,
                                        app.close()
                                    ];
                                case 1:
                                    _state.sent();
                                    return [
                                        2
                                    ];
                            }
                        });
                    }));
                    devServer.on("error", function(e) {
                        console.error(" ".concat(import_log_symbols.default.error, " preview server error: "), JSON.stringify(e));
                        process.exit(1);
                    });
                    spinner = (0, import_ora.default)({
                        text: "Getting react-email preview server ready...\n",
                        prefixText: " "
                    }).start();
                    closeOraOnSIGNIT(spinner);
                    timeBeforeNextReady = performance.now();
                    process.env = _object_spread({}, process.env, getEnvVariablesForPreviewApp(// If we don't do normalization here, stuff like https://github.com/resend/react-email/issues/1354 happens.
                    import_node_path3.default.normalize(emailsDirRelativePath), cliPacakgeLocation, process.cwd()));
                    app = (0, import_next.default)({
                        // passing in env here does not get the environment variables there
                        dev: true,
                        hostname: "localhost",
                        port: port,
                        dir: cliPacakgeLocation
                    });
                    isNextReady = false;
                    nextReadyPromise = app.prepare();
                    return [
                        4,
                        nextReadyPromise
                    ];
                case 2:
                    _state.sent();
                    isNextReady = true;
                    nextHandleRequest = app.getRequestHandler();
                    secondsToNextReady = ((performance.now() - timeBeforeNextReady) / 1e3).toFixed(1);
                    spinner.stopAndPersist({
                        text: "Ready in ".concat(secondsToNextReady, "s\n"),
                        symbol: import_log_symbols.default.success
                    });
                    return [
                        2,
                        devServer
                    ];
            }
        });
    });
    return function startDevServer(emailsDirRelativePath, staticBaseDirRelativePath, port) {
        return _ref.apply(this, arguments);
    };
}();
var makeExitHandler = function(options) {
    return function(_codeOrSignal) {
        if (typeof devServer !== "undefined") {
            console.log("\nshutting down dev server");
            devServer.close();
            devServer = void 0;
        }
        if (options === null || options === void 0 ? void 0 : options.shouldKillProcess) {
            process.exit(options.killWithErrorCode ? 1 : 0);
        }
    };
};
process.on("exit", makeExitHandler());
process.on("SIGINT", makeExitHandler({
    shouldKillProcess: true,
    killWithErrorCode: false
}));
process.on("SIGUSR1", makeExitHandler({
    shouldKillProcess: true,
    killWithErrorCode: false
}));
process.on("SIGUSR2", makeExitHandler({
    shouldKillProcess: true,
    killWithErrorCode: false
}));
process.on("uncaughtException", makeExitHandler({
    shouldKillProcess: true,
    killWithErrorCode: true
}));
// src/cli/utils/preview/hot-reloading/create-dependency-graph.ts
var readAllFilesInsideDirectory = function() {
    var _ref = _async_to_generator(function(directory) {
        var allFilePaths, topLevelDirents, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, dirent, pathToDirent, _, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    allFilePaths = [];
                    return [
                        4,
                        import_node_fs3.promises.readdir(directory, {
                            withFileTypes: true
                        })
                    ];
                case 1:
                    topLevelDirents = _state.sent();
                    _iteratorAbruptCompletion = false, _didIteratorError = false;
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        9,
                        10,
                        15
                    ]);
                    _iterator = _async_iterator(topLevelDirents);
                    _state.label = 3;
                case 3:
                    return [
                        4,
                        _iterator.next()
                    ];
                case 4:
                    if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                        3,
                        8
                    ];
                    _value = _step.value;
                    dirent = _value;
                    pathToDirent = import_node_path4.default.join(directory, dirent.name);
                    if (!dirent.isDirectory()) return [
                        3,
                        6
                    ];
                    _ = allFilePaths.concat;
                    return [
                        4,
                        readAllFilesInsideDirectory(pathToDirent)
                    ];
                case 5:
                    allFilePaths = _.apply(allFilePaths, [
                        _state.sent()
                    ]);
                    return [
                        3,
                        7
                    ];
                case 6:
                    allFilePaths.push(pathToDirent);
                    _state.label = 7;
                case 7:
                    _iteratorAbruptCompletion = false;
                    return [
                        3,
                        3
                    ];
                case 8:
                    return [
                        3,
                        15
                    ];
                case 9:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        15
                    ];
                case 10:
                    _state.trys.push([
                        10,
                        ,
                        13,
                        14
                    ]);
                    if (!(_iteratorAbruptCompletion && _iterator.return != null)) return [
                        3,
                        12
                    ];
                    return [
                        4,
                        _iterator.return()
                    ];
                case 11:
                    _state.sent();
                    _state.label = 12;
                case 12:
                    return [
                        3,
                        14
                    ];
                case 13:
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                    return [
                        7
                    ];
                case 14:
                    return [
                        7
                    ];
                case 15:
                    return [
                        2,
                        allFilePaths
                    ];
            }
        });
    });
    return function readAllFilesInsideDirectory(directory) {
        return _ref.apply(this, arguments);
    };
}();
var isJavascriptModule = function(filePath) {
    var extensionName = import_node_path4.default.extname(filePath);
    return [
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".mjs",
        ".cjs"
    ].includes(extensionName);
};
var checkFileExtensionsUntilItExists = function(pathWithoutExtension) {
    if ((0, import_node_fs3.existsSync)("".concat(pathWithoutExtension, ".ts"))) {
        return "".concat(pathWithoutExtension, ".ts");
    } else if ((0, import_node_fs3.existsSync)("".concat(pathWithoutExtension, ".tsx"))) {
        return "".concat(pathWithoutExtension, ".tsx");
    } else if ((0, import_node_fs3.existsSync)("".concat(pathWithoutExtension, ".js"))) {
        return "".concat(pathWithoutExtension, ".js");
    } else if ((0, import_node_fs3.existsSync)("".concat(pathWithoutExtension, ".jsx"))) {
        return "".concat(pathWithoutExtension, ".jsx");
    } else if ((0, import_node_fs3.existsSync)("".concat(pathWithoutExtension, ".mjs"))) {
        return "".concat(pathWithoutExtension, ".mjs");
    } else if ((0, import_node_fs3.existsSync)("".concat(pathWithoutExtension, ".cjs"))) {
        return "".concat(pathWithoutExtension, ".cjs");
    }
};
var createDependencyGraph = function() {
    var _ref = _async_to_generator(function(directory) {
        var filePaths, modulePaths, graph, getDependencyPaths, updateModuleDependenciesInGraph, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filePath, err, removeModuleFromGraph;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        readAllFilesInsideDirectory(directory)
                    ];
                case 1:
                    filePaths = _state.sent();
                    modulePaths = filePaths.filter(isJavascriptModule);
                    graph = Object.fromEntries(modulePaths.map(function(path12) {
                        return [
                            path12,
                            {
                                path: path12,
                                dependencyPaths: [],
                                dependentPaths: [],
                                moduleDependencies: []
                            }
                        ];
                    }));
                    getDependencyPaths = function() {
                        var _ref = _async_to_generator(function(filePath) {
                            var contents, importedPaths, importedPathsRelativeToDirectory, moduleDependencies, nonNodeModuleImportPathsRelativeToDirectory;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            import_node_fs3.promises.readFile(filePath, "utf8")
                                        ];
                                    case 1:
                                        contents = _state.sent();
                                        importedPaths = getImportedModules(contents);
                                        importedPathsRelativeToDirectory = importedPaths.map(function(dependencyPath) {
                                            var isModulePath = !dependencyPath.startsWith(".");
                                            if (!isModulePath && !import_node_path4.default.isAbsolute(dependencyPath)) {
                                                var pathToDependencyFromDirectory = import_node_path4.default.resolve(/*
                          path.resolve resolves paths differently from what imports on javascript do.
            
                          So if we wouldn't do this, for an email at "/path/to/email.tsx" with a dependecy path of "./other-email" 
                          would end up going into /path/to/email.tsx/other-email instead of /path/to/other-email which is the
                          one the import is meant to go to
                        */ import_node_path4.default.dirname(filePath), dependencyPath);
                                                var isDirectory = false;
                                                try {
                                                    isDirectory = (0, import_node_fs3.statSync)(pathToDependencyFromDirectory).isDirectory();
                                                } catch (_) {}
                                                if (isDirectory) {
                                                    var pathToSubDirectory = pathToDependencyFromDirectory;
                                                    var pathWithExtension = checkFileExtensionsUntilItExists("".concat(pathToSubDirectory, "/index"));
                                                    if (pathWithExtension) {
                                                        pathToDependencyFromDirectory = pathWithExtension;
                                                    } else if (!isRunningBuilt) {
                                                        console.warn("Could not find index file for directory at ".concat(pathToDependencyFromDirectory, ". This is probably going to cause issues with both hot reloading and your code."));
                                                    }
                                                }
                                                if (!isJavascriptModule(pathToDependencyFromDirectory)) {
                                                    var pathWithExtension1 = checkFileExtensionsUntilItExists(pathToDependencyFromDirectory);
                                                    if (pathWithExtension1) {
                                                        pathToDependencyFromDirectory = pathWithExtension1;
                                                    } else if (!isRunningBuilt) {
                                                        console.warn("Could not determine the file extension for the file at ".concat(pathWithExtension1));
                                                    }
                                                }
                                                return pathToDependencyFromDirectory;
                                            } else {
                                                return dependencyPath;
                                            }
                                        });
                                        moduleDependencies = importedPathsRelativeToDirectory.filter(function(dependencyPath) {
                                            return !dependencyPath.startsWith(".") && !import_node_path4.default.isAbsolute(dependencyPath);
                                        });
                                        nonNodeModuleImportPathsRelativeToDirectory = importedPathsRelativeToDirectory.filter(function(dependencyPath) {
                                            return dependencyPath.startsWith(".") || import_node_path4.default.isAbsolute(dependencyPath);
                                        });
                                        return [
                                            2,
                                            {
                                                dependencyPaths: nonNodeModuleImportPathsRelativeToDirectory,
                                                moduleDependencies: moduleDependencies
                                            }
                                        ];
                                }
                            });
                        });
                        return function getDependencyPaths(filePath) {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    updateModuleDependenciesInGraph = function() {
                        var _ref = _async_to_generator(function(moduleFilePath) {
                            var _graph_moduleFilePath, module2, _ref, moduleDependencies, newDependencyPaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dependencyPath, dependencyModule, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, dependencyPath1, dependencyModule1;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        module2 = (_graph_moduleFilePath = graph[moduleFilePath]) !== null && _graph_moduleFilePath !== void 0 ? _graph_moduleFilePath : {
                                            path: moduleFilePath,
                                            dependencyPaths: [],
                                            dependentPaths: [],
                                            moduleDependencies: []
                                        };
                                        return [
                                            4,
                                            getDependencyPaths(moduleFilePath)
                                        ];
                                    case 1:
                                        _ref = _state.sent(), moduleDependencies = _ref.moduleDependencies, newDependencyPaths = _ref.dependencyPaths;
                                        module2.moduleDependencies = moduleDependencies;
                                        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                        try {
                                            for(_iterator = module2.dependencyPaths[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                                dependencyPath = _step.value;
                                                if (newDependencyPaths.includes(dependencyPath)) continue;
                                                dependencyModule = graph[dependencyPath];
                                                if (dependencyModule !== void 0) {
                                                    dependencyModule.dependentPaths = dependencyModule.dependentPaths.filter(function(dependentPath) {
                                                        return dependentPath !== moduleFilePath;
                                                    });
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError = true;
                                            _iteratorError = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                    _iterator.return();
                                                }
                                            } finally{
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                            }
                                        }
                                        module2.dependencyPaths = newDependencyPaths;
                                        _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                                        try {
                                            for(_iterator1 = newDependencyPaths[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                                dependencyPath1 = _step1.value;
                                                dependencyModule1 = graph[dependencyPath1];
                                                if (dependencyModule1 !== void 0 && !dependencyModule1.dependentPaths.includes(moduleFilePath)) {
                                                    dependencyModule1.dependentPaths.push(moduleFilePath);
                                                } else {
                                                    graph[dependencyPath1] = {
                                                        path: dependencyPath1,
                                                        moduleDependencies: [],
                                                        dependencyPaths: [],
                                                        dependentPaths: [
                                                            moduleFilePath
                                                        ]
                                                    };
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError1 = true;
                                            _iteratorError1 = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                                    _iterator1.return();
                                                }
                                            } finally{
                                                if (_didIteratorError1) {
                                                    throw _iteratorError1;
                                                }
                                            }
                                        }
                                        graph[moduleFilePath] = module2;
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                        return function updateModuleDependenciesInGraph(moduleFilePath) {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        7,
                        8,
                        9
                    ]);
                    _iterator = modulePaths[Symbol.iterator]();
                    _state.label = 3;
                case 3:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        6
                    ];
                    filePath = _step.value;
                    return [
                        4,
                        updateModuleDependenciesInGraph(filePath)
                    ];
                case 4:
                    _state.sent();
                    _state.label = 5;
                case 5:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        3
                    ];
                case 6:
                    return [
                        3,
                        9
                    ];
                case 7:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        9
                    ];
                case 8:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 9:
                    removeModuleFromGraph = function(filePath) {
                        var module2 = graph[filePath];
                        if (module2) {
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = module2.dependencyPaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var dependencyPath = _step.value;
                                    if (graph[dependencyPath]) {
                                        graph[dependencyPath].dependentPaths = graph[dependencyPath].dependentPaths.filter(function(dependentPath) {
                                            return dependentPath !== filePath;
                                        });
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            delete graph[filePath];
                        }
                    };
                    return [
                        2,
                        [
                            graph,
                            function() {
                                var _ref = _async_to_generator(function(event, pathToModified) {
                                    var filesInsideAddedDirectory, modulesInsideAddedDirectory, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, filePath, err, filesInsideDeletedDirectory, modulesInsideDeletedDirectory, _iteratorAbruptCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, _value1, filePath1, err1;
                                    return _ts_generator(this, function(_state) {
                                        switch(_state.label){
                                            case 0:
                                                switch(event){
                                                    case "change":
                                                        return [
                                                            3,
                                                            1
                                                        ];
                                                    case "add":
                                                        return [
                                                            3,
                                                            4
                                                        ];
                                                    case "addDir":
                                                        return [
                                                            3,
                                                            7
                                                        ];
                                                    case "unlink":
                                                        return [
                                                            3,
                                                            22
                                                        ];
                                                    case "unlinkDir":
                                                        return [
                                                            3,
                                                            23
                                                        ];
                                                }
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 1:
                                                if (!isJavascriptModule(pathToModified)) return [
                                                    3,
                                                    3
                                                ];
                                                return [
                                                    4,
                                                    updateModuleDependenciesInGraph(pathToModified)
                                                ];
                                            case 2:
                                                _state.sent();
                                                _state.label = 3;
                                            case 3:
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 4:
                                                if (!isJavascriptModule(pathToModified)) return [
                                                    3,
                                                    6
                                                ];
                                                return [
                                                    4,
                                                    updateModuleDependenciesInGraph(pathToModified)
                                                ];
                                            case 5:
                                                _state.sent();
                                                _state.label = 6;
                                            case 6:
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 7:
                                                return [
                                                    4,
                                                    readAllFilesInsideDirectory(pathToModified)
                                                ];
                                            case 8:
                                                filesInsideAddedDirectory = _state.sent();
                                                modulesInsideAddedDirectory = filesInsideAddedDirectory.filter(isJavascriptModule);
                                                _iteratorAbruptCompletion = false, _didIteratorError = false;
                                                _state.label = 9;
                                            case 9:
                                                _state.trys.push([
                                                    9,
                                                    15,
                                                    16,
                                                    21
                                                ]);
                                                _iterator = _async_iterator(modulesInsideAddedDirectory);
                                                _state.label = 10;
                                            case 10:
                                                return [
                                                    4,
                                                    _iterator.next()
                                                ];
                                            case 11:
                                                if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                                                    3,
                                                    14
                                                ];
                                                _value = _step.value;
                                                filePath = _value;
                                                return [
                                                    4,
                                                    updateModuleDependenciesInGraph(filePath)
                                                ];
                                            case 12:
                                                _state.sent();
                                                _state.label = 13;
                                            case 13:
                                                _iteratorAbruptCompletion = false;
                                                return [
                                                    3,
                                                    10
                                                ];
                                            case 14:
                                                return [
                                                    3,
                                                    21
                                                ];
                                            case 15:
                                                err = _state.sent();
                                                _didIteratorError = true;
                                                _iteratorError = err;
                                                return [
                                                    3,
                                                    21
                                                ];
                                            case 16:
                                                _state.trys.push([
                                                    16,
                                                    ,
                                                    19,
                                                    20
                                                ]);
                                                if (!(_iteratorAbruptCompletion && _iterator.return != null)) return [
                                                    3,
                                                    18
                                                ];
                                                return [
                                                    4,
                                                    _iterator.return()
                                                ];
                                            case 17:
                                                _state.sent();
                                                _state.label = 18;
                                            case 18:
                                                return [
                                                    3,
                                                    20
                                                ];
                                            case 19:
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                                return [
                                                    7
                                                ];
                                            case 20:
                                                return [
                                                    7
                                                ];
                                            case 21:
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 22:
                                                if (isJavascriptModule(pathToModified)) {
                                                    removeModuleFromGraph(pathToModified);
                                                }
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 23:
                                                return [
                                                    4,
                                                    readAllFilesInsideDirectory(pathToModified)
                                                ];
                                            case 24:
                                                filesInsideDeletedDirectory = _state.sent();
                                                modulesInsideDeletedDirectory = filesInsideDeletedDirectory.filter(isJavascriptModule);
                                                _iteratorAbruptCompletion1 = false, _didIteratorError1 = false;
                                                _state.label = 25;
                                            case 25:
                                                _state.trys.push([
                                                    25,
                                                    30,
                                                    31,
                                                    36
                                                ]);
                                                _iterator1 = _async_iterator(modulesInsideDeletedDirectory);
                                                _state.label = 26;
                                            case 26:
                                                return [
                                                    4,
                                                    _iterator1.next()
                                                ];
                                            case 27:
                                                if (!(_iteratorAbruptCompletion1 = !(_step1 = _state.sent()).done)) return [
                                                    3,
                                                    29
                                                ];
                                                _value1 = _step1.value;
                                                filePath1 = _value1;
                                                removeModuleFromGraph(filePath1);
                                                _state.label = 28;
                                            case 28:
                                                _iteratorAbruptCompletion1 = false;
                                                return [
                                                    3,
                                                    26
                                                ];
                                            case 29:
                                                return [
                                                    3,
                                                    36
                                                ];
                                            case 30:
                                                err1 = _state.sent();
                                                _didIteratorError1 = true;
                                                _iteratorError1 = err1;
                                                return [
                                                    3,
                                                    36
                                                ];
                                            case 31:
                                                _state.trys.push([
                                                    31,
                                                    ,
                                                    34,
                                                    35
                                                ]);
                                                if (!(_iteratorAbruptCompletion1 && _iterator1.return != null)) return [
                                                    3,
                                                    33
                                                ];
                                                return [
                                                    4,
                                                    _iterator1.return()
                                                ];
                                            case 32:
                                                _state.sent();
                                                _state.label = 33;
                                            case 33:
                                                return [
                                                    3,
                                                    35
                                                ];
                                            case 34:
                                                if (_didIteratorError1) {
                                                    throw _iteratorError1;
                                                }
                                                return [
                                                    7
                                                ];
                                            case 35:
                                                return [
                                                    7
                                                ];
                                            case 36:
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 37:
                                                return [
                                                    2
                                                ];
                                        }
                                    });
                                });
                                return function(event, pathToModified) {
                                    return _ref.apply(this, arguments);
                                };
                            }(),
                            {
                                resolveDependentsOf: function resolveDependentsOf(pathToModule) {
                                    var moduleEntry = graph[pathToModule];
                                    var dependentPaths = [];
                                    if (moduleEntry) {
                                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                        try {
                                            for(var _iterator = moduleEntry.dependentPaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                                var dependentPath = _step.value;
                                                var _dependentPaths;
                                                var dependentsOfDependent = resolveDependentsOf(dependentPath);
                                                (_dependentPaths = dependentPaths).push.apply(_dependentPaths, _to_consumable_array(dependentsOfDependent));
                                                dependentPaths.push(dependentPath);
                                            }
                                        } catch (err) {
                                            _didIteratorError = true;
                                            _iteratorError = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                    _iterator.return();
                                                }
                                            } finally{
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                            }
                                        }
                                    }
                                    return dependentPaths;
                                }
                            }
                        ]
                    ];
            }
        });
    });
    return function createDependencyGraph(directory) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/utils/preview/hot-reloading/setup-hot-reloading.ts
var setupHotreloading = function() {
    var _ref = _async_to_generator(function(devServer2, emailDirRelativePath) {
        var clients, io, changes, reload, absolutePathToEmailsDirectory, _ref, dependencyGraph, updateDependencyGraph, resolveDependentsOf, watcher, getFilesOutsideEmailsDirectory, filesOutsideEmailsDirectory, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, exit;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    clients = [];
                    io = new import_socket.Server(devServer2);
                    io.on("connection", function(client) {
                        clients.push(client);
                        client.on("disconnect", function() {
                            clients = clients.filter(function(item) {
                                return item !== client;
                            });
                        });
                    });
                    changes = [];
                    reload = (0, import_debounce.default)(function() {
                        clients.forEach(function(client) {
                            client.emit("reload", changes);
                        });
                        changes = [];
                    }, 150);
                    absolutePathToEmailsDirectory = import_node_path5.default.resolve(process.cwd(), emailDirRelativePath);
                    return [
                        4,
                        createDependencyGraph(absolutePathToEmailsDirectory)
                    ];
                case 1:
                    _ref = _sliced_to_array.apply(void 0, [
                        _state.sent(),
                        3
                    ]), dependencyGraph = _ref[0], updateDependencyGraph = _ref[1], resolveDependentsOf = _ref[2].resolveDependentsOf;
                    watcher = (0, import_chokidar.watch)(emailDirRelativePath, {
                        ignoreInitial: true,
                        cwd: process.cwd(),
                        // eslint-disable-next-line prefer-named-capture-group
                        ignored: /(^|[/\\])\../
                    });
                    getFilesOutsideEmailsDirectory = function() {
                        return Object.keys(dependencyGraph).filter(function(p) {
                            return import_node_path5.default.relative(absolutePathToEmailsDirectory, p).startsWith("..");
                        });
                    };
                    filesOutsideEmailsDirectory = getFilesOutsideEmailsDirectory();
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(_iterator = filesOutsideEmailsDirectory[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            p = _step.value;
                            watcher.add(p);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    exit = function() {
                        var _ref = _async_to_generator(function() {
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            watcher.close()
                                        ];
                                    case 1:
                                        _state.sent();
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                        return function exit() {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    process.on("SIGINT", exit);
                    process.on("uncaughtException", exit);
                    watcher.on("all", function() {
                        var _ref = _async_to_generator(function(event, relativePathToChangeTarget) {
                            var file, pathToChangeTarget, newFilesOutsideEmailsDirectory, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, p1, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, dependentPath;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        file = relativePathToChangeTarget.split(import_node_path5.default.sep);
                                        if (file.length === 0) {
                                            return [
                                                2
                                            ];
                                        }
                                        pathToChangeTarget = import_node_path5.default.resolve(process.cwd(), relativePathToChangeTarget);
                                        return [
                                            4,
                                            updateDependencyGraph(event, pathToChangeTarget)
                                        ];
                                    case 1:
                                        _state.sent();
                                        newFilesOutsideEmailsDirectory = getFilesOutsideEmailsDirectory();
                                        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                        try {
                                            for(_iterator = filesOutsideEmailsDirectory[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                                p = _step.value;
                                                if (!newFilesOutsideEmailsDirectory.includes(p)) {
                                                    watcher.unwatch(p);
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError = true;
                                            _iteratorError = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                    _iterator.return();
                                                }
                                            } finally{
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                            }
                                        }
                                        _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                                        try {
                                            for(_iterator1 = newFilesOutsideEmailsDirectory[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                                p1 = _step1.value;
                                                if (!filesOutsideEmailsDirectory.includes(p1)) {
                                                    watcher.add(p1);
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError1 = true;
                                            _iteratorError1 = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                                    _iterator1.return();
                                                }
                                            } finally{
                                                if (_didIteratorError1) {
                                                    throw _iteratorError1;
                                                }
                                            }
                                        }
                                        filesOutsideEmailsDirectory = newFilesOutsideEmailsDirectory;
                                        changes.push({
                                            event: event,
                                            filename: relativePathToChangeTarget
                                        });
                                        _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
                                        try {
                                            for(_iterator2 = resolveDependentsOf(pathToChangeTarget)[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                                                dependentPath = _step2.value;
                                                changes.push({
                                                    event: "change",
                                                    filename: import_node_path5.default.relative(absolutePathToEmailsDirectory, dependentPath)
                                                });
                                            }
                                        } catch (err) {
                                            _didIteratorError2 = true;
                                            _iteratorError2 = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                                    _iterator2.return();
                                                }
                                            } finally{
                                                if (_didIteratorError2) {
                                                    throw _iteratorError2;
                                                }
                                            }
                                        }
                                        reload();
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                        return function(event, relativePathToChangeTarget) {
                            return _ref.apply(this, arguments);
                        };
                    }());
                    return [
                        2,
                        watcher
                    ];
            }
        });
    });
    return function setupHotreloading(devServer2, emailDirRelativePath) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/dev.ts
var dev = function() {
    var _ref = _async_to_generator(function(param) {
        var emailsDirRelativePath, port, devServer2, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    emailsDirRelativePath = param.dir, port = param.port;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        4,
                        ,
                        5
                    ]);
                    if (!import_node_fs4.default.existsSync(emailsDirRelativePath)) {
                        throw new Error("Missing ".concat(emailsDirRelativePath, " folder"));
                    }
                    return [
                        4,
                        startDevServer(emailsDirRelativePath, emailsDirRelativePath, // defaults to ./emails/static for the static files that are served to the preview
                        parseInt(port))
                    ];
                case 2:
                    devServer2 = _state.sent();
                    return [
                        4,
                        setupHotreloading(devServer2, emailsDirRelativePath)
                    ];
                case 3:
                    _state.sent();
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    console.log(error);
                    process.exit(1);
                    return [
                        3,
                        5
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    });
    return function dev(_) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/export.ts
var import_node_fs7 = __toESM(require("fs"));
var import_node_path8 = __toESM(require("path"));
var import_glob = require("glob");
var import_esbuild = require("esbuild");
var import_ora2 = __toESM(require("ora"));
var import_log_symbols2 = __toESM(require("log-symbols"));
var import_normalize_path = __toESM(require("normalize-path"));
// src/actions/get-emails-directory-metadata.ts
var import_node_fs5 = __toESM(require("fs"));
var import_node_path6 = __toESM(require("path"));
var isFileAnEmail = function(fullPath) {
    var stat = import_node_fs5.default.statSync(fullPath);
    if (stat.isDirectory()) return false;
    var ext = import_node_path6.default.parse(fullPath).ext;
    if (![
        ".js",
        ".tsx",
        ".jsx"
    ].includes(ext)) return false;
    if (!import_node_fs5.default.existsSync(fullPath)) {
        return false;
    }
    var fileContents = import_node_fs5.default.readFileSync(fullPath, "utf8");
    return /\bexport\s+default\b/gm.test(fileContents);
};
var mergeDirectoriesWithSubDirectories = function(emailsDirectoryMetadata) {
    var currentResultingMergedDirectory = emailsDirectoryMetadata;
    while(currentResultingMergedDirectory.emailFilenames.length === 0 && currentResultingMergedDirectory.subDirectories.length === 1){
        var onlySubDirectory = currentResultingMergedDirectory.subDirectories[0];
        currentResultingMergedDirectory = {
            subDirectories: onlySubDirectory.subDirectories,
            emailFilenames: onlySubDirectory.emailFilenames,
            absolutePath: onlySubDirectory.absolutePath,
            directoryName: import_node_path6.default.join(currentResultingMergedDirectory.directoryName, onlySubDirectory.directoryName)
        };
    }
    return currentResultingMergedDirectory;
};
var getEmailsDirectoryMetadata = function() {
    var _ref = _async_to_generator(function(absolutePathToEmailsDirectory) {
        var keepFileExtensions, dirents, emailFilenames, subDirectories;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    keepFileExtensions = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : false;
                    if (!import_node_fs5.default.existsSync(absolutePathToEmailsDirectory)) return [
                        2
                    ];
                    return [
                        4,
                        import_node_fs5.default.promises.readdir(absolutePathToEmailsDirectory, {
                            withFileTypes: true
                        })
                    ];
                case 1:
                    dirents = _state.sent();
                    emailFilenames = dirents.filter(function(dirent) {
                        return isFileAnEmail(import_node_path6.default.join(absolutePathToEmailsDirectory, dirent.name));
                    }).map(function(dirent) {
                        return keepFileExtensions ? dirent.name : dirent.name.replace(import_node_path6.default.extname(dirent.name), "");
                    });
                    return [
                        4,
                        Promise.all(dirents.filter(function(dirent) {
                            return dirent.isDirectory() && !dirent.name.startsWith("_") && dirent.name !== "static";
                        }).map(function(dirent) {
                            return getEmailsDirectoryMetadata(import_node_path6.default.join(absolutePathToEmailsDirectory, dirent.name));
                        }))
                    ];
                case 2:
                    subDirectories = _state.sent();
                    return [
                        2,
                        mergeDirectoriesWithSubDirectories({
                            absolutePath: absolutePathToEmailsDirectory,
                            directoryName: absolutePathToEmailsDirectory.split(import_node_path6.default.sep).pop(),
                            emailFilenames: emailFilenames,
                            subDirectories: subDirectories
                        })
                    ];
            }
        });
    });
    return function getEmailsDirectoryMetadata(absolutePathToEmailsDirectory) {
        return _ref.apply(this, arguments);
    };
}();
// src/utils/render-resolver-esbuild-plugin.ts
var import_node_path7 = __toESM(require("path"));
var import_node_fs6 = require("fs");
function escapeStringForRegex(string) {
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var renderResolver = function(emailTemplates) {
    return {
        name: "render-resolver",
        setup: function(b) {
            b.onLoad({
                filter: new RegExp(emailTemplates.map(function(emailPath) {
                    return escapeStringForRegex(emailPath);
                }).join("|"))
            }, function() {
                var _ref = _async_to_generator(function(param) {
                    var pathToFile, _tmp, _, _1;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                pathToFile = param.path;
                                _tmp = {};
                                _1 = (_ = "").concat;
                                return [
                                    4,
                                    import_node_fs6.promises.readFile(pathToFile, "utf8")
                                ];
                            case 1:
                                return [
                                    2,
                                    (_tmp.contents = _1.apply(_, [
                                        _state.sent(),
                                        ";\n          export { renderAsync } from 'react-email-module-that-will-export-render'\n        "
                                    ]), _tmp.loader = import_node_path7.default.extname(pathToFile).slice(1), _tmp)
                                ];
                        }
                    });
                });
                return function(_) {
                    return _ref.apply(this, arguments);
                };
            }());
            b.onResolve({
                filter: /^react-email-module-that-will-export-render$/
            }, function() {
                var _ref = _async_to_generator(function(args) {
                    var options, result;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                options = {
                                    kind: "import-statement",
                                    importer: args.importer,
                                    resolveDir: args.resolveDir,
                                    namespace: args.namespace
                                };
                                return [
                                    4,
                                    b.resolve("@react-email/render", options)
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.errors.length === 0) {
                                    return [
                                        2,
                                        result
                                    ];
                                }
                                return [
                                    4,
                                    b.resolve("@react-email/components", options)
                                ];
                            case 2:
                                result = _state.sent();
                                if (result.errors.length > 0 && result.errors[0]) {
                                    result.errors[0].text = "Failed trying to import `renderAsync` from either `@react-email/render` or `@react-email/components` to be able to render your email template.\n Maybe you don't have either of them installed?";
                                }
                                return [
                                    2,
                                    result
                                ];
                        }
                    });
                });
                return function(args) {
                    return _ref.apply(this, arguments);
                };
            }());
        }
    };
};
// src/cli/commands/export.ts
var import_react = require("react");
var getEmailTemplatesFromDirectory = function(emailDirectory) {
    var templatePaths = [];
    emailDirectory.emailFilenames.forEach(function(filename) {
        return templatePaths.push(import_node_path8.default.join(emailDirectory.absolutePath, filename));
    });
    emailDirectory.subDirectories.forEach(function(directory) {
        var _templatePaths;
        (_templatePaths = templatePaths).push.apply(_templatePaths, _to_consumable_array(getEmailTemplatesFromDirectory(directory)));
    });
    return templatePaths;
};
var exportTemplates = function() {
    var _ref = _async_to_generator(function(pathToWhereEmailMarkupShouldBeDumped, emailsDirectoryPath, options) {
        var spinner, emailsDirectoryMetadata, allTemplates, exception, buildFailure, allBuiltTemplates, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, template, emailModule, rendered, htmlPath, exception1, err, staticDirectoryPath, pathToDumpStaticFilesInto, exception2, fileTree;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (import_node_fs7.default.existsSync(pathToWhereEmailMarkupShouldBeDumped)) {
                        import_node_fs7.default.rmSync(pathToWhereEmailMarkupShouldBeDumped, {
                            recursive: true
                        });
                    }
                    if (!options.silent) {
                        spinner = (0, import_ora2.default)("Preparing files...\n").start();
                        closeOraOnSIGNIT(spinner);
                    }
                    return [
                        4,
                        getEmailsDirectoryMetadata(import_node_path8.default.resolve(process.cwd(), emailsDirectoryPath), true)
                    ];
                case 1:
                    emailsDirectoryMetadata = _state.sent();
                    if (typeof emailsDirectoryMetadata === "undefined") {
                        if (spinner) {
                            spinner.stopAndPersist({
                                symbol: import_log_symbols2.default.error,
                                text: "Could not find the directory at ".concat(emailsDirectoryPath)
                            });
                        }
                        return [
                            2
                        ];
                    }
                    allTemplates = getEmailTemplatesFromDirectory(emailsDirectoryMetadata);
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        4,
                        ,
                        5
                    ]);
                    return [
                        4,
                        (0, import_esbuild.build)({
                            bundle: true,
                            entryPoints: allTemplates,
                            plugins: [
                                renderResolver(allTemplates)
                            ],
                            platform: "node",
                            format: "cjs",
                            loader: {
                                ".js": "jsx"
                            },
                            outExtension: {
                                ".js": ".cjs"
                            },
                            jsx: "transform",
                            write: true,
                            outdir: pathToWhereEmailMarkupShouldBeDumped
                        })
                    ];
                case 3:
                    _state.sent();
                    return [
                        3,
                        5
                    ];
                case 4:
                    exception = _state.sent();
                    buildFailure = exception;
                    if (spinner) {
                        spinner.stopAndPersist({
                            symbol: import_log_symbols2.default.error,
                            text: "Failed to build emails"
                        });
                    }
                    console.warn(buildFailure.warnings);
                    console.error(buildFailure.errors);
                    throw new Error("esbuild bundling process for email templates failed:\n".concat(allTemplates.map(function(p) {
                        return "- ".concat(p);
                    }).join("\n")));
                case 5:
                    if (spinner) {
                        spinner.succeed();
                    }
                    allBuiltTemplates = import_glob.glob.sync((0, import_normalize_path.default)("".concat(pathToWhereEmailMarkupShouldBeDumped, "/**/*.cjs")), {
                        absolute: true
                    });
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 6;
                case 6:
                    _state.trys.push([
                        6,
                        13,
                        14,
                        15
                    ]);
                    _iterator = allBuiltTemplates[Symbol.iterator]();
                    _state.label = 7;
                case 7:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        12
                    ];
                    template = _step.value;
                    _state.label = 8;
                case 8:
                    _state.trys.push([
                        8,
                        10,
                        ,
                        11
                    ]);
                    if (spinner) {
                        spinner.text = "rendering ".concat(template.split("/").pop());
                        spinner.render();
                    }
                    delete require.cache[template];
                    emailModule = require(template);
                    return [
                        4,
                        emailModule.renderAsync((0, import_react.createElement)(emailModule.default, {}), options)
                    ];
                case 9:
                    rendered = _state.sent();
                    htmlPath = template.replace(".cjs", options.plainText ? ".txt" : ".html");
                    (0, import_node_fs7.writeFileSync)(htmlPath, rendered);
                    (0, import_node_fs7.unlinkSync)(template);
                    return [
                        3,
                        11
                    ];
                case 10:
                    exception1 = _state.sent();
                    if (spinner) {
                        spinner.stopAndPersist({
                            symbol: import_log_symbols2.default.error,
                            text: "failed when rendering ".concat(template.split("/").pop())
                        });
                    }
                    console.error(exception1);
                    throw exception1;
                case 11:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        7
                    ];
                case 12:
                    return [
                        3,
                        15
                    ];
                case 13:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        15
                    ];
                case 14:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 15:
                    if (spinner) {
                        spinner.succeed("Rendered all files");
                        spinner.text = "Copying static files";
                        spinner.render();
                    }
                    staticDirectoryPath = import_node_path8.default.join(emailsDirectoryPath, "static");
                    if (!import_node_fs7.default.existsSync(staticDirectoryPath)) return [
                        3,
                        20
                    ];
                    pathToDumpStaticFilesInto = import_node_path8.default.join(pathToWhereEmailMarkupShouldBeDumped, "static");
                    if (!import_node_fs7.default.existsSync(pathToDumpStaticFilesInto)) return [
                        3,
                        17
                    ];
                    return [
                        4,
                        import_node_fs7.default.promises.rm(pathToDumpStaticFilesInto, {
                            recursive: true
                        })
                    ];
                case 16:
                    _state.sent();
                    _state.label = 17;
                case 17:
                    _state.trys.push([
                        17,
                        19,
                        ,
                        20
                    ]);
                    return [
                        4,
                        import_node_fs7.default.promises.cp(staticDirectoryPath, pathToDumpStaticFilesInto, {
                            recursive: true
                        })
                    ];
                case 18:
                    _state.sent();
                    return [
                        3,
                        20
                    ];
                case 19:
                    exception2 = _state.sent();
                    console.error(exception2);
                    if (spinner) {
                        spinner.stopAndPersist({
                            symbol: import_log_symbols2.default.error,
                            text: "Failed to copy static files"
                        });
                    }
                    throw new Error("Something went wrong while copying the file to ".concat(pathToWhereEmailMarkupShouldBeDumped, "/static, ").concat(exception2));
                case 20:
                    if (!(spinner && !options.silent)) return [
                        3,
                        22
                    ];
                    spinner.succeed();
                    return [
                        4,
                        tree(pathToWhereEmailMarkupShouldBeDumped, 4)
                    ];
                case 21:
                    fileTree = _state.sent();
                    console.log(fileTree);
                    spinner.stopAndPersist({
                        symbol: import_log_symbols2.default.success,
                        text: "Successfully exported emails"
                    });
                    _state.label = 22;
                case 22:
                    return [
                        2
                    ];
            }
        });
    });
    return function exportTemplates(pathToWhereEmailMarkupShouldBeDumped, emailsDirectoryPath, options) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/build.ts
var import_node_fs8 = __toESM(require("fs"));
var import_node_path9 = __toESM(require("path"));
var import_ora3 = __toESM(require("ora"));
var import_node_child_process = require("child_process");
var import_log_symbols3 = __toESM(require("log-symbols"));
var buildPreviewApp = function(absoluteDirectory) {
    return new Promise(function(resolve2, reject) {
        var nextBuild = (0, import_node_child_process.spawn)("npm", [
            "run",
            "build"
        ], {
            cwd: absoluteDirectory,
            shell: true
        });
        nextBuild.stdout.pipe(process.stdout);
        nextBuild.stderr.pipe(process.stderr);
        nextBuild.on("close", function(code) {
            if (code === 0) {
                resolve2();
            } else {
                reject(new Error("Unable to build the Next app and it exited with code: ".concat(code)));
            }
        });
    });
};
var setNextEnvironmentVariablesForBuild = function() {
    var _ref = _async_to_generator(function(emailsDirRelativePath, builtPreviewAppPath) {
        var envVariables, nextConfigContents;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    envVariables = _object_spread_props(_object_spread({}, getEnvVariablesForPreviewApp(// If we don't do normalization here, stuff like https://github.com/resend/react-email/issues/1354 happens.
                    import_node_path9.default.normalize(emailsDirRelativePath), "PLACEHOLDER", "PLACEHOLDER")), {
                        NEXT_PUBLIC_IS_BUILDING: "true"
                    });
                    nextConfigContents = "\nconst path = require('path');\n/** @type {import('next').NextConfig} */\nmodule.exports = {\n  env: {\n    ...".concat(JSON.stringify(envVariables), ",\n    NEXT_PUBLIC_USER_PROJECT_LOCATION: path.resolve(process.cwd(), '../'),\n    NEXT_PUBLIC_CLI_PACKAGE_LOCATION: process.cwd(),\n  },\n  // this is needed so that the code for building emails works properly\n  webpack: (\n    /** @type {import('webpack').Configuration & { externals: string[] }} */\n    config,\n    { isServer }\n  ) => {\n    if (isServer) {\n      config.externals.push('esbuild');\n    }\n\n    return config;\n  },\n  typescript: {\n    ignoreBuildErrors: true\n  },\n  eslint: {\n    ignoreDuringBuilds: true\n  },\n  experimental: {\n    webpackBuildWorker: true\n  },\n}");
                    return [
                        4,
                        import_node_fs8.default.promises.writeFile(import_node_path9.default.resolve(builtPreviewAppPath, "./next.config.js"), nextConfigContents, "utf8")
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return function setNextEnvironmentVariablesForBuild(emailsDirRelativePath, builtPreviewAppPath) {
        return _ref.apply(this, arguments);
    };
}();
var getEmailSlugsFromEmailDirectory = function(emailDirectory, emailsDirectoryAbsolutePath) {
    var directoryPathRelativeToEmailsDirectory = emailDirectory.absolutePath.replace(emailsDirectoryAbsolutePath, "").trim();
    var slugs = [];
    emailDirectory.emailFilenames.forEach(function(filename) {
        return slugs.push(import_node_path9.default.join(directoryPathRelativeToEmailsDirectory, filename).split(import_node_path9.default.sep).filter(function(segment) {
            return segment.length > 0;
        }));
    });
    emailDirectory.subDirectories.forEach(function(directory) {
        var _slugs;
        (_slugs = slugs).push.apply(_slugs, _to_consumable_array(getEmailSlugsFromEmailDirectory(directory, emailsDirectoryAbsolutePath)));
    });
    return slugs;
};
var forceSSGForEmailPreviews = function() {
    var _ref = _async_to_generator(function(emailsDirPath, builtPreviewAppPath) {
        var emailDirectoryMetadata, parameters;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return [
                        4,
                        getEmailsDirectoryMetadata(emailsDirPath)
                    ];
                case 1:
                    emailDirectoryMetadata = _state.sent();
                    parameters = getEmailSlugsFromEmailDirectory(emailDirectoryMetadata, emailsDirPath).map(function(slug) {
                        return {
                            slug: slug
                        };
                    });
                    return [
                        4,
                        import_node_fs8.default.promises.appendFile(import_node_path9.default.resolve(builtPreviewAppPath, "./src/app/preview/[...slug]/page.tsx"), "\n\nexport function generateStaticParams() { \n  return Promise.resolve(\n    ".concat(JSON.stringify(parameters), "\n  );\n}"), "utf8")
                    ];
                case 2:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return function forceSSGForEmailPreviews(emailsDirPath, builtPreviewAppPath) {
        return _ref.apply(this, arguments);
    };
}();
var updatePackageJson = function() {
    var _ref = _async_to_generator(function(builtPreviewAppPath) {
        var packageJsonPath, packageJson, _;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    packageJsonPath = import_node_path9.default.resolve(builtPreviewAppPath, "./package.json");
                    _ = JSON.parse;
                    return [
                        4,
                        import_node_fs8.default.promises.readFile(packageJsonPath, "utf8")
                    ];
                case 1:
                    packageJson = _.apply(JSON, [
                        _state.sent()
                    ]);
                    packageJson.scripts.build = "next build";
                    packageJson.scripts.start = "next start";
                    packageJson.name = "preview-server";
                    delete packageJson.devDependencies["@react-email/render"];
                    delete packageJson.devDependencies["@react-email/components"];
                    packageJson.dependencies.sharp = "0.33.2";
                    return [
                        4,
                        import_node_fs8.default.promises.writeFile(packageJsonPath, JSON.stringify(packageJson), "utf8")
                    ];
                case 2:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return function updatePackageJson(builtPreviewAppPath) {
        return _ref.apply(this, arguments);
    };
}();
var npmInstall = function() {
    var _ref = _async_to_generator(function(builtPreviewAppPath, packageManager) {
        return _ts_generator(this, function(_state) {
            return [
                2,
                new Promise(function() {
                    var _ref = _async_to_generator(function(resolve2, reject) {
                        var childProc;
                        return _ts_generator(this, function(_state) {
                            childProc = (0, import_node_child_process.spawn)(packageManager, [
                                "install",
                                "--silent"
                            ], {
                                cwd: builtPreviewAppPath,
                                shell: true
                            });
                            childProc.stdout.pipe(process.stdout);
                            childProc.stderr.pipe(process.stderr);
                            childProc.on("close", function(code) {
                                if (code === 0) {
                                    resolve2();
                                } else {
                                    reject(new Error("Unable to install the dependencies and it exited with code: ".concat(code)));
                                }
                            });
                            return [
                                2
                            ];
                        });
                    });
                    return function(resolve2, reject) {
                        return _ref.apply(this, arguments);
                    };
                }())
            ];
        });
    });
    return function npmInstall(builtPreviewAppPath, packageManager) {
        return _ref.apply(this, arguments);
    };
}();
var build2 = function() {
    var _ref = _async_to_generator(function(param) {
        var emailsDirRelativePath, packageManager, spinner, emailsDirPath, staticPath, builtPreviewAppPath, builtStaticDirectory, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    emailsDirRelativePath = param.dir, packageManager = param.packageManager;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        12,
                        ,
                        13
                    ]);
                    spinner = (0, import_ora3.default)({
                        text: "Starting build process...",
                        prefixText: "  "
                    }).start();
                    closeOraOnSIGNIT(spinner);
                    spinner.text = "Checking if emails folder exists";
                    if (!import_node_fs8.default.existsSync(emailsDirRelativePath)) {
                        throw new Error("Missing ".concat(emailsDirRelativePath, " folder"));
                    }
                    emailsDirPath = import_node_path9.default.join(process.cwd(), emailsDirRelativePath);
                    staticPath = import_node_path9.default.join(emailsDirPath, "static");
                    builtPreviewAppPath = import_node_path9.default.join(process.cwd(), ".react-email");
                    if (!import_node_fs8.default.existsSync(builtPreviewAppPath)) return [
                        3,
                        3
                    ];
                    spinner.text = "Deleting pre-existing `.react-email` folder";
                    return [
                        4,
                        import_node_fs8.default.promises.rm(builtPreviewAppPath, {
                            recursive: true
                        })
                    ];
                case 2:
                    _state.sent();
                    _state.label = 3;
                case 3:
                    spinner.text = "Copying preview app from CLI to `.react-email`";
                    return [
                        4,
                        import_node_fs8.default.promises.cp(cliPacakgeLocation, builtPreviewAppPath, {
                            recursive: true,
                            filter: function(source) {
                                return !/(\/|\\)cli(\/|\\)?/.test(source) && !/(\/|\\)\.next(\/|\\)?/.test(source) && !/(\/|\\)\.turbo(\/|\\)?/.test(source) && !/(\/|\\)node_modules(\/|\\)?$/.test(source);
                            }
                        })
                    ];
                case 4:
                    _state.sent();
                    if (!import_node_fs8.default.existsSync(staticPath)) return [
                        3,
                        6
                    ];
                    spinner.text = "Copying `static` folder into `.react-email/public/static`";
                    builtStaticDirectory = import_node_path9.default.resolve(builtPreviewAppPath, "./public/static");
                    return [
                        4,
                        import_node_fs8.default.promises.cp(staticPath, builtStaticDirectory, {
                            recursive: true
                        })
                    ];
                case 5:
                    _state.sent();
                    _state.label = 6;
                case 6:
                    spinner.text = "Setting Next environment variables for preview app to work properly";
                    return [
                        4,
                        setNextEnvironmentVariablesForBuild(emailsDirRelativePath, builtPreviewAppPath)
                    ];
                case 7:
                    _state.sent();
                    spinner.text = "Setting server side generation for the email preview pages";
                    return [
                        4,
                        forceSSGForEmailPreviews(emailsDirPath, builtPreviewAppPath)
                    ];
                case 8:
                    _state.sent();
                    spinner.text = "Updating package.json's build and start scripts";
                    return [
                        4,
                        updatePackageJson(builtPreviewAppPath)
                    ];
                case 9:
                    _state.sent();
                    spinner.text = "Installing dependencies on `.react-email`";
                    return [
                        4,
                        npmInstall(builtPreviewAppPath, packageManager)
                    ];
                case 10:
                    _state.sent();
                    spinner.stopAndPersist({
                        text: "Successfully prepared `.react-email` for `next build`",
                        symbol: import_log_symbols3.default.success
                    });
                    return [
                        4,
                        buildPreviewApp(builtPreviewAppPath)
                    ];
                case 11:
                    _state.sent();
                    return [
                        3,
                        13
                    ];
                case 12:
                    error = _state.sent();
                    console.log(error);
                    process.exit(1);
                    return [
                        3,
                        13
                    ];
                case 13:
                    return [
                        2
                    ];
            }
        });
    });
    return function build2(_) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/start.ts
var import_node_fs9 = __toESM(require("fs"));
var import_node_path10 = __toESM(require("path"));
var import_node_child_process2 = require("child_process");
var start = function() {
    var _ref = _async_to_generator(function() {
        var usersProjectLocation, builtPreviewPath, nextStart;
        return _ts_generator(this, function(_state) {
            try {
                usersProjectLocation = process.cwd();
                builtPreviewPath = import_node_path10.default.resolve(usersProjectLocation, "./.react-email");
                if (!import_node_fs9.default.existsSync(builtPreviewPath)) {
                    throw new Error("Could not find `.react-email`, maybe you haven't ran `email build`?");
                }
                nextStart = (0, import_node_child_process2.spawn)("npm", [
                    "start"
                ], {
                    cwd: builtPreviewPath,
                    shell: true
                });
                nextStart.stdout.pipe(process.stdout);
                nextStart.stderr.pipe(process.stderr);
            } catch (error) {
                console.log(error);
                process.exit(1);
            }
            return [
                2
            ];
        });
    });
    return function start() {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/index.ts
var PACKAGE_NAME = "react-email";
import_commander.program.name(PACKAGE_NAME).description("A live preview of your emails right in your browser").version(package_default.version);
import_commander.program.command("dev").description("Starts the preview email development app").option("-d, --dir <path>", "Directory with your email templates", "./emails").option("-p --port <port>", "Port to run dev server on", "3000").action(dev);
import_commander.program.command("build").description("Copies the preview app for onto .react-email and builds it").option("-d, --dir <path>", "Directory with your email templates", "./emails").option("-p --packageManager <name>", "Package name to use on installation on `.react-email`", "npm").action(build2);
import_commander.program.command("start").description('Runs the built preview app that is inside of ".react-email"').action(start);
import_commander.program.command("export").description("Build the templates to the `out` directory").option("--outDir <path>", "Output directory", "out").option("-p, --pretty", "Pretty print the output", false).option("-t, --plainText", "Set output format as plain text", false).option("-d, --dir <path>", "Directory with your email templates", "./emails").option("-s, --silent", "To, or not to show a spinner with process information", false).action(function(param) {
    var outDir = param.outDir, pretty = param.pretty, plainText = param.plainText, silent = param.silent, srcDir = param.dir;
    return exportTemplates(outDir, srcDir, {
        pretty: pretty,
        silent: silent,
        plainText: plainText
    });
});
import_commander.program.parse();
