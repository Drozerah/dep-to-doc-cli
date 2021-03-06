// Copyright (c) 2020 Thomas G. drozerah@gmail.com
// All rights reserved.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/**
 * @description ## Dependencies To Documentation CLI
 * @author Thomas G. aka Drozerah {@link https://github.com/Drozerah|Github}
 * @version 1.0.0
 * @module CLI
 */

/**
 * @description A [Node Core Module](https://nodejs.org/dist/latest-v14.x/docs/api/) method.
 * @typedef {Node_Core_Module} Node_Core_Module
 */

/**
 * The Node [File system](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html) module.
 * @category Dependencies
 * @type {Node_Core_Module}
 * @alias fs
 */
const fs = require('fs')

/**
 * The Node [path](https://nodejs.org/dist/latest-v14.x/docs/api/path.html) module.
 * @category Dependencies
 * @type {Node_Core_Module}
 * @alias path
 */
const path = require('path')

/**
 * @description A [NPM](https://www.npmjs.com/) package dependency.
 * @typedef {NPM_Module} NPM_Module
 */

/**
 * The [debug](https://www.npmjs.com/package/debug) dependency is used for testing/debugging perpose.
 * @category Dependencies
 * @type {NPM_Module}
 * @alias debug
 */
const debug = require('debug')('lib')

/**
 * The [underscore](https://underscorejs.org/) library.
 * @category Dependencies
 * @type {NPM_Module}
 * @alias underscore
 */
const _ = require('underscore')

/**
 * The [chalk](https://www.npmjs.com/package/chalk) dependecy is used for the CLI user feed back.
 * @category Dependencies
 * @type {NPM_Module}
 * @alias chalk
 */
const { blue, green, red } = require('chalk')

debug('[APP][module]', __filename.replace(process.cwd(), ''))
const { version, repository } = require('../package.json')

/**
 * accessFileAsync wrapper
 *
 * - check whether or not a file is accessible
 * - promise wrapper for Node `fs.access` method
 * @category CLI Methods
 * @requires {@link fs}
 * @requires {@link debug}
 * @param  {String} file The file name or path to access.
 * @returns {Promise} The response Object or Error for rejection cases (file not found, invalid argument...).
 */
module.exports.accessFileAsync = function (file) {
  debug('ƒ call accessFileAsync')
  return new Promise((resolve, reject) => {
    debug('↪ call fs.access')
    debug(` ↪ ${file}`)
    fs.access(file, fs.F_OK, (err) => {
      if (err) {
        debug('  ↪ rejected')
        err.value = file
        reject(err)
      } else {
        debug('  ↪ resolved')
        const res = {
          response: true,
          file
        }
        resolve(res)
      }
    })
  })
}

/**
 * readFileAsync wrapper
 *
 * - asynchronously reads the entire contents of a file
 * - promise wrapper for Node `fs.readFile` method
 * @category CLI Methods
 * @requires {@link fs}
 * @requires {@link debug}
 * @param {String} file The file name or path to read.
 * @returns {Promise} The response Object or Error for rejection cases (file not found, invalid argument...).
 */
module.exports.readFileAsync = function (file) {
  debug('ƒ call readFileAsync')
  return new Promise((resolve, reject) => {
    debug('↪ call fs.readFile')
    debug(` ↪ ${file}`)
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        debug('  ↪ rejected')
        err.value = file
        reject(err)
      } else {
        debug('  ↪ resolved')
        const res = {
          response: true,
          data
        }
        resolve(res)
      }
    })
  })
}

/**
 * exit
 *
 * - will exit a user from the CLI process with feedback messages according to CLI context
 * @category CLI Methods
 * @requires {@link chalk}
 * @requires {@link debug}
 * @param {String} message The input string message.
 * @throws Will throw a TypeError if the argument is not an String.
 * @returns {String} The message to output to the user.
 */
