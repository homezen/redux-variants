/* eslint-env mocha */

import {expect} from './test-helpers'
import {
    createReducer,
} from '.'

describe('variants reducer creator', () => {
    context('main (only) reducer', () => {
        const getDefaultVariants = () => ({
            featureOne: true,
            featureTwo: false,
            experimentOneCohort: 2,
        })

        it('sets variants to default when state is not initialized', () => {
            const newState = createReducer(getDefaultVariants())()
            expect(newState).to.deep.equal(getDefaultVariants())
        })

        it('adds uninitialized default variant values to state', () => {
            const originalState = {
                featureOne: false,
                featureTwo: true,
            }
            const newState = createReducer(getDefaultVariants())(originalState)
            expect(newState).to.deep.equal({
                ...originalState,
                experimentOneCohort: 2,
            })
        })

        it('ignores default variant values if all values are initialized', () => {
            const originalState = {
                featureOne: false,
                featureTwo: true,
                experimentOneCohort: 3,
            }
            const newState = createReducer(getDefaultVariants())(originalState)
            expect(newState).to.deep.equal({
                ...originalState,
            })
        })

        it('uses initialized variant values if defaults are not provided', () => {
            const originalState = {
                featureOne: false,
                featureTwo: true,
            }
            const newState = createReducer()(originalState)
            expect(newState).to.deep.equal({
                ...originalState,
            })
        })

        it('returns empty object if variants are uninitialized and defaults not provided', () => {
            const newState = createReducer()()
            expect(newState).to.deep.equal({})
        })
    })
})
