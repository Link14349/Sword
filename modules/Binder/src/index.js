"use strict";

import { Observer } from "./Observer"
import { Watcher } from "./Watcher"
!function (sword) {
    sword.define("Binder", (exports) => {
        exports({ Observer, Watcher });
    });
}(sword);