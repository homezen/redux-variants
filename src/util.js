/* eslint no-console:0 */

import noop from 'lodash/noop'

export const warn = process.env.NODE_ENV === 'production' ? noop : console.warn.bind(console)
