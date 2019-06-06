"use strict";

!function (sword) {
    // 定义HTTPError类用于抛出HTTPERROR
    class HTTPError extends Error {
        constructor(message) {
            super();
            this.name = "HTTPError: ";
            this.message = message;
        }
    }

    function dataString(data) {
        let txt = "__token=" + Math.random();// 默认首先添加一个令牌防止浏览器缓存
        for (let i in data) {
            txt += "&" + i + "=";
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

    // ajax
    function get(url, data, s, e) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${url}${(() => {
            let txt = dataString(data);
            if (txt != "") return "?" + txt;
            return "";
        })()}`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {// 请求完成
                if (s) s(xhr.responseText);
            } else if (xhr.readyState == 4) {
                if (e) e(xhr);
            }
        };
        xhr.send();
    }
    function post(url, data, s, e) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 &&  xhr.status == 200 || xhr.status == 304) {// 请求完成
                if (s) s(xhr.responseText);
            } else if (xhr.readyState == 4) {
                if (e) e(xhr);
            }
        };
        xhr.send(dataString(data));
    }
    async function ajax({ type = "get", success, error, data, url, sync = false }) {
        if (sync) {
            return (await new Promise((resolve, reject) => {
                ajax[type.toLowerCase()](url, data, (content) => {
                    resolve(content);
                }, (xrh) => {
                    reject(new HTTPError(`HTTP request failed.\nRequest-Type: ${type}; Request-URL: ${url}; state: ${xrh.readyState}; status: ${xrh.status}`));
                });
            }));
        } else {
            ajax[type.toLowerCase()](url, data, success, error);
        }
    }
    ajax.get = get;
    ajax.post = post;

    // JSONP
    function __JSONP({ url, data, success, error, name = "JSONP_CALLBACK", outTime = 10000 }) {
        let head = document.getElementsByTagName("head")[0];
        let script = document.createElement("script");
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
            if (error) error({ loader: script, state: 0, message: "Timeout", outTime });
        }
        // 超时处理
        script.timer = setTimeout(loadError, outTime);
        // 加载错误处理
        script.onerror = loadError;
    }

    async function JSONP({url, data, success, error, name = "JSONP_CALLBACK", sync = false, outTime = 10000}) {
        if (sync) {
            return (await new Promise((resolve, reject) => {
                __JSONP({
                    url, data, success: (content) => {
                        resolve(content);
                    }, error: (err) => {
                        reject(new HTTPError(`HTTP request failed.\nRequest-Type: JSONP;\nError-Message: ${JSON.stringify(err, null, 4)}`));
                    }, name, outTime
                });
            }));
        } else {
            __JSONP({
                url, data, success, error, name, outTime
            });
        }
    }
    sword.define("Ajax", (exports) => {
        exports({
            get, post, ajax,
            JSONP
        });
    });
}(sword);