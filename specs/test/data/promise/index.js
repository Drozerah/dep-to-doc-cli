const debug = require('debug')('promise')
/**
 * Dummy Promise for the sake of testing
 */
const dummyPromise = () => {
  debug('ƒ call dummyPromise')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
      debug('↪ resolved')
    }, 1000)
  }).then((result) => {
    debug('↪ .then')
    return result * 2
  })
}
module.exports = { dummyPromise }
