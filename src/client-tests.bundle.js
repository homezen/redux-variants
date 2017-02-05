import {
    forEach,
} from 'lodash'

// fail test on proptype warning
const warn = console.error // eslint-disable-line no-console
console.error = function(warning) { // eslint-disable-line no-console
    if (/(Invalid prop|Failed propType)/.test(warning)) {
        throw new Error(warning)
    }
    warn.apply(console, arguments)
}


// Run universal js tests on client
const univContext = require.context('.', true, /.+\.test\.jsx?$/)
forEach(univContext.keys(), univContext)

// webpack context for all client test files
const context = require.context('.', true, /.+\.client-test\.jsx?$/)
forEach(context.keys(), context)

module.exports = context
