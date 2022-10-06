# path-join-safe
Join pathes, return undefined if the resulting path is not within the path passed as the first argument.

## Usage
The module extends node's `path.posix` and `path.win32` with `joinSafe` methods, so it can be used like this:
```
const path = require('path')
/*const joinSafe = */require('path-join-safe') //joinSafe == path.joinSafe
let safe_path = path.posix.joinSafe('a/b/c', 'd') //returns 'a/b/c/d'
let unsafe_path = path.joinSafe('a/b/c', '..') //returns undefined
```
