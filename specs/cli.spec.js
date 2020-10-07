/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

// Copyright (c) 2020 Thomas G. drozerah@gmail.com
// All rights reserved.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/**
 * Node Core Modules
 */
const fs = require('fs')
const path = require('path')
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
const { dummyPromise } = require('./test/data/promise')
const lib = require('../lib/')
const helper = require('./test/helpers')
/**
 * Testing Data
 */
const {
  structuringDataAsync_expected_data_structure_1,
  structuringDataAsync_input_data_structure_1,
  structuringDataAsync_expected_data_structure_2,
  structuringDataAsync_expected_data_structure_3
} = require('./test/data/structuringDataAsync')

const template_chunks = require('./test/data/template/index')

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

describe('Test suite for ƒ dummy Promise', function () {
  it('Promise resolved', function () {
    this.timeout(0) // wait until resolution
    return expect(dummyPromise()).to.eventually.equal(6)
  })
})

describe('Test suite for ƒ accessFileAsync', function () {
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
    return expect(lib.accessFileAsync('./specs/test/data/markdown/FILE_NOT_FOUND.ext')).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('Error')
      expect(error.code).to.equal('ENOENT')
    })
  })
  it('Promise resolved with response Object', function () {
    this.timeout(0)
    const file_path = './specs/test/data/markdown/test.md'
    return expect(lib.accessFileAsync(file_path)).to.eventually.be.fulfilled.then((res) => {
      expect(res.response).to.equal(true)
      expect(res.file).to.equal(file_path)
    })
  })
})

describe('Test suite for ƒ ErrorHandler', function () {
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
  it('1 should call ƒ exit once with argument', function () {
    const spy = sinon.spy(lib, 'exit')
    const arg = "Error: no such file or directory 'DROZERAH'"
    const obj = {
      code: 'ENOENT',
      value: 'DROZERAH' // this case needs value
    }
    lib.ErrorHandler(obj)
    expect(spy.calledOnce).to.be.true
    expect(spy.calledWith(arg)).to.be.true
    spy.restore()
  })
  it('2 should call ƒ exit once with argument', function () {
    const spy = sinon.spy(lib, 'exit')
    const arg = 'TypeError: invalid argument type'
    const obj = {
      code: 'ERR_INVALID_ARG_TYPE'
    }
    lib.ErrorHandler(obj)
    expect(spy.calledOnce).to.be.true
    expect(spy.calledWith(arg)).to.be.true
    spy.restore()
  })
  it('3 should call ƒ exit once with argument', function () {
    const spy = sinon.spy(lib, 'exit')
    const arg = 'Error: tag not found'
    const obj = {
      code: 'ERR_TAG_NOT_FOUND'
    }
    lib.ErrorHandler(obj)
    expect(spy.calledOnce).to.be.true
    expect(spy.calledWith(arg)).to.be.true
    spy.restore()
  })
  it('4 should call ƒ exit once with argument', function () {
    const spy = sinon.spy(lib, 'exit')
    const arg = 'Error: no registered dependencies'
    const obj = {
      code: 'ERR_DEPENDENCIES_NOT_FOUND'
    }
    lib.ErrorHandler(obj)
    expect(spy.calledOnce).to.be.true
    expect(spy.calledWith(arg)).to.be.true
    spy.restore()
  })
})

describe('Test suite for ƒ exit', function () {
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
    expect(stub.calledWith(arg)).to.be.true
    expect(stub.calledThrice).to.be.true
    stub.restore()
  })
  it('should log "Error: tag not found"', function () {
    const stub = sinon.stub(console, 'log')
    const arg = 'Error: tag not found'
    lib.exit(arg)
    expect(stub.calledWith(arg)).to.be.true
    expect(stub.calledThrice).to.be.true
    stub.restore()
  })
  it('should log "Error: no registered dependencies"', function () {
    const stub = sinon.stub(console, 'log')
    const arg = 'Error: no registered dependencies'
    lib.exit(arg)
    expect(stub.calledWith(arg)).to.be.true
    expect(stub.calledThrice).to.be.true
    stub.restore()
  })
})

describe('Test suite for ƒ readFileAsync', function () {
  it('Promise rejected with TypeError and error code', function () {
    this.timeout(0)
    return expect(lib.readFileAsync()).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('TypeError')
      expect(error.code).to.equal('ERR_INVALID_ARG_TYPE')
    })
  })
  it('Promise rejected with Error and error code', function () {
    this.timeout(0)
    return expect(lib.readFileAsync(123)).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('Error')
      expect(error.code).to.equal('EBADF')
    })
  })
  it('Promise rejected with Error and error code', function () {
    this.timeout(0)
    return expect(lib.readFileAsync('./specs/test/data/markdown/FILE_NOT_FOUND.ext')).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('Error')
      expect(error.code).to.equal('ENOENT')
    })
  })
  it('Promise resolved with response Object', function () {
    this.timeout(0)
    const file_path = './specs/test/data/markdown/test.md'
    return expect(lib.readFileAsync(file_path)).to.eventually.be.fulfilled.then((res) => {
      expect(res.response).to.equal(true)
      expect(res.data).to.equal('# This is a test file')
    })
  })
})