module.exports.exit = function (message) {
  debug('ƒ call exit with argument:')
  debug(` ↪ ${message}`)
  // check argument type
  if (typeof message !== 'string') {
    throw new TypeError('ERR_INVALID_ARG_TYPE')
  }
  let response
  if (message === 'user_cancelation') {
    debug(' ↪ enter user cancelation case')
    response = message
  }
  if (message.includes('Error: no such file or directory')) {
    debug(' ↪ enter no such file case')
    response = message
  }
  if (message === 'Error: tag not found') {
    debug(' ↪ enter tag not found case')
    response = message
  }
  if (message === 'Error: no registered dependencies') {
    debug(' ↪ enter no registered dependencies case')
    response = message
  }
  debug(' ↪ send message to user:')
  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'test') {
    console.log(response) // !DEBUG
  } else {
    console.log(red(`${response}`))
  }
  // default message
  debug('↪ send message to user:')
  console.log(green('CLI was aborted !'))
  // debug('↪ send message to user:')
  console.log(blue('Thank you for using CLI...'))
  debug('↪ exit from CLI process')
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'test') {
    return process.exit()
  }
}

/**
 * ErrorHandler
 *
 * - manage TypeError Object for CLI process
 * - will call  [`exit`](#.exit) method with a message according to CLI context
 * @category CLI Methods
 * @requires {@link debug}
 * @requires {@link exit}
 * @param  {Object} err The error Object argument.
 * @throws Will throw a TypeError if the argument is not an Object.
 * @returns {Srting} The error message string.
 */
module.exports.ErrorHandler = function (err) {
  debug('ƒ call ErrorHandler')
  // check if input is an Object type
  if (!err || Array.isArray(err) || typeof err !== 'object') {
    debug('↪ throw new TypeError')
    throw new TypeError('ERR_INVALID_ARG_TYPE')
  }
  if (err.code) {
    let message
    if (err.code === 'ENOENT') {
      err.message = `Error: no such file or directory '${err.value}'`
      message = err.message
    }
    if (err.code === 'ERR_INVALID_ARG_TYPE') {
      err.message = 'TypeError: invalid argument type'
      message = err.message
    }
    if (err.code === 'ERR_TAG_NOT_FOUND') {
      err.message = 'Error: tag not found'
      message = err.message
    }
    if (err.code === 'ERR_DEPENDENCIES_NOT_FOUND') {
      err.message = 'Error: no registered dependencies'
      message = err.message
    }
    debug(' ↪ call exit with argument:')
    debug(` ↪ ${message}`)
    const exit = this.exit(message)
    return exit
  }
}

/**
 * checkDependencies
 *
 * - check if data Object has dependencies properties
 * @category CLI Methods
 * @requires {@link debug}
 * @requires {@link underscore}
 * @param  {Object} data The data Object to check.
 * @throws Will throw a TypeError if the argument is invalid.
 * @throws Will throw an Error if dependencies properties are not found.
 * @returns {Object} The checked data Object.
 */
module.exports.checkDependencies = function (data) {
  debug('ƒ call checkDependencies')
  if (!data) {
    debug(' ↪ throw: new TypeError')
    const err = new TypeError('ERR_INVALID_ARG_TYPE')
    throw err
  }
  if (_.isEmpty(data.dependencies) && _.isEmpty(data.devDependencies)) {
    const err_message = 'Error: no registered dependencies'
    debug(` ↪ throw: ${err_message}`)
    const err = new Error(err_message)
    err.code = 'ERR_DEPENDENCIES_NOT_FOUND'
    throw err
  } else {
    debug(' ↪ checked!')
    return data
  }
}

/**
 * extractDependenciesAsync
 *
 * - return npm dependencies packages for a given package.json file content
 * into a data Object
 * @category CLI Methods
 * @requires {@link debug}
 * @requires {@link underscore}
 * @param  {object} file_content The package.json file content to process.
 * @throws Will throw a TypeError if the argument is invalid.
 * @returns {Promise} The resolved promise with updated data Object.
 */
