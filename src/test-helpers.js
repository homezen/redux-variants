/* eslint-env mocha */

try {
    require('source-map-support')()
} catch (e) {
    /* NOOP */
}

import chai from 'chai'
import 'sinon'
import sinonChai from 'sinon-chai'
import enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import chaiEnzyme from 'chai-enzyme'

enzyme.configure({adapter: new EnzymeAdapter()})
chai.use(sinonChai)
chai.use(chaiEnzyme())
chai.config.includeStack = true

export {expect} from 'chai'
export {default as sinon} from 'sinon'
