/**
 * Node Core Modules
 */
const fs = require('fs')
const path = require('path')

/**
 * NPM Modules
 */
const debug = require('debug')('lib')
const { blue, green, red } = require('chalk')

/**
 * Debug
 */
debug('[APP][module]', __filename.replace(process.cwd(), ''))

/**
 * accessFileAsync wrapper
 *
 * - check whether or not a file is accessible
 * - promise wrapper for Node fs.access method
 * @requires fs Node core module.
 * @param  {String} file The file name or path to access.
 * @returns {Promise} Promise Object returns response Object on resolved or Node default Error Object for rejection cases (file not found, invalid argument...).
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
 * readFileAsync
 *
 * - asynchronously reads the entire contents of a file
 * - promise wrapper for Node fs.readFile method
 * @param {String} file The file name or path to read.
 * @returns {Promise} Promise Object returns response Object on resolved or Node default Error Object for rejection cases (file not found, invalid argument...).
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
 * - will exit a user from the CLI process with feedback messages.
 * @param {String} message The input string message.
 * @throws Will throw a TypeError if the argument is not an String.
 * @returns {String} The message to output to the user.
 */
module.exports.exit = function (message) {
  debug('ƒ call exit with argument:')
  debug(`↪ ${message}`)
  // check argument type
  if (typeof message !== 'string') {
    throw new TypeError('ERR_INVALID_ARG_TYPE')
  }
  if (message === 'user_cancelation') {
    debug(' ↪ enter user cancelation case')
    debug(' ↪ send message to user:')
    console.log(red(`${message}`))
  }
  if (message.includes('Error: no such file')) {
    debug(' ↪ enter no such file case')
    debug(' ↪ send message to user:')
    console.log(red(`${message}`))
  }
  // default message
  debug('↪ send message to user:')
  console.log(green('CLI was aborted !'))
  debug('↪ send message to user:')
  console.log(blue('Thank you for using CLI...'))
  debug('↪ exit from CLI process')
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'test') {
    return process.exit()
  }
}

/**
 * HandelErrors
 *
 * - manage error Object for CLI process
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
    if (err.code === 'ENOENT') {
      err.message = `Error: no such file '${err.value}'`
      debug('↪ call exit with argument:')
      debug(`↪ ${err.message}`)
      const exit = this.exit(err.message)
      return exit
    }
    if (err.code === 'ERR_INVALID_ARG_TYPE') {
      err.message = 'TypeError: invalid argument type'
      debug('↪ call exit with argument:')
      debug(`↪ ${err.message}`)
      const exit = this.exit(err.message)
      return exit
    }
  }
}

/**
 * extractDependenciesAsync
 *
 * - return dev/prod npm dependencies packages for a given package.json file content
 * into a data Object
 * @param  {object} file_content The package.json file content to process.
 * @throws Will throw a TypeError if the argument id invalid.
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
          // eslint-disable-next-line no-prototype-builtins
          data[key] = file_content.hasOwnProperty(key) ? Object.keys(file_content[key]) : null
          debug(` ↪ data object iteration: ${idx}`) // !DEBUG
          if (idx + 1 === array.length) {
            return resolve(data)
          }
        })
    }
  })
}

/**
 * structuringDataAsync
 *
 * @param  {Object} data the input data Object to work with
 * @returns  {Object} the structured Object
 */
module.exports.structuringDataAsync = function (data) {
  return new Promise((resolve, reject) => {
    debug('ƒ call structuringDataAsync')
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      debug('↪ throw new TypeError')
      const err = new TypeError('ERR_INVALID_ARG_TYPE')
      reject(err)
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
        const package_path = path.resolve(process.cwd(), 'node_modules', package_name, 'package.json')
        // read current package using it's path
        const read_package = fs.readFileSync(package_path, 'utf8')
        // parse JSON to JS Object
        const package_json = JSON.parse(read_package)
        // get package description
        const description = package_json.description
        // get package repository url
        const url = package_json.homepage
        // create a markdown link format
        const markdown_link = typeof url === 'undefined' ? 'Link not available' : `[${package_name}](${url})`
        // fill a result Object that represents the current package expected values
        const result = {
          package: {
            name: package_name,
            description: {
              string: description,
              length: description.length
            },
            url,
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
    resolve(data)
  })
}
