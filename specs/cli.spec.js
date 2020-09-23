/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/**
 *  NPM modules
 */
const debug = require('debug')('test')
const { describe } = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const { expect } = require('chai')
const chaiaspromise = require('chai-as-promised')
chai.use(chaiaspromise)
/**
 * DEBUG
 */
debug(`[APP][Mode][${process.env.NODE_ENV}]`)
debug('[APP][processing]', __filename.replace(process.cwd(), ''))
/**
 * Modules
 */
const { dummyPromise } = require('./test/dummy_promise')
const lib = require('../lib/')

// Snippet
// describe('', function () {
//   it('', function () {
//     expect('').to.be.equal('')
//   })
// })

describe('Start with dummy test', function () {
  it('dummy test case ', function () {
    return expect(true).to.be.true
  })
})

describe('Test suit for ƒ dummy Promise', function () {
  it('Promise resolved', function () {
    this.timeout(0) // wait until resolution
    return expect(dummyPromise()).to.eventually.equal(6)
  })
})

describe('Test suit for ƒ accessFileAsync Promise', function () {
  it('Promise rejected with TypeError and error code', function () {
    this.timeout(0)
    return expect(lib.accessFileAsync()).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('TypeError')
      expect(error.code).to.equal('ERR_INVALID_ARG_TYPE')
    })
  })
  it('Promise rejected with TypeError and error code', function () {
    this.timeout(0)
    return expect(lib.accessFileAsync(123)).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('TypeError')
      expect(error.code).to.equal('ERR_INVALID_ARG_TYPE')
    })
  })
  it('Promise rejected with Error and error code', function () {
    this.timeout(0)
    return expect(lib.accessFileAsync('./specs/test/FILE_NOT_FOUND.ext')).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('Error')
      expect(error.code).to.equal('ENOENT')
    })
  })
  it('Promise resolved with response Object', function () {
    this.timeout(0)
    const file_path = './specs/test/test.md'
    return expect(lib.accessFileAsync(file_path)).to.eventually.be.fulfilled.then((res) => {
      expect(res.response).to.equal(true)
      expect(res.file).to.equal(file_path)
    })
  })
})

describe('Test suit for ƒ ErrorHandler', function () {
  it('should throw with TypeError', function () {
    expect(() => lib.ErrorHandler()).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.ErrorHandler(123)).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.ErrorHandler(null)).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.ErrorHandler(undefined)).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.ErrorHandler([])).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.ErrorHandler('hello')).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.ErrorHandler(false)).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.ErrorHandler(() => {})).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
  })
  it('should call ƒ exit once with argument', function () {
    const spy = sinon.spy(lib, 'exit')
    const arg = "Error: no such file 'DROZERAH'"
    const obj = {
      code: 'ENOENT',
      value: 'DROZERAH'
    }
    lib.ErrorHandler(obj)
    expect(spy.calledOnce).to.be.true
    expect(spy.calledWith(arg)).to.be.true
    // expect(spy.returned(arg)).to.be.true
    spy.restore()
  })
  it('should call ƒ exit once with argument', function () {
    const spy = sinon.spy(lib, 'exit')
    const arg = 'TypeError: invalid argument type'
    const obj = {
      code: 'ERR_INVALID_ARG_TYPE',
      value: 'DROZERAH'
    }
    lib.ErrorHandler(obj)
    expect(spy.calledOnce).to.be.true
    expect(spy.calledWith(arg)).to.be.true
    spy.restore()
  })
})

describe('Test suit for ƒ exit', function () {
  it('should throw with TypeError', function () {
    expect(() => lib.exit()).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.exit(123)).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.exit(null)).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.exit(undefined)).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.exit(false)).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
    expect(() => lib.exit(() => {})).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
  })
  it('should log "user_cancelation"', function () {
    const stub = sinon.stub(console, 'log')
    const arg = 'user_cancelation'
    lib.exit(arg)
    expect(console.log.calledOnce).to.be.false
    // expect(console.log.calledWith(arg)).to.be.true
    stub.restore()
  })
})
