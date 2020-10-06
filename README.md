_Cross platform Command Line Interface utility with Node.js_

<h1 align="center" style="border:none !important;">
  Dependencies To Documentation
</h1>

<div align="center">

![CI](https://github.com/Drozerah/dep-to-doc-cli/workflows/CI/badge.svg)
![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)
![GitHub issues](https://img.shields.io/github/issues/Drozerah/dummy-github-ci-action)

</div>

__Document your npm dependencies into your README.md file : dep to doc !__

> TODO: write a better README.md

Table of Contents
-----------------

- [Install](#install)
- [Usage](#usage)
- [List of Packages](#list-of-packages)
- [Coverage](#coverage)
- [Author](#author)
- [Lisence](#license)

Install
-------

We recommend to install dep to doc globally 
````bash
$ npm install deptodoc --global
````

Usage
-----

````bash
$ deptodoc
````

README file
````
~~{dependencies}~~
````
Add the following tag `~~{dependencies}~~` into your `README.md` file, then run the command `deptodoc`, the cli will replace the tag with your list of installed dependencies.

List of Packages
----------------

__Dependencies__

| Package                                                                             | Description                                                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [cross-env](https://github.com/kentcdodds/cross-env#readme)                         | Run scripts that set and use environment variables across platforms            |
| [inquirer](https://github.com/SBoudrias/Inquirer.js#readme)                         | A collection of common interactive command line user interfaces                |
| [underscore](https://underscorejs.org)                                              | JavaScript's functional programming helper library                             |


__devDependencies__

| Package                                                                             | Description                                                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [better-docs](https://github.com/SoftwareBrothers/better-docs#readme)               | JSdoc theme                                                                    |
| [chai](http://chaijs.com)                                                           | BDD/TDD assertion library for node.js and the browser. Test framework agnostic |
| [chai-as-promised](https://github.com/domenic/chai-as-promised#readme)              | Extends Chai with assertions about promises                                    |
| [chalk](https://github.com/chalk/chalk#readme)                                      | Terminal string styling done right                                             |
| [debug](https://github.com/visionmedia/debug#readme)                                | Small debugging utility                                                        |
| [eslint](https://eslint.org)                                                        | An AST-based pattern checker for JavaScript                                    |
| [eslint-config-standard](https://github.com/standard/eslint-config-standard)        | JavaScript Standard Style - ESLint Shareable Config                            |
| [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)           | Import with sanity                                                             |
| [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node#readme)       | Additional ESLint's rules for Node.js                                          |
| [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise#readme)   | Enforce best practices for JavaScript promises                                 |
| [eslint-plugin-standard](https://github.com/standard/eslint-plugin-standard#readme) | ESlint Plugin for the Standard Linter                                          |
| [jsdoc](https://github.com/jsdoc/jsdoc#readme)                                      | An API documentation generator for JavaScript                                  |
| jsdoc-mermaid                                                                       | A tool to automagically create flowcharts and diagrams in your jsdocs          |
| [mocha](https://mochajs.org/)                                                       | Simple, flexible, fun test framework                                           |
| [nyc](https://istanbul.js.org/)                                                     | The Istanbul command line interface                                            |
| [sinon](https://sinonjs.org/)                                                       | JavaScript test spies, stubs and mocks                                         |


List of Packages generated by [Dep to Doc CLI 1.0.0](https://github.com/Drozerah/dep-to-doc-cli.git)


Coverage
--------

- [nyc report](/public/reports/index.html)

Author
------

- Thomas G. aka Drozerah - [GitHub](https://github.com/Drozerah)

License
-------

- [ISC](licence) © Thomas G. aka Drozerah