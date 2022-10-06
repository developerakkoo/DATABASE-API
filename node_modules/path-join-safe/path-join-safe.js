let path = require('path')

function pathJoinSafePosix(dir) {
	dir = path.posix.normalize(dir)
	let pathname = path.posix.join.apply(path.posix, arguments)
	if (pathname.substr(0, dir.length) != dir) return
	return pathname
}

function pathJoinSafeWin32(dir) {
	dir = path.win32.normalize(dir)
	let pathname = path.win32.join.apply(path.win32, arguments)
	if (pathname.substr(0, dir.length) != dir) return
	return pathname
}

path.posix.joinSafe = pathJoinSafePosix
path.win32.joinSafe = pathJoinSafeWin32
module.exports = path.joinSafe