module.exports.extractDependenciesAsync = function (file_content) {
  debug('ƒ call extractDependenciesAsync')
  return new Promise((resolve, reject) => {
    if (!file_content) {
      debug('↪ throw new TypeError')
      const err = new TypeError('ERR_INVALID_ARG_TYPE')
      return reject(err)
    } else {
      // create empty data Object
      const data = { dependencies: null, devDependencies: null }
      debug('↪ processing data:')
      return Object
        .keys(data, file_content)
        .forEach((key, idx, array) => {
          data[key] = _.has(file_content, key) ? Object.keys(file_content[key]) : []
          debug(` ↪ data object iteration: ${idx}`)
          if (idx + 1 === array.length) {
            return resolve(data)
          }
        })
    }
  })
}

/**
 * createMarkdownLink
 *
 * - create a markdown link string
 * - will return the package name only if type of `link_url` is undefined
 * @example
const lib = require('./lib/')
// happy path
const url = 'https://github.com/drozerah'
const text = 'Drozerah'
const markdown_link = lib.createMarkdownLink(url, text)

// result markdown_link

↪

`[Drozerah](https://github.com/drozerah)`
 * @category CLI Methods
 * @requires {@link debug}
 * @param {string} link_url The input url string.
 * @param {string} link_text The link text content.
 * @throws Will throw a TypeError if link_string argument is invalid.
 * @returns {string} The mardown formated link or the package name.
 */
module.exports.createMarkdownLink = function (link_url, link_text) {
  debug('ƒ call createMarkdownLink')
  if (!link_text) {
    debug('↪ throw new TypeError')
    throw new TypeError('ERR_INVALID_ARG_TYPE')
  }
  const markdown_link = typeof link_url === 'undefined' ? link_text : `[${link_text}](${link_url})`
  debug(' ↪ markdown_link:\n', markdown_link)
  return markdown_link
}

/**
 * structuringDataAsync
 *
 * - update an input data Object with grabbed values for each `./node_modules/[package_name]/package.json` given dependencies
 * @example

const lib = require('./lib/')

// input data
const data = {
  dependencies: ['inquirer'],
  devDependencies: ['mocha']
}

lib.structuringDataAsync(data).then(result => console.log(result))

// result Object

↪  {
      dependencies: {
        packages: [
          {
            package: {
              name: 'inquirer',
              description: {
                string: 'A collection of common interactive command line user interfaces.', // store the package description
                length: 64 // length is used at template creation step
              },
              url: 'https://github.com/SBoudrias/Inquirer.js#readme', // store the package home page url
              markdown_link: {
                string: '[inquirer](https://github.com/SBoudrias/Inquirer.js#readme)', // store a markdown formatted link
                length: 59
              }
            }
          }
        ],
        max_link_length: 59, // store the biggest number in case of multiple packages
        max_description_length: 64
      },
      devDependencies: {
        packages: [
          {
            package: {
              name: 'mocha',
              description: {
                string: 'simple, flexible, fun test framework',
                length: 36
              },
              url: 'https://mochajs.org/',
              markdown_link: { string: '[mocha](https://mochajs.org/)', length: 29 }
            }
          }
        ],
        max_link_length: 29,
        max_description_length: 36
      }
    }
 * @category CLI Methods
 * @requires {@link path}
 * @requires {@link fs}
 * @requires {@link debug}
 * @param  {Object} data The input data Object to work with.
 * @throws Will throw a TypeError if the argument is invalid.
 * @returns  {Promise} The resolved promise with updated data Object.
 */
