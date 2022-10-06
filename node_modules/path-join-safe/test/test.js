let chai = require('chai')
let expect = chai.expect

let path = require('path')
require('../path-join-safe.js')

describe('path.posix.joinSafe', ()=>{
	it('a/b/c + .. = undefined', ()=>{
		expect(path.posix.joinSafe('a/b/c', '..')).to.equal(undefined)
	})
	it('a/b/c + d + .. + .. = undefined', ()=>{
		expect(path.posix.joinSafe('a/b/c', 'd', '..', '..')).to.equal(undefined)
	})
	it('a/b/c + d + .. = a/b/c', ()=>{
		expect(path.posix.joinSafe('a/b/c', 'd', '..')).to.equal('a/b/c')
	})
	it('a/b/c + d + ../.. + c = a/b/c', ()=>{
		expect(path.posix.joinSafe('a/b/c', 'd', '../..', 'c')).to.equal('a/b/c')
	})
})
