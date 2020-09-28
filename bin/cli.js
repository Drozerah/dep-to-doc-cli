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
  console.log(blue('Hello !'))
  // * STEP 1. prompt the user
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
    debug('STEP 2')
    // * STEP 2. working with data
    // check if package.json file is accessible
    let package_json = await lib.accessFileAsync('package.json')
    // get/read data from package.json file
    package_json = await lib.readFileAsync(package_json.file)
    // parse data to js format
    let data = JSON.parse(package_json.data)
    // extract dependencies
    data = await lib.extractDependenciesAsync(data)
    // structuring data
    await lib.structuringDataAsync(data)

    debug('STEP 3')
    // * STEP 3. create template
    // TODO
    // [X] test suit for createMarkdownLink
    // [X] JSDoc for createMarkdownLink
    // [X] test suit for structuringDataAsync
    // [X] JSDoc for structuringDataAsync
    // [X] Update JSDoc template
    // [ ] create template (step 3)
    // [ ] work with README.md
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
    debug(' ↪\n', err)
    return lib.ErrorHandler(err)
  })
