/**
 * @name Sword
 * @description A front-end framework for rapid development like a sword
 * @author yhzheng
 * @license Apache-2.0
 * */
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sword = function () {
    var Module = function () {
        function Module(name) {
            _classCallCheck(this, Module);

            this.name = name;
            this.exports = {};
        }

        _createClass(Module, [{
            key: "Export",
            value: function Export(name, method) {
                this.exports[name] = method;
            }
        }, {
            key: "Exports",
            value: function Exports(methods) {
                for (var i in methods) {
                    this.exports[i] = methods[i];
                }
            }
        }]);

        return Module;
    }();

    function pathJoin(root) {
        var path = root;
        if (path[path.length - 1] == "/") {
            path = path.substring(0, path.length - 1);
        }

        for (var _len = arguments.length, paths = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            paths[_key - 1] = arguments[_key];
        }

        for (var i = 0; i < paths.length; i++) {
            path += "/" + paths[i];
            if (path[path.length - 1] == "/") {
                path = path.substring(0, path.length - 1);
            }
        }
        path = path.replace(/\/[^\/]+\/\.\.\//, "/");
        return path;
    }

    var Sword = function () {
        function Sword(dom) {
            _classCallCheck(this, Sword);

            this.dom = dom;
            this.defaultModuleRelPath = "modules";
            this.defaultModulePathRoot = window.location.href.replace(/https?:\/\/[^/]+/, "").replace(/\/[^\/]+$/, "");
            this.defaultModulePath = pathJoin(this.defaultModulePathRoot, this.defaultModuleRelPath);
        }

        _createClass(Sword, [{
            key: "updateModulePath",
            value: function updateModulePath() {
                this.defaultModulePath = pathJoin(this.defaultModulePathRoot, this.defaultModuleRelPath);
            }
        }, {
            key: "getModule",
            value: function getModule(moduleName) {
                var _this = this;

                return new Promise(function (resolve, reject) {
                    var script = document.createElement("script");
                    script.src = pathJoin(_this.defaultModulePath, moduleName, moduleName + ".js");
                    script.type = 'text/javascript';
                    _this.dom.getElementsByTagName("body")[0].appendChild(script);
                    script.onload = function () {
                        resolve(true);
                    };
                    script.onerror = function () {
                        resolve(false);
                    };
                });
            }
        }, {
            key: "use",
            value: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(moduleNames, cb) {
                    var i;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    i = 0;

                                case 1:
                                    if (!(i < moduleNames.length)) {
                                        _context.next = 9;
                                        break;
                                    }

                                    _context.next = 4;
                                    return this.getModule(moduleNames[i]);

                                case 4:
                                    if (_context.sent) {
                                        _context.next = 6;
                                        break;
                                    }

                                    console.error("Sword: Load module: '" + moduleNames[i] + "' failed");

                                case 6:
                                    i++;
                                    _context.next = 1;
                                    break;

                                case 9:
                                    if (cb) cb.call(this);
                                    return _context.abrupt("return", this);

                                case 11:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function use(_x, _x2) {
                    return _ref.apply(this, arguments);
                }

                return use;
            }()
        }, {
            key: "useSync",
            value: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(moduleNames) {
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    return _context3.abrupt("return", new Promise(function () {
                                        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve, reject) {
                                            var i;
                                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                    switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                            i = 0;

                                                        case 1:
                                                            if (!(i < moduleNames.length)) {
                                                                _context2.next = 9;
                                                                break;
                                                            }

                                                            _context2.next = 4;
                                                            return this.getModule(moduleNames[i]);

                                                        case 4:
                                                            if (_context2.sent) {
                                                                _context2.next = 6;
                                                                break;
                                                            }

                                                            console.error("Sword: Load module: '" + moduleNames[i] + "' failed");

                                                        case 6:
                                                            i++;
                                                            _context2.next = 1;
                                                            break;

                                                        case 9:
                                                            resolve(true);

                                                        case 10:
                                                        case "end":
                                                            return _context2.stop();
                                                    }
                                                }
                                            }, _callee2, this);
                                        }));

                                        return function (_x4, _x5) {
                                            return _ref3.apply(this, arguments);
                                        };
                                    }().bind(this)));

                                case 1:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                function useSync(_x3) {
                    return _ref2.apply(this, arguments);
                }

                return useSync;
            }()
        }, {
            key: "loadGlobal",
            value: function loadGlobal(moduleNames) {
                for (var i = 0; i < moduleNames.length; i++) {
                    window[moduleNames[i]] = this[moduleNames[i]];
                }
                return this;
            }
        }, {
            key: "define",
            value: function define(moduleName, definer) {
                var module = new Module(moduleName);
                definer(function exports(methods) {
                    module.Exports(methods);
                }.bind(this));
                this[moduleName] = module.exports;
                return this;
            }
        }]);

        return Sword;
    }();

    return Sword;
}();

var sword = new Sword(document); // 定义默认sword实例

window.Sword = Sword;
window.sword = sword;
//# sourceMappingURL=index.js.map