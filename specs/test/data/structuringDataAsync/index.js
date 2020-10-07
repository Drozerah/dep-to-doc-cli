/**
 * Test suit for ƒ structuringDataAsync Objects
 */

const structuringDataAsync_input_data_structure_1 = {
  dependencies: ['cross-env'],
  devDependencies: ['mocha']
}

const structuringDataAsync_expected_data_structure_1 = {
  dependencies: {
    packages: [
      {
        package: {
          name: 'cross-env',
          description: {
            string: 'Run scripts that set and use environment variables across platforms',
            length: 67
          },
          url: 'https://github.com/kentcdodds/cross-env#readme',
          markdown_link: {
            string: '[cross-env](https://github.com/kentcdodds/cross-env#readme)',
            length: 59
          }
        }
      }
    ],
    max_link_length: 59,
    max_description_length: 67
  },
  devDependencies: {
    packages: [
      {
        package: {
          name: 'mocha',
          description: {
            string: 'Simple, flexible, fun test framework',
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

const structuringDataAsync_input_data_structure_2 = {
  dependencies: ['cross-env'],
  devDependencies: []
}

const structuringDataAsync_expected_data_structure_2 = {
  dependencies: {
    packages: [
      {
        package: {
          name: 'cross-env',
          description: {
            string: 'Run scripts that set and use environment variables across platforms',
            length: 67
          },
          url: 'https://github.com/kentcdodds/cross-env#readme',
          markdown_link: {
            string: '[cross-env](https://github.com/kentcdodds/cross-env#readme)',
            length: 59
          }
        }
      }
    ],
    max_link_length: 59,
    max_description_length: 67
  },
  devDependencies: {
    packages: [],
    max_link_length: undefined,
    max_description_length: undefined
  }
}

const structuringDataAsync_input_data_structure_3 = {
  dependencies: [],
  devDependencies: ['mocha']
}

const structuringDataAsync_expected_data_structure_3 = {
  dependencies: {
    packages: [],
    max_link_length: undefined,
    max_description_length: undefined
  },
  devDependencies: {
    packages: [
      {
        package: {
          name: 'mocha',
          description: {
            string: 'Simple, flexible, fun test framework',
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
  structuringDataAsync_expected_data_structure_1,
  structuringDataAsync_input_data_structure_2,
  structuringDataAsync_expected_data_structure_2,
  structuringDataAsync_input_data_structure_3,
  structuringDataAsync_expected_data_structure_3
}
