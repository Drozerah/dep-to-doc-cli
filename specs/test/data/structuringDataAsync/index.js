/**
 * Test suit for ƒ structuringDataAsync Objects
 */

const structuringDataAsync_input_data_structure_1 = {
  dependencies: ['inquirer'],
  devDependencies: ['mocha']
}

const structuringDataAsync_expected_data_structure_1 = {
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

module.exports = {
  structuringDataAsync_input_data_structure_1,
  structuringDataAsync_expected_data_structure_1
}
