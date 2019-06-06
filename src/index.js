/**
 * @name Sword
 * @description A front-end framework for rapid development like a sword
 * @author yhzheng
 * @license Apache-2.0
 * */
"use strict";

const Sword = (function () {
    class Module {
        constructor(name) {
            this.name = name;
            this.exports = {};
        }
        Export(name, method) {
            this.exports[name] = method;
        }
        Exports(methods) {
            for (let i in methods) {
                this.exports[i] = methods[i];
            }
        }
    }

    function pathJoin(root, ...paths) {
        let path = root;
        if (path[path.length - 1] == "/") {
            path = path.substring(0, path.length - 1);
        }
        for (let i = 0; i < paths.length; i++) {
            path += "/" + paths[i];
            if (path[path.length - 1] == "/") {
                path = path.substring(0, path.length - 1);
            }
        }
        path = path.replace(/\/[^\/]+\/\.\.\//, "/");
        return path;
    }

    class Sword {
        constructor(dom) {
            this.dom = dom;
            this.defaultModuleRelPath = "modules";
            this.defaultModulePathRoot = window.location.href.replace(/https?:\/\/[^/]+/, "").replace(/\/[^\/]+$/, "");
            this.defaultModulePath = pathJoin(this.defaultModulePathRoot, this.defaultModuleRelPath);
        }
        updateModulePath() {
            this.defaultModulePath = pathJoin(this.defaultModulePathRoot, this.defaultModuleRelPath);
        }
        modulePath(path) {
            this.defaultModuleRelPath = path;
            this.updateModulePath();
            return this;
        }
        getModule(moduleName) {
            return new Promise((resolve, reject) => {
                let script = document.createElement("script");
                script.src = pathJoin(this.defaultModulePath, moduleName, moduleName + ".js");
                script.type = 'text/javascript';
                this.dom.getElementsByTagName("body")[0].appendChild(script);
                script.onload = function () {
                    resolve(true);
                };
                script.onerror = function () {
                    resolve(false);
                };
            });
        }
        async use(moduleNames, cb) {
            for (let i = 0; i < moduleNames.length; i++) {
                if (!(await this.getModule(moduleNames[i]))) {
                    console.error("Sword: Load module: '" + moduleNames[i] + "' failed");
                }
            }
            if (cb) cb.call(this);
            return this;
        }
        async useSync(moduleNames) {
            return new Promise(async function (resolve, reject) {
                for (let i = 0; i < moduleNames.length; i++) {
                    if (!(await this.getModule(moduleNames[i]))) {
                        console.error("Sword: Load module: '" + moduleNames[i] + "' failed");
                    }
                }
                resolve(true);
            }.bind(this));
        }
        loadGlobal(moduleNames) {
            for (let i = 0; i < moduleNames.length; i++) {
                window[moduleNames[i]] = this[moduleNames[i]];
            }
            return this;
        }
        define(moduleName, definer) {
            let module = new Module(moduleName);
            definer(function exports(methods) {
                module.Exports(methods);
            }.bind(this));
            this[moduleName] = module.exports;
            return this;
        }
    }

    return Sword;
})();

export const sword = new Sword(document);// 定义默认sword实例

window.Sword = Sword;
window.sword = sword;