"use strict";

import { Observer } from "./Observer"

export class Watcher {
    constructor(data, bindingData) {
        this.__data = data;
        this.__bindingData = bindingData;
        this.oberver = new Observer(data);
        this.__ons = { };
        this.__bindings = { };
        this.oberver.on("change", (root, data, keys, value) => {
            let bd = this.__bindingData;
            let evalString = "bd";
            for (let i = 0; i < keys.length; i++) {
                evalString += "[" + JSON.stringify(keys[i]) + "]";
            }
            if (this.__bindings[evalString]) evalString = this.__bindings[evalString];
            evalString += " = " + JSON.stringify(value);
            eval(evalString);
            if (this.haveListener("change")) {
                this.emit("change", [ root, data, keys, value ]);
            }
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
    }
}