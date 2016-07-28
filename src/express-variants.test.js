/* eslint-env mocha */

import {expect, sinon} from './test-helpers'
import {
    expressVariants,
} from '.'

describe('express variants middleware', () => {
    it('calls next', () => {
        const next = sinon.spy()
        const expressVariantsMiddleware = expressVariants()
        expressVariantsMiddleware({}, {}, next)
        expect(next).to.have.been.called
    })

    it('places extracted variants into `req.variants`', () => {
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
        const expressVariantsMiddleware = expressVariants({
            cookieVariantName,
            signedCookieVariantName,
            paramVariantName,
            queryVariantName,
        })
        const next = sinon.spy()
        expressVariantsMiddleware(req, {}, next)
        expect(req).to.have.property('variants').that.deep.equals({
            [cookieVariantName]: 'cookieVariantVal',
            [signedCookieVariantName]: 'signedCookieVariantVal',
            [paramVariantName]: 'paramVariantVal',
            [queryVariantName]: 'queryVariantVal',
        })
        expect(next).to.have.been.called
    })

    it('leaves `req.variants` alon if it already exists', () => {
        const cookieVariantName = 'cookieVariantName'
        const req = {
            cookies: {[cookieVariantName]: 'cookieVariantVal'},
            variants: {some: 'stuff'},
        }
        const expressVariantsMiddleware = expressVariants({
            cookieVariantName,
        })
        const next = sinon.spy()
        expressVariantsMiddleware(req, {}, next)
        expect(req).to.have.property('variants').that.deep.equals({some: 'stuff'})
        expect(req).to.have.property('variants').that.equals(req.variants)
        expect(next).to.have.been.called
    })
})
