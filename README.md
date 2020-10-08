_Cross platform Command Line Interface utility with Node.js_

<h1 align="center" style="border:none !important;">
  Dependencies To Documentation CLI
</h1>

<div align="center">

![CI](https://github.com/Drozerah/dep-to-doc-cli/workflows/CI/badge.svg)
![nycrc config on GitHub](https://img.shields.io/nycrc/Drozerah/dep-to-doc-cli?config=.nycrc.json&label=coverage)
![GitHub issues](https://img.shields.io/github/issues/Drozerah/dummy-github-ci-action)
![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)

</div>

> __Document your npm dependencies into your README.md file : dep to doc !__

Table of Contents
-----------------

- [Installation](#installation)
- [Usage](#usage)
- [Help](#help)
- [List of Packages](#list-of-packages)
- [Coverage](#coverage)
- [Author](#author)
- [Lisence](#license)

Installation
------------

We recommend to install dep to doc globally 
````bash
$ npm install deptodoc --global
````

Usage
-----
Add the following tag `~~{dependencies}~~` into your `README.md` file.
````
~~{dependencies}~~
````

Then run the command `deptodoc run`, dep to doc cli will replace the tag with your list of installed dependencies from a generated markdown template.


````bash
$ deptodoc run
````
Done !

__Notes:__

- the generated markdown also provides a usefull minimum __table of contents__ anchor navigation you can use to structure your documentation page
- you will have to remove the generated markdown table of your dependencies and run the cli again in order to include new packages...

Help
----

````bash
$ deptodoc --help
````

````
Usage: deptodoc <command> [options]

Commands:
  deptodoc run         Run deptodoc CLI
  deptodoc home        Open in browser home page
  deptodoc issues      Open in browser issues page on GitHub
  deptodoc author      Open in browser author page on GitHub

Options:
  -v, --version  Show version number   [boolean]
  -h, --help     Show help             [boolean]

````

List of Packages
----------------

__Dependencies__

| Package                                                                             | Description                                                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [cross-env](https://github.com/kentcdodds/cross-env#readme)                         | Run scripts that set and use environment variables across platforms            |
| [inquirer](https://github.com/SBoudrias/Inquirer.js#readme)                         | A collection of common interactive command line user interfaces                |
| [open](https://github.com/sindresorhus/open#readme)                                 | Open stuff like URLs, files, executables. Cross-platform                       |
| [underscore](https://underscorejs.org)                                              | JavaScript's functional programming helper library                             |
| [yargs](https://yargs.js.org/)                                                      | Yargs the modern, pirate-themed, successor to optimist                         |


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


<div align="right">
  List of Packages generated by <a href="https://github.com/Drozerah/dep-to-doc-cli.git">Dep to Doc CLI</a> 1.2.0
  </div>


Coverage
--------

- Coming soon!

Author
------

- Thomas G. aka Drozerah - [GitHub](https://github.com/Drozerah)

License
-------

- [MIT](https://github.com/Drozerah/dep-to-doc-cli/blob/master/LICENSE) © Thomas G. aka Drozerah