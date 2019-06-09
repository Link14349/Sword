"use strict";

import { Observer } from "./Observer"

export class Watcher {
    constructor(data, bindingData, debug = false) {
        this.__data = data;
        this.__bindingData = bindingData;
        this.oberver = new Observer(data);
        this.__ons = { };
        this.__bindings = { };
        this.debug = debug;
        this.error = null;
        this.oberver.on("change", (root, data, keys, value, update = true) => {
            this.error = null;
            if (update) {
                let bd = this.__bindingData;
                let evalString = "bd";
                for (let i = 0; i < keys.length; i++) {
                    evalString += "[" + JSON.stringify(keys[i]) + "]";
                }
                if (this.__bindings[evalString]) evalString = this.__bindings[evalString];
                evalString += " = " + JSON.stringify(value);
                try {
                    eval(evalString);
                } catch (e) {
                    if (this.debug) console.error(e);
                    this.error = e;
                }
            }
            // console.log("change: " + keys + ": " + value);
            if (this.haveListener("change")) {
                this.emit("change", [ root, data, keys, value ]);
            }
        });
        this.oberver.init();
        this.on("update", () => {
            Object.keys(this.__data).forEach((key) => {
                Observer.unbind(this.__data, key);
            });
            this.oberver = new Observer(data);
        });
    }
    on(name, cb) {
        this.__ons[name] = cb;
        return this;
    }
    emit(name, argv) {
        this.__ons[name](...argv);
        return this;
    }
    haveListener(name) {
        return !!this.__ons[name];
    }
    bind(keys, newKeys) {
        let rk = "bd";
        for (let i = 0; i < keys.length; i++) {
            rk += "[" + JSON.stringify(keys[i]) + "]";
        }
        let nk = "bd";
        for (let i = 0; i < newKeys.length; i++) {
            nk += "[" + JSON.stringify(newKeys[i]) + "]";
        }
        this.__bindings[rk] = nk;
        if (this.error) {
            this.emit("update", [ ]);
        }
    }
}