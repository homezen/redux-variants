/* eslint-env mocha */

import {
    identity,
} from 'lodash'

import React, {Component} from 'react'
import {createStore} from 'redux'
import {shallow} from 'enzyme'
import {expect} from './test-helpers'
import {connectVariants} from '.'


class TestComponent extends Component {
    render() {
        return (<div/>)
    }
}

describe('ConnectVariants HoC', () => {
    const getDefaultStore = () => createStore(identity, {
        variants: {
            variantUno: true,
            variantZwei: false,
            variantTres: 2,
            variantCeteri: null,
        },
    })

    it('provides variant values as props to wrapped component', () => {
        const store = getDefaultStore()
        const propsToVariants = {
            variantUno: {name: 'variantUno'},
            variantZwei: {name: 'variantZwei'},
            variantTres: {name: 'variantTres'},
            variantCeteri: {name: 'variantCeteri'},
        }
        const ConnectedComponent = connectVariants({propsToVariants})(TestComponent)
        const wrapper = shallow((
            <ConnectedComponent store={store} />
        ))
        /* eslint-disable lodash/prefer-lodash-method */
        const testComponentInst = wrapper.find(TestComponent)
        /* eslint-enable lodash/prefer-lodash-method */
        expect(testComponentInst).to.have.prop('variantUno', true)
        expect(testComponentInst).to.have.prop('variantZwei', false)
        expect(testComponentInst).to.have.prop('variantTres', 2)
        expect(testComponentInst).to.have.prop('variantCeteri', null)
    })

    it('allows custom prop names for variant in wrapped component', () => {
        const store = getDefaultStore()
        const propsToVariants = {
            variantOne: {name: 'variantUno'},
            variantTwo: {name: 'variantZwei'},
            variantThree: {name: 'variantTres'},
            variantFour: {name: 'variantCeteri'},
        }
        const ConnectedComponent = connectVariants({propsToVariants})(TestComponent)
        const wrapper = shallow((
            <ConnectedComponent store={store} />
        ))
        /* eslint-disable lodash/prefer-lodash-method */
        const testComponentInst = wrapper.find(TestComponent)
        /* eslint-enable lodash/prefer-lodash-method */
        expect(testComponentInst).to.have.prop('variantOne', true)
        expect(testComponentInst).to.have.prop('variantTwo', false)
        expect(testComponentInst).to.have.prop('variantThree', 2)
        expect(testComponentInst).to.have.prop('variantFour', null)
    })

    it('can coerce boolean variant values', () => {
        const store = getDefaultStore()
        const propsToVariants = {
            variantUno: {name: 'variantUno', type: 'boolean'},
            variantZwei: {name: 'variantZwei', type: 'boolean'},
            variantTres: {name: 'variantTres', type: 'boolean'},
            variantCeteri: {name: 'variantCeteri', type: 'boolean'},
        }
        const ConnectedComponent = connectVariants({propsToVariants})(TestComponent)
        const wrapper = shallow((
            <ConnectedComponent store={store} />
        ))
        /* eslint-disable lodash/prefer-lodash-method */
        const testComponentInst = wrapper.find(TestComponent)
        /* eslint-enable lodash/prefer-lodash-method */
        expect(testComponentInst).to.have.prop('variantUno', true)
        expect(testComponentInst).to.have.prop('variantZwei', false)
        expect(testComponentInst).to.have.prop('variantTres', true)
        expect(testComponentInst).to.have.prop('variantCeteri', false)
    })
})
