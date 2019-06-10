# Binder
Bind data, dynamically modify data.

## Usage
### Observer _(class)_
#### Prototypes
- `constructor(data)` _To create object instances_
- `init()` _To initialize object instances(__Why not merge with the constructor? That's because init method calls start listening for bound data, but sometimes this operation is inappropriate, and then the following Watcher class generates errors, so it's separate from the constructor.__)_
- `on(name, cb)` _Used to register event response callback functions_
- `emit(name, [...argv)` _Used to register event response callback functions_
- `haveListener(name)` _Response callback function used to determine whether to register an event_
#### Static members
- `unbind(data, key)` _Cancel Observer class to monitor key attribute value changes of object data_

<hr/>

### Watcher _(class)_
- `constructor(data, bindingData, [debug = false)` 'data' is the target of the surveillance, 'bindingData' is the object of the binding listener object, 'debug' is the equivalent of a switch that specifies whether debug mode is turned on and whether errors are thrown when Eval functions are encountered.
- `on(name, cb)` _Used to register event response callback functions_
- `emit(name, [...argv)` _Used to register event response callback functions_
- `haveListener(name)` _Response callback function used to determine whether to register an event_
- `bind(keys, newKeys)` _A new interpretation binding for the specified keys path for binding data is to change the original update path `bindingData ['key1', 'key2'], ['newKey1', 'newKey2'] `to `bindingData ['key1'] ['key2'] `newKey2', if the function `watcher.bind (['key1', 'key2'] `is used.`_