describe('Test suite for ƒ extractDependenciesAsync', function () {
  it('1 Promise rejected with TypeError and error code', function () {
    this.timeout(0)
    return expect(lib.extractDependenciesAsync()).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('TypeError')
    })
  })
  it('2 Promise resolved with response Object', function () {
    this.timeout(0)
    const file_path = path.resolve(process.cwd(), 'specs/test/data/extractDependenciesAsync/test_0_package.json')
    let data = fs.readFileSync(file_path, 'utf-8')
    data = JSON.parse(data)
    const expected_data_structure = { dependencies: [], devDependencies: [] }
    return expect(lib.extractDependenciesAsync(data)).to.eventually.be.fulfilled.then((res) => {
      expect(res).to.deep.equal(expected_data_structure)
    })
  })
  it('3 Promise resolved with response Object', function () {
    this.timeout(0)
    const file_path = path.resolve(process.cwd(), 'specs/test/data/extractDependenciesAsync/test_1_package.json')
    let data = fs.readFileSync(file_path, 'utf-8')
    data = JSON.parse(data)
    const expected_data_structure = { dependencies: ['web_dev'], devDependencies: ['drozerah'] }
    return expect(lib.extractDependenciesAsync(data)).to.eventually.be.fulfilled.then((res) => {
      expect(res).to.deep.equal(expected_data_structure)
    })
  })
  it('4 Promise resolved with response Object', function () {
    this.timeout(0)
    const file_path = path.resolve(process.cwd(), 'specs/test/data/extractDependenciesAsync/test_2_package.json')
    let data = fs.readFileSync(file_path, 'utf-8')
    data = JSON.parse(data)
    const expected_data_structure = { dependencies: [], devDependencies: ['drozerah'] }
    return expect(lib.extractDependenciesAsync(data)).to.eventually.be.fulfilled.then((res) => {
      expect(res).to.deep.equal(expected_data_structure)
    })
  })
  it('5 Promise resolved with response Object', function () {
    this.timeout(0)
    const file_path = path.resolve(process.cwd(), 'specs/test/data/extractDependenciesAsync/test_3_package.json')
    let data = fs.readFileSync(file_path, 'utf-8')
    data = JSON.parse(data)
    const expected_data_structure = { dependencies: ['web_dev'], devDependencies: [] }
    return expect(lib.extractDependenciesAsync(data)).to.eventually.be.fulfilled.then((res) => {
      expect(res).to.deep.equal(expected_data_structure)
    })
  })
})

describe('Test suite for ƒ createMarkdownLink', function () {
  it('should throw with TypeError', function () {
    expect(() => lib.createMarkdownLink()).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
  })
  it('should return a markdow formated link', function () {
    const link_url = 'https://github.com/drozerah'
    const link_text = 'Drozerah'
    expect(lib.createMarkdownLink(link_url, link_text)).to.be.a('string')
    expect(lib.createMarkdownLink(link_url, link_text)).to.equals(`[${link_text}](${link_url})`)
  })
  it('should return the package name only', function () {
    const link_text = 'Drozerah'
    expect(lib.createMarkdownLink(undefined, link_text)).to.be.a('string')
    expect(lib.createMarkdownLink(undefined, link_text)).to.equals(link_text)
  })
})

describe('Test suite for ƒ structuringDataAsync', function () {
  it('Promise rejected with TypeError', function () {
    this.timeout(0)
    return expect(lib.structuringDataAsync()).to.eventually.be.rejected.then((error) => {
      expect(error.name).to.equal('TypeError')
    })
  })
  it('Promise resolved should call createMarkdownLink', function () {
    const spy = sinon.spy(lib, 'createMarkdownLink')
    this.timeout(0)
    return expect(lib.structuringDataAsync(structuringDataAsync_input_data_structure_1))
      .to.eventually.be.fulfilled.then((res) => {
        return expect(res).to.deep.equal(structuringDataAsync_expected_data_structure_1)
      })
      .then((res) => {
        expect(spy.called).to.be.true
        spy.restore()
      })
  })
})