module.exports.structuringDataAsync = function (data) {
  return new Promise((resolve, reject) => {
    debug('ƒ call structuringDataAsync')
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      debug('↪ throw new TypeError')
      const err = new TypeError('ERR_INVALID_ARG_TYPE')
      return reject(err)
    }
    // for each type of dependencies, store packages link and description length
    const sizes = {
      dependencies: {
        max_link_length: [],
        max_description_length: []
      },
      devDependencies: {
        max_link_length: [],
        max_description_length: []
      }
    }
    // parse dependencies object then update data Object and Sizes Object
    const parseModules = key => {
      debug('ƒ call parseModules by key')
      debug(' ↪ key:', key)
      // output new Array from .map method
      const map = data[key].map((package_name) => {
        // current package path
        const package_path = path.join(process.cwd(), 'node_modules', package_name, 'package.json')
        // read current package using it's path
        const read_package = fs.readFileSync(package_path, 'utf8')
        // parse JSON to JS Object
        const package_json = JSON.parse(read_package)
        // get package description
        let description = package_json.description
        // remove dot sign from end of string
        description = description.replace(/\.$/, '')
        // capitalize string
        description = description.charAt(0).toUpperCase() + description.slice(1)
        // get package homepage url
        const homepage = package_json.homepage
        // create a markdown link format
        const markdown_link = this.createMarkdownLink(homepage, package_name)
        // fill a result Object that represents the current package expected values
        const result = {
          package: {
            name: package_name,
            description: {
              string: description,
              length: description.length
            },
            url: homepage,
            markdown_link: {
              string: markdown_link,
              length: markdown_link.length
            }
          }
        }
        // update size Object
        const [link, _description] = Object.keys(sizes[key])
        sizes[key][link].push(markdown_link.length)
        sizes[key][_description].push(description.length)
        // output result Object
        return result
      })
      // update data Object with new Array from .map method
      data[key] = map
    }

    // parse package.dependencies and package.devDependencies Object from data keys
    // update data Object
    // * update sizes Object
    Object.keys(data).forEach(key => {
      parseModules(key)
    })

    // refactor sizes Object
    // replace each array by it's max math value
    Object.keys(sizes).forEach(key => {
      return Object.entries(sizes[key]).forEach(array => {
        let [_key, array_of_sizes] = array
        array_of_sizes = Math.max.apply(Math, array_of_sizes)
        const max_math_value = array_of_sizes
        sizes[key][_key] = max_math_value
      })
    })

    // refactor data Object structure an entries, merge the refactored sizes Object
    Object.entries(data).forEach(entries => {
      const [key, value] = entries
      data[key] = {
        packages: value,
        ...sizes[key]
      }
    })
    return resolve(data)
  })
}

/**
 * createTemplate
 *
 * - render a markdown table string element according to data structure
 * @example
const lib = require('./lib/')
const data = {
  dependencies: {
    packages: [
      {
        package: {
          name: 'inquirer',
          description: {
            string: 'A collection of common interactive command line user interfaces.',
            length: 64
          },
          url: 'https://github.com/SBoudrias/Inquirer.js#readme',
          markdown_link: {
            string: '[inquirer](https://github.com/SBoudrias/Inquirer.js#readme)',
            length: 59
          }
        }
      }
    ],
    max_link_length: 59,
    max_description_length: 64
  },
  devDependencies: {
    packages: [
      {
        package: {
          name: 'mocha',
          description: {
            string: 'simple, flexible, fun test framework',
            length: 36
          },
          url: 'https://mochajs.org/',
          markdown_link: { string: '[mocha](https://mochajs.org/)', length: 29 }
        }
      }
    ],
    max_link_length: 29,
    max_description_length: 36
  }
}

const template = lib.createTemplate(data)

// result template

↪

`
Table of Contents
-----------------

- [List of Packages](#list-of-packages)

List of Packages
----------------

__Dependencies__

| Packages                                                    | Description                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| [inquirer](https://github.com/SBoudrias/Inquirer.js#readme) | A collection of common interactive command line user interfaces. |

__devDependencies__

| Packages                                                    | Description                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| [mocha](https://mochajs.org/)                               | simple, flexible, fun test framework                             |
`

 * @category CLI Methods
 * @requires {@link debug}
 * @param {Object} data The input data Object to work with.
 * @throws Will throw a TypeError if data argument is missing.
 * @returns {String} The markdown table string.
 */
