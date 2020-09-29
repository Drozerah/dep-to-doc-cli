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
    // check if package.json file is accessible
    let package_json = await lib.accessFileAsync('package.json')
    // get/read data from package.json file
    package_json = await lib.readFileAsync(package_json.file)
    // parse data to js format
    let data = JSON.parse(package_json.data)
    // extract dependencies
    data = await lib.extractDependenciesAsync(data)
    // structuring data
    data = await lib.structuringDataAsync(data)
    // * STEP 3. create template
    debug('STEP 3')
    // create template from data
    // eslint-disable-next-line no-unused-vars
    const template = lib.createTemplate(data)

    // TODO
    // [X] test suit for createMarkdownLink
    // [X] JSDoc for createMarkdownLink
    // [X] test suit for structuringDataAsync
    // [X] JSDoc for structuringDataAsync
    // [X] create template (step 3)
    // [X] Update JSDoc for createTemplate
    // [X] Test suit for createTemplate
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
