"use strict";

!function (sword) {
    function dataString(data) {
        let txt = "";
        for (let i in data) {
            if (txt == "") {
                txt += i + "=";
            } else {
                txt += "&" + i + "=";
            }
            let value = data[i];
            switch (typeof value) {
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
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${url}${(() => {
            let txt = dataString(data);
            if (txt != "") return "?" + txt;
            return "";
        })()}`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {// 请求完成
                if (cb) cb(xhr.responseText);
            }
        };
        xhr.send();
    }
    function post(url, data, cb) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {// 请求完成
                if (cb) cb(xhr.responseText);
            }
        };
        xhr.send(dataString(data));
    }
    sword.define("Ajax", (exports) => {
        exports({
            get, post
        });
    });
}(sword);