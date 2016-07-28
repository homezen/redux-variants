/* eslint-env mocha */

import {expect} from './test-helpers'
import {
    createReqVariantsExtractor,
} from '.'

describe('req variants extractor', () => {
    it('gracefully handles an empty or undefined req object', () => {
        const getVariantsFromReq = createReqVariantsExtractor()
        expect(getVariantsFromReq()).to.deep.equal({})
        expect(getVariantsFromReq({})).to.deep.equal({})
    })

    context('options', () => {
        it('does not extract from cookies if checkCookie is false', () => {
            const variantName = 'variantName'
            const req = {
                cookies: {[variantName]: 'variantVal'},
                signedCookies: {[variantName]: 'variantVal'},
            }
            const getVariantsFromReq = createReqVariantsExtractor(
                {variantName},
                {checkCookies: false},
            )
            expect(getVariantsFromReq(req)).to.deep.equal({})
        })

        it('does not extract from query if checkQuery is false', () => {
            const variantName = 'variantName'
            const req = {
                query: {[variantName]: 'variantVal'},
            }
            const getVariantsFromReq = createReqVariantsExtractor(
                {variantName},
                {checkQuery: false},
            )
            expect(getVariantsFromReq(req)).to.deep.equal({})
        })

        it('does not extract from params if checkParams is false', () => {
            const variantName = 'variantName'
            const req = {
                params: {[variantName]: 'variantVal'},
            }
            const getVariantsFromReq = createReqVariantsExtractor(
                {variantName},
                {checkParams: false},
            )
            expect(getVariantsFromReq(req)).to.deep.equal({})
        })
    })

    context('extraction', () => {
        it('uses provided variant name to cookie/query/param name mapping for extraction', () => {
            const cookieVariantName = 'cookieVariantName'
            const signedCookieVariantName = 'signedCookieVariantName'
            const paramVariantName = 'paramVariantName'
            const queryVariantName = 'queryVariantName'
            const req = {
                cookies: {[cookieVariantName]: 'cookieVariantVal'},
                signedCookies: {[signedCookieVariantName]: 'signedCookieVariantVal'},
                params: {[paramVariantName]: 'paramVariantVal'},
                query: {[queryVariantName]: 'queryVariantVal'},
            }
            const getVariantsFromReq = createReqVariantsExtractor({
                cookieVariantName,
                signedCookieVariantName,
                paramVariantName,
                queryVariantName,
            })
            expect(getVariantsFromReq(req)).to.deep.equal({
                [cookieVariantName]: 'cookieVariantVal',
                [signedCookieVariantName]: 'signedCookieVariantVal',
                [paramVariantName]: 'paramVariantVal',
                [queryVariantName]: 'queryVariantVal',
            })
        })

        it('uses signedCookies over cookies in variant name collision', () => {
            const variantName = 'variantName'
            const req = {
                cookies: {[variantName]: 'variantValBad'},
                signedCookies: {[variantName]: 'variantValGood'},
            }
            const getVariantsFromReq = createReqVariantsExtractor({variantName})
            expect(getVariantsFromReq(req)).to.deep.equal({
                [variantName]: 'variantValGood',
            })
        })

        it('uses param over signedCookies in variant name collision', () => {
            const variantName = 'variantName'
            const req = {
                signedCookies: {[variantName]: 'variantValBad'},
                params: {[variantName]: 'variantValGood'},
            }
            const getVariantsFromReq = createReqVariantsExtractor({variantName})
            expect(getVariantsFromReq(req)).to.deep.equal({
                [variantName]: 'variantValGood',
            })
        })

        it('uses query over param in variant name collision', () => {
            const variantName = 'variantName'
            const req = {
                params: {[variantName]: 'variantValBad'},
                query: {[variantName]: 'variantValGood'},
            }
            const getVariantsFromReq = createReqVariantsExtractor({variantName})
            expect(getVariantsFromReq(req)).to.deep.equal({
                [variantName]: 'variantValGood',
            })
        })
    })
})
