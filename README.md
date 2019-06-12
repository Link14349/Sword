# Sword
A front-end framework for rapid development like a sword

### Install
[With Zip compressed file](https://github.com/qianduanXIAOHAOZI/Sword/archive/master.zip)  
With npm: `$: npm install sword-framework`  
With yarn: `$: yarn add sword-framework`  

### Usage
### Definition Module
Prototype: `Sword.prototype.define(moduleName, definer)`
#### Example
```javascript
sword.define("dog", (exports) => {
    exports({
        say: () => { console.log("Wang!") },
        eat: () => { console.log("I'm eating...") }
    });
});
```
### Load Module & Use Module
Prototype: `Sword.prototype.use(moduleNames, cb)`
_Tips: Parameter 'cb' called when all modules are loaded._
__<font color="#f00">Do not use the module you want to load outside the callback function CB of use function, because at that time we are not sure if the module is loaded at this time.</font>__
#### Example
```javascript
sword.use([ "dog" ], () => {
    sword.dog.say();
    sword.dog.eat();
});
sword.dog.say();// Wrong, Because the module has not been loaded yet
```

### Load Module & Use Module By Promise
Prototype: `Sword.prototype.useSync(moduleNames)`
__<font color="#f00">Do not use a module outside the Promise. prototype. then method because we cannot guarantee that the module has been loaded (except await) when used.</font>__
#### Example 1
```javascript
sword.use([ "dog" ]).then(() => {
    sword.dog.say();
    sword.dog.eat();
});
sword.dog.say();// Wrong, Because the module has not been loaded yet
```
#### Example 2
```javascript
(async function() {})(
    (await sword.use([ "dog" ]));
    sword.dog.say();
    sword.dog.eat();
);
```

### Modules
- [JTML](modules/JTML/README.md)
- [Ajax](modules/Ajax/README.md)
- [Binder](modules/Binder/README.md)
