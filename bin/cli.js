#!/usr/bin/env node

'use strict'

// Copyright (c) 2020 Thomas G. drozerah@gmail.com
// All rights reserved.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/**
 * Node Core Modules
 */
// const util = require('util')

/**
 * NPM modules
 */
const debug = require('debug')('cli')
const { prompt } = require('inquirer')
const { blue, green } = require('chalk')
const commands = require('yargs')
const open = require('open')

/**
 * DEBUG
 */
debug(`[APP][Mode][${process.env.NODE_ENV}]`)
debug('[APP][processing]', __filename.replace(process.cwd(), ''))

/**
 * Modules
 */
const lib = require('../lib/')

// inquirer prompt questions
const questions = [
  {
    name: 'isComfirmed',
    type: 'list',
    message: 'Confirmation message', // prompt msg to user
    choices: ['yes', 'no']
  }
]

/**
 * Run CLI process
 */
const runCliAsync = async () => {
  debug('ƒ call runCliAsync')
  // start message
  debug('↪ show starting message')
  // * STEP 1. prompt the user
  console.log(blue('Hello !'))
  debug('STEP 1')
  debug('ƒ call prompt')
  debug('↪ ask user for comfirmation:')
  debug(` ↪ ${questions[0].message}`)
  const { isComfirmed } = await prompt(questions)
  debug('↪ get user response:')
  debug(` ↪ ${isComfirmed}`)
  // check user response
  if (isComfirmed === 'no') {
    lib.exit('user_cancelation') // exit CLI
  } else {
    // * STEP 2. working with data
    debug('STEP 2')

    // check access to package.json file
    const package_json = await lib.accessFileAsync('package.json')

    // check access to README.md file
    const md = await lib.accessFileAsync('readme.md')

    // check access to node_modules directory
    await lib.accessFileAsync('node_modules')

    // read data from package.json file
    let data = await lib.readFileAsync(package_json.file)

    // parse JSON to js Object
    data = await JSON.parse(data.data)

    // check dependencies from data Object
    data = await lib.checkDependencies(data)

    // extract dependencies
    data = await lib.extractDependenciesAsync(data)

    // structuring data
    data = await lib.structuringDataAsync(data)

    // * STEP 3. create template
    debug('STEP 3')

    // create template from data
    const template = lib.createTemplate(data)

    // * STEP 4. work work with README.md
    debug('STEP 4')
    await lib.addTemplateAsync(md.file, template)

    // TODO

    // [ ]

    // debug data Object
    // debug(util.inspect(data, {
    //   showHidden: false,
    //   depth: null
    // }))
    // let readme_md = await lib.accessFileAsync('README.md')
    debug('↪ continue CLI process')
    return 'Done !'
  }
}

const { name, description, author, bugs, homepage } = require('../package.json')
const epilogue = `Thank you for using ${name} CLI !`

// const event = new events.EventEmitter()
// eslint-disable-next-line no-unused-expressions
commands
  .scriptName(name)
  .usage(description)
  .usage(`\nUsage: ${name} <command> [options]`)
  .showHelpOnFail(true) // default action show help menu
  .demandCommand(1, '') // at least 1 command required
  .command(['run'], `Run ${name} CLI`, {}, _ => {
  /**
   * Run dep to doc CLI
   */
    runCliAsync()
      .then(res => {
        debug('↪ .then')
        debug(' ↪ show ending message 1')
        // print '=> done!' message
        console.log(green(`=> ${res}`))
        debug('↪ exit from CLI process')
      })
      .catch(err => {
        debug('↪ .catch')
        // check errors
        debug('err =>>>', err)
        debug('err.code =>>>', err.code)
        debug('err.message =>>>', err.message)
        return lib.ErrorHandler(err)
      })
  })
  .command(['home'], 'Open in browser home page', {}, _ => {
    const cp = open(`${homepage}#readme`, { wait: false })
    cp.then(cp => setTimeout(() => process.exit(), 500))
  })
  .command(['issues'], 'Open in browser issues page on GitHub', {}, _ => {
    const cp = open(bugs.url, { wait: false })
    cp.then(cp => setTimeout(() => process.exit(), 500))
  })
  .command(['author'], 'Open in browser author page on GitHub', {}, _ => {
    const cp = open(author.url, { wait: false })
    cp.then(cp => setTimeout(() => process.exit(), 500))
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .epilogue(`${epilogue}`)
  .locale('en')
  .argv