describe('Test suite for ƒ createTemplate', function () {
  it('should throw with TypeError', function () {
    expect(() => lib.createTemplate()).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
  })
  it('should render a well formatted template', function () {
    const expected_result = structuringDataAsync_expected_data_structure_1

    expect(lib.createTemplate(expected_result)).to.be.a('string')
    expect(lib.createTemplate(expected_result)).to.have.length.above(10)
    expect(lib.createTemplate(expected_result)).to.contains(template_chunks.dependencies)
    expect(lib.createTemplate(expected_result)).to.contains(template_chunks.devDependencies)
  })
  it('should render a well formatted template', function () {
    const expected_result = structuringDataAsync_expected_data_structure_2

    expect(lib.createTemplate(expected_result)).to.be.a('string')
    expect(lib.createTemplate(expected_result)).to.have.length.above(10)
    expect(lib.createTemplate(expected_result)).to.contains(template_chunks.dependencies)
    expect(lib.createTemplate(expected_result)).to.not.contains(template_chunks.devDependencies)
  })
  it('should render a well formatted template', function () {
    const expected_result = structuringDataAsync_expected_data_structure_3

    expect(lib.createTemplate(expected_result)).to.be.a('string')
    expect(lib.createTemplate(expected_result)).to.have.length.above(10)
    expect(lib.createTemplate(expected_result)).to.not.contains(template_chunks.dependencies)
    expect(lib.createTemplate(expected_result)).to.contains(template_chunks.devDependencies)
  })
})

describe('Test suite for ƒ addTemplateAsync', function () {
  before(function (done) {
    return helper.removeTemplateBeforeSync(done)
  })
  it('should throw with TypeError', function () {
    expect(lib.addTemplateAsync).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
  })
  it('Promise rejected with file not found', function () {
    this.timeout(0)
    const template = template_chunks.template
    const file_path_error = 'not-found-file.md'
    return expect(lib.addTemplateAsync(file_path_error, template)).to.eventually.be.rejected.then((error) => {
      // console.log('---------Error----------') // !DEBUG
      // console.log(error) // !DEBUG
      // console.log(error.name) // !DEBUG
      // console.log(error.code) // !DEBUG
      // console.log(error.message) // !DEBUG
      // console.log('------------------------') // !DEBUG
      expect(error.name).to.equal('Error')
      expect(error.code).to.equal('ENOENT')
    })
  })
  it('Promise rejected with tag error', function () {
    this.timeout(0)
    const template = template_chunks.template
    const file_path = path.join(process.cwd(), 'specs/test/data/markdown/test.md')
    return expect(lib.addTemplateAsync(file_path, template)).to.eventually.be.rejected.then((error) => {
      // console.log('--------ERROR---------') // !DEBUG
      // console.log(error) // !DEBUG
      // console.log(error.name) // !DEBUG
      // console.log(error.message) // !DEBUG
      // console.log('----------------------') // !DEBUG
      expect(error.name).to.equal('Error')
      expect(error.message).to.equal('Error: tag not found')
    })
  })
  it('Promise resolved with true type response', function () {
    this.timeout(0)
    const template = template_chunks.template
    const file_path = path.join(process.cwd(), 'specs/test/data/markdown/test_ok.md')
    return expect(lib.addTemplateAsync(file_path, template)).to.eventually.be.fulfilled.then((res) => {
      expect(res).to.equal(true)
    })
  })
})

describe('Test suite for ƒ checkDependencies', function () {
  it('should throw with TypeError', function () {
    expect(() => lib.checkDependencies()).to.throw(TypeError, 'ERR_INVALID_ARG_TYPE')
  })
  it('should throw with Error', function () {
    // error cases
    // is empty object
    let case_0 = path.resolve(process.cwd(), 'specs/test/data/extractDependenciesAsync/test_0_package.json')
    case_0 = fs.readFileSync(case_0, 'utf-8')
    case_0 = JSON.parse(case_0)
    expect(() => lib.checkDependencies(case_0)).to.throw(Error, 'Error: no registered dependencies')

    // happy paths
    let case_1 = path.resolve(process.cwd(), 'specs/test/data/extractDependenciesAsync/test_1_package.json')
    case_1 = fs.readFileSync(case_1, 'utf-8')
    case_1 = JSON.parse(case_1)
    expect(lib.checkDependencies(case_1)).to.be.an('object')
    expect(lib.checkDependencies(case_1)).to.deep.equal(case_1)

    let case_2 = path.resolve(process.cwd(), 'specs/test/data/extractDependenciesAsync/test_2_package.json')
    case_2 = fs.readFileSync(case_2, 'utf-8')
    case_2 = JSON.parse(case_2)
    expect(lib.checkDependencies(case_2)).to.be.an('object')
    expect(lib.checkDependencies(case_2)).to.deep.equal(case_2)

    let case_3 = path.resolve(process.cwd(), 'specs/test/data/extractDependenciesAsync/test_3_package.json')
    case_3 = fs.readFileSync(case_3, 'utf-8')
    case_3 = JSON.parse(case_3)
    expect(lib.checkDependencies(case_3)).to.be.an('object')
    expect(lib.checkDependencies(case_3)).to.deep.equal(case_3)
  })
})
