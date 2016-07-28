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
import chaiAsPromised from 'chai-as-promised'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())
chai.config.includeStack = true

export {expect} from 'chai'
export {default as sinon} from 'sinon'
