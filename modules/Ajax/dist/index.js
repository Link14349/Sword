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

    var JSONP = function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref5) {
            var url = _ref5.url,
                data = _ref5.data,
                success = _ref5.success,
                error = _ref5.error,
                _ref5$name = _ref5.name,
                name = _ref5$name === undefined ? "JSONP_CALLBACK" : _ref5$name,
                _ref5$sync = _ref5.sync,
                sync = _ref5$sync === undefined ? false : _ref5$sync,
                _ref5$outTime = _ref5.outTime,
                outTime = _ref5$outTime === undefined ? 10000 : _ref5$outTime;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!sync) {
                                _context2.next = 6;
                                break;
                            }

                            _context2.next = 3;
                            return new Promise(function (resolve, reject) {
                                __JSONP({
                                    url: url, data: data, success: function success(content) {
                                        resolve(content);
                                    }, error: function error(err) {
                                        reject(new HTTPError("HTTP request failed.\nRequest-Type: JSONP;\nError-Message: " + JSON.stringify(err, null, 4)));
                                    }, name: name, outTime: outTime
                                });
                            });

                        case 3:
                            return _context2.abrupt("return", _context2.sent);

                        case 6:
                            __JSONP({
                                url: url, data: data, success: success, error: error, name: name, outTime: outTime
                            });

                        case 7:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function JSONP(_x2) {
            return _ref4.apply(this, arguments);
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

    // ajax
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

    // JSONP
    function __JSONP(_ref3) {
        var url = _ref3.url,
            data = _ref3.data,
            success = _ref3.success,
            error = _ref3.error,
            _ref3$name = _ref3.name,
            name = _ref3$name === undefined ? "JSONP_CALLBACK" : _ref3$name,
            _ref3$outTime = _ref3.outTime,
            outTime = _ref3$outTime === undefined ? 10000 : _ref3$outTime;

        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        data.__JSONP_CALLBACK = name;
        script.src = url + "?" + dataString(data);
        head.appendChild(script);

        window[name] = function (content) {
            head.removeChild(script);
            clearTimeout(script.timer);
            delete window[name];
            if (success) success(content);
        };

        function loadError() {
            head.removeChild(script);
            if (error) error({ loader: script, state: 0, message: "Timeout", outTime: outTime });
        }
        // 超时处理
        script.timer = setTimeout(loadError, outTime);
        // 加载错误处理
        script.onerror = loadError;
    }

    sword.define("Ajax", function (exports) {
        exports({
            get: get, post: post, ajax: ajax,
            JSONP: JSONP
        });
    });
}(sword);
//# sourceMappingURL=index.js.map