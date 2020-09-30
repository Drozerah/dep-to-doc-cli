const debug = require('debug')('helper')
const fs = require('fs')
const path = require('path')
/**
 * Helper to remove template content from test file
 * before the test suit for ƒ addTemplateAsync is launched
 */
const data = require('../data/template/')
module.exports.removeTemplateBeforeSync = function (done) {
  debug('ƒ call removeTemplateBeforeSync')
  // the template content string to replace
  const templateToRemove = data.template
  // the test file to work with
  const fileToReadWrite = path.join(process.cwd(), '/specs/test/data/markdown/test_ok.md')
  debug('ƒ call readFile')
  fs.readFile(fileToReadWrite, 'utf8', function (err, data) {
    if (err) {
      debug(' ↪ error reafFile:', fileToReadWrite)
      return console.log(err)
    }
    // extract file name from path
    const [fileName] = fileToReadWrite.split(path.sep).reverse()
    debug(' ↪ success reafFile:', fileName)
    // check if data includes templateToRemove
    const isTag = data.includes(templateToRemove)
    if (!isTag) {
      // tag is not included in file call ƒ done to exit
      debug(' ↪ error isTag:', isTag)
      done()
    } else {
      // tag is in file we replace it
      debug(' ↪ success isTag:', isTag)
      const replacement = '~~{dependencies}~~'
      const result = data.replace(templateToRemove, replacement)
      return fs.writeFile(fileToReadWrite, result, 'utf8', function (err) {
        debug('ƒ call writeFile')
        if (err) return console.log(err)
        debug('↪ success write file:', fileName)
        return done()
      })
    }
  })
}
