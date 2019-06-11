# Sword Core APIs Documentation
## Usage
### Sword _(class)_
#### Prototypes
- `constructor(dom, [solitary = false)` _Create a Sword instance object. The 'dom' parameter is the action element of Sword instance object. The 'solitary' parameter is a label to indicate whether the Sword instance object is a module independent object, whether the added module adds modules to other instance objects, whether other instance objects have been introduced modules when created, and whether the object adds the same modules when other instance objects add modules._
- `updateModulePath()` _Update module import path_
- `modulePath(path)` _Setting module import path_
- `getModule(moduleName)` _Loading module_
- `async use(moduleNames, cb)` _Load and import modules(Please use the imported module in the callback function, because we can no longer guarantee that the module has been imported outside the callback function)_
- `useSync(moduleNames)` _Load and import the module, return a Promise, use await grammar or. then to use the imported module_
- `loadGlobal(moduleNames)` _Add loaded modules to the global_
- `define(moduleName, definer)` _Define the module, put the code to write the interface in the definer callback function, and the definer callback function has parameter exports function to export APIs_
#### Static members
- `pathJoin(root, ...paths)` _Connection Path_
- `instances` _Storing Sword class instance objects_
- `exports` _Store all imported modules_

### Default instance object
`sword`  
This instance object acts on the entire Web page because its DOM attribute is document.