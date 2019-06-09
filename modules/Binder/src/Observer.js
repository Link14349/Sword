"use strict";

class TypeError extends Error {
    constructor(message) {
        super();
        this.name = "TypeError";
        this.message = message;
    }
}

function define(data, key, value, change, root = data, keys = []) {
    observe(value, change, root, keys);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            return value;
        },
        set: (v) => {
            if (value && typeof value == "object") {
                Object.keys(value).forEach((i) => {
                    unbind(value, i);
                });
            }
            value = v;
            change(root, data, key, keys, value);
        }
    });
}
function unbind(data, key) {
    if (data && typeof data == "object") {
        Object.keys(data[key]).forEach((value) => {
            unbind(data[key], value);
        });
    }
    delete data[key];
}

function observe(data, change, root = data, keys = []) {
    if (!data || typeof data != "object") return;
    Object.keys(data).forEach((value) => {
        let k = [...keys];
        k.push(value);
        define(data, value, data[value], change, root, k);
    });
}

export class Observer {
    constructor(data) {
        if (typeof data != "object") {
            console.error(new TypeError("'data' must be an object"));
        }
        this.__data = data;
        this.__ons = { };
        observe(data, (root, data, key, keys, value) => {
            if (this.haveListener("change")) this.emit("change", [ root, data, keys, value ]);
            // console.log("改变key: '" + key + "', newValue: " + value.toString());
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
}