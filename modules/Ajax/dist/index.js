"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (sword) {
    function dataString(data) {
        var txt = "";
        for (var i in data) {
            if (txt == "") {
                txt += i + "=";
            } else {
                txt += "&" + i + "=";
            }
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
    function get(url, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "" + url + function () {
            var txt = dataString(data);
            if (txt != "") return "?" + txt;
            return "";
        }(), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 请求完成
                if (cb) cb(xhr.responseText);
            }
        };
        xhr.send();
    }
    function post(url, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 请求完成
                if (cb) cb(xhr.responseText);
            }
        };
        xhr.send(dataString(data));
    }
    sword.define("Ajax", function (exports) {
        exports({
            get: get, post: post
        });
    });
}(sword);
//# sourceMappingURL=index.js.map