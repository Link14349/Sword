"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

!function (sword) {
    var ajax = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
            var _ref2$type = _ref2.type,
                type = _ref2$type === undefined ? "get" : _ref2$type,
                success = _ref2.success,
                error = _ref2.error,
                data = _ref2.data,
                url = _ref2.url,
                _ref2$sync = _ref2.sync,
                sync = _ref2$sync === undefined ? false : _ref2$sync;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!sync) {
                                _context.next = 6;
                                break;
                            }

                            _context.next = 3;
                            return new Promise(function (resolve, reject) {
                                ajax[type.toLowerCase()](url, data, function (content) {
                                    resolve(content);
                                }, function (xrh) {
                                    reject(new HTTPError("HTTP request failed.\nRequest-Type: " + type + "; Request-URL: " + url + "; state: " + xrh.readyState + "; status: " + xrh.status));
                                });
                            });

                        case 3:
                            return _context.abrupt("return", _context.sent);

                        case 6:
                            ajax[type.toLowerCase()](url, data, success, error);

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function ajax(_x) {
            return _ref.apply(this, arguments);
        };
    }();

    // 定义HTTPError类用于抛出HTTPERROR
    var HTTPError = function (_Error) {
        _inherits(HTTPError, _Error);

        function HTTPError(message) {
            _classCallCheck(this, HTTPError);

            var _this = _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(this));

            _this.name = "HTTPError: ";
            _this.message = message;
            return _this;
        }

        return HTTPError;
    }(Error);

    function dataString(data) {
        var txt = "__token=" + Math.random(); // 默认首先添加一个令牌防止浏览器缓存
        for (var i in data) {
            txt += "&" + i + "=";
            var value = data[i];
            switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
                case "string":
                    txt += escape(value);
                    break;
                case "object":
                    txt += escape(JSON.stringify(value));
                    break;
                case "function":
                    txt += escape(value.toString());
                    break;
                case "undefined":
                    txt += escape("undefined");
                    break;
                default:
                    txt += escape(value.toString());
                    break;
            }
        }
        return txt;
    }
    function get(url, data, s, e) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "" + url + function () {
            var txt = dataString(data);
            if (txt != "") return "?" + txt;
            return "";
        }(), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 请求完成
                if (s) s(xhr.responseText);
            } else if (xhr.readyState == 4) {
                if (e) e(xhr);
            }
        };
        xhr.send();
    }
    function post(url, data, s, e) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 请求完成
                if (s) s(xhr.responseText);
            } else if (xhr.readyState == 4) {
                if (e) e(xhr);
            }
        };
        xhr.send(dataString(data));
    }

    ajax.get = get;
    ajax.post = post;
    sword.define("Ajax", function (exports) {
        exports({
            get: get, post: post, ajax: ajax
        });
    });
}(sword);
//# sourceMappingURL=index.js.map