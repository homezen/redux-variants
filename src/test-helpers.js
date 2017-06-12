/* eslint-env mocha */

try {
    require('source-map-support')()
} catch (e) {
    /* NOOP */
}

import chai from 'chai'
import 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(sinonChai)
chai.use(chaiEnzyme())
chai.config.includeStack = true

export {expect} from 'chai'
export {default as sinon} from 'sinon'
