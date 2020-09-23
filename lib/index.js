/**
 * Node Core Modules
 */
const fs = require('fs')

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
        debug('=>', err)
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
 * Exit
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
 * Handel Errors
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