module.exports.createTemplate = function (data) {
  debug('ƒ call createTemplate')

  if (!data) {
    debug('↪ throw new TypeError')
    throw new TypeError('ERR_INVALID_ARG_TYPE')
  }

  // get dependencies Object from data Object
  const dependencies = data.dependencies
  // get devDepencies Object from data Object
  const devDependencies = data.devDependencies
  // const signature = `List of Packages generated by [Dep to Doc CLI ${version}](${repository.url})`
  const signature = `<div align="right">
  List of Packages generated by <a href="${repository.url}">Dep to Doc CLI</a> ${version}
  </div>`
  // define table elements
  const s = ' ' // white space
  const h = '-' // hyphen
  const p = '|' // pipe

  // get left column width max characters size
  let left_column_width = [data.dependencies.max_link_length, data.devDependencies.max_link_length]
  left_column_width = Math.max.apply(Math, left_column_width) + 1

  // get right column width max characters size
  let right_column_width = [data.dependencies.max_description_length, data.devDependencies.max_description_length]
  right_column_width = Math.max.apply(Math, right_column_width) + 1

  // table titles
  const title_packages = 'Package'
  const title_description = 'Description'
  // template modules

  /* eslint-disable */
  // define nave template
  const naveTemplate = 
`Table of Contents
-----------------

- [List of Packages](#list-of-packages)


List of Packages
----------------
`
const thead = `${p}${s}${title_packages}${s.repeat(left_column_width - title_packages.length)}${p}${s}${title_description}${s.repeat(right_column_width - title_description.length)}${p}`
const hr = `${p}${s}${h.repeat(left_column_width - 1)}${s}${p}${s}${h.repeat(right_column_width - 1)}${s}${p}`
  
  // define dependencies template
  const dependenciesTemplate =
`__Dependencies__

${thead}
${hr}
${dependencies.packages.map((item) => `${p}${s}${item.package.markdown_link.string}${s.repeat(left_column_width - item.package.markdown_link.string.length)}${p}${s}${item.package.description.string}${s.repeat(right_column_width - item.package.description.string.length)}${p}\n`).join('')}
`
  // define devDependencies template
  const devDependenciesTemplate =
`__devDependencies__

${thead}
${hr}
${devDependencies.packages.map((item) => `${p}${s}${item.package.markdown_link.string}${s.repeat(left_column_width - item.package.markdown_link.string.length)}${p}${s}${item.package.description.string}${s.repeat(right_column_width - item.package.description.string.length)}${p}\n`).join('')}
`

// template composition
// render nave template by default
// render dependencies & devDependencies conditionaly
// render signature by default
const template = `
${naveTemplate}
${dependencies.packages.length > 0 ? dependenciesTemplate : ''}
${devDependencies.packages.length > 0 ? devDependenciesTemplate : ''}
${signature}
`
  /* eslint-enable */
  debug(' ↪ template created:')
  debug('   ↪ length:', template.length)
  // return composed template
  return template
}

/**
 * addTemplateAsync
 *
 * - asynchronously read and write a given file
 * - write the dependencies table template into the given file
 * @category CLI Methods
 * @requires {@link debug}
 * @requires {@link fs}
 * @param  {String} file The file name where to write the template
 * @param  {String} template The dependencies template to write
 * @throws Will throw a TypeError if the arguments are invalid
 * @returns {Promise} resolved Promise or rejection cases with messages
 */
module.exports.addTemplateAsync = function (file, template) {
  debug('ƒ call addTemplateAsync')
  if (!file || !template) {
    debug(' ↪ throw new TypeError')
    const err = new TypeError('ERR_INVALID_ARG_TYPE')
    throw err
  }
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      debug('ƒ call readFile')
      if (err) {
        debug(' ↪ error reafFile:', file)
        return reject(err)
      } else {
        debug(' ↪ success reafFile:', file)
        debug(' ↪ check if file includes tag:\n ~~{dependencies}~~')
        const isTag = data.includes('~~{dependencies}~~') // boolean
        if (!isTag) {
          debug('  ↪ error isTag:', isTag)
          const error = new Error('Error: tag not found')
          error.code = 'ERR_TAG_NOT_FOUND'
          reject(error)
        } else {
          debug('  ↪ success isTag:', isTag)
          const add_template = data.replace(/~~{dependencies}~~/, template)
          fs.writeFile(file, add_template, 'utf8', (err) => {
            debug('ƒ call writeFile')
            /* istanbul ignore if */
            if (err) {
              debug(' ↪ error writeFile:', file)
              return reject(err)
            } else {
              debug(' ↪ success writeFile:', file)
              return resolve(true)
            }
          })
        }
      }
    })
  })
}
