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
            if (value != v && value && typeof value == "object") {
                Object.keys(value).forEach((i) => {
                    unbind(value, i);
                });
                observe(v, change, root, [...keys]);
            }
            value = v;
            change(root, data, key, keys, value);
        }
    });
    change(root, data, key, keys, value);
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
    }
    init() {// 为什么不和constructor合并到一起呢？那是因为init方法调用后，就会开始监听被绑定数据，但是有时这种操作是不合时宜的，再接下来的Watcher类中会产生错误，所以与构造函数分开
        observe(this.__data, (root, data, key, keys, value) => {
            if (this.haveListener("change")) this.emit("change", [ root, data, keys, value ]);
            // console.log("改变key: '" + key + "', newValue: " + value.toString());
        });
    }
    on(name, cb) {
        this.__ons[name] = cb;
        return this;
    }
    emit(name, argv = []) {
        this.__ons[name](...argv);
        return this;
    }
    haveListener(name) {
        return !!this.__ons[name];
    }
}

Observer.unbind = unbind;