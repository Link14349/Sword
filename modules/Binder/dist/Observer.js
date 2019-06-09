"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeError = function (_Error) {
    _inherits(TypeError, _Error);

    function TypeError(message) {
        _classCallCheck(this, TypeError);

        var _this = _possibleConstructorReturn(this, (TypeError.__proto__ || Object.getPrototypeOf(TypeError)).call(this));

        _this.name = "TypeError";
        _this.message = message;
        return _this;
    }

    return TypeError;
}(Error);

function define(data, key, value, change) {
    var root = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : data;
    var keys = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

    observe(value, change, root, keys);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function get() {
            return value;
        },
        set: function set(v) {
            if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
                Object.keys(value).forEach(function (i) {
                    unbind(value, i);
                });
            }
            value = v;
            change(root, data, key, keys, value);
        }
    });
}
function unbind(data, key) {
    if (data && (typeof data === "undefined" ? "undefined" : _typeof(data)) == "object") {
        Object.keys(data[key]).forEach(function (value) {
            unbind(data[key], value);
        });
    }
    delete data[key];
}

function observe(data, change) {
    var root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : data;
    var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    if (!data || (typeof data === "undefined" ? "undefined" : _typeof(data)) != "object") return;
    Object.keys(data).forEach(function (value) {
        var k = [].concat(_toConsumableArray(keys));
        k.push(value);
        define(data, value, data[value], change, root, k);
    });
}

var Observer = exports.Observer = function () {
    function Observer(data) {
        var _this2 = this;

        _classCallCheck(this, Observer);

        if ((typeof data === "undefined" ? "undefined" : _typeof(data)) != "object") {
            console.error(new TypeError("'data' must be an object"));
        }
        this.__data = data;
        this.__ons = {};
        observe(data, function (root, data, key, keys, value) {
            if (_this2.haveListener("change")) _this2.emit("change", [root, data, keys, value]);
            // console.log("改变key: '" + key + "', newValue: " + value.toString());
        });
    }

    _createClass(Observer, [{
        key: "on",
        value: function on(name, cb) {
            this.__ons[name] = cb;
            return this;
        }
    }, {
        key: "emit",
        value: function emit(name, argv) {
            var _ons;

            (_ons = this.__ons)[name].apply(_ons, _toConsumableArray(argv));
            return this;
        }
    }, {
        key: "haveListener",
        value: function haveListener(name) {
            return !!this.__ons[name];
        }
    }]);

    return Observer;
}();
//# sourceMappingURL=Observer.js.map