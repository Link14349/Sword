"use strict";

!function (sword) {
    function get(url, data, cb) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${url}${(() => {
            let txt = "";
            for (let i in data) {
                if (txt == "") {
                    txt += "?" + i + "=";
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
        })()}`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {// 请求完成
                if (cb) cb(xhr.responseText);
            }
        };
        xhr.send();
    }
    sword.define("Ajax", (exports) => {
        exports({
            get: get
        });
    });
}(sword);