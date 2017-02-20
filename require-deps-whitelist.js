/* eslint import/unambiguous:0 */
/* eslint no-unreachable: 0 */

throw new Error('This code should never be run.  Its purpose is to whitelist deps for `npm-check`')

require('eslint')
require('babel-loader')
require('source-map-support')
require('debug')
require('es6-error')
require('mocha-junit-reporter')
require('nodemon')
require('remark-lint')
