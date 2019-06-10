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
        path = path.replace(/\/[^\/]+\/\.\.\//g, "/").replace(/\/\//g, "/");
        return path;
    }

    class Sword {
        constructor(dom, solitary = false) {
            this.dom = dom;
            this.defaultModuleRelPath = "modules";
            this.defaultModulePathRoot = window.location.href.replace(/https?:\/\/[^/]+/, "").replace(/\/[^\/]+$/, "");
            this.defaultModulePath = pathJoin(this.defaultModulePathRoot, this.defaultModuleRelPath);
            this.solitary = solitary;
            if (!solitary) {
                for (let i in Sword.exports) {
                    this[i] = Sword.exports[i];
                }
            }
            Sword.instances.push(this);
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
        define(moduleName, definer) {// 会为所有对象加入模块，除法该实例solitary为true
            if ((new Sword(document, true))) {}
            let module = new Module(moduleName);
            definer(function exports(methods) {
                module.Exports(methods);
            }.bind(this));
            if (this.solitary) {// solitary的实例不与其他实例发生作用
                this[moduleName] = module.exports;
                return this;
            }
            Sword.exports[moduleName] = module.exports;// 让Sword类自己也存一份，这么创建实例时就可以自动引入模块了，但是solitary的实例不会自动引入，也不会为Sword加入静态值
            for (let i = 0; i < Sword.instances.length; i++) {
                if (Sword.instances[i].solitary) continue;
                Sword.instances[i][moduleName] = module.exports;
            }
            return this;
        }
    }
    Sword.instances = [ ];
    Sword.exports = { };

    return Sword;
})();

const sword = new Sword(document);// 定义默认sword实例

window.sword = sword;
window.Sword = Sword;

export {
    sword, Sword
};