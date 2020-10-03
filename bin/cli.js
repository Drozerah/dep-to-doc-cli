#!/usr/bin/env node
'use strict'
/**
 * Node Core Modules
 */
// const util = require('util')
/**
 * NPM modules
 */
const debug = require('debug')('cli')
const { prompt } = require('inquirer')
// const { blue, green, red } = require('chalk')
const { blue, green } = require('chalk')
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
    // [ ] [createTemplate][signature] add dynamic version and cli name
    // [ ] [createTemplateAsync] fix template for empty dependencies Array

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

runCliAsync()
  .then(res => {
    debug('↪ .then')
    debug(' ↪ show ending message 1')
    console.log(green(`=> ${res}`))
    debug(' ↪ show ending message 2')
    console.log(blue('Thank you for using CLI !'))
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
