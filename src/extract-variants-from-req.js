import {
    defaults,
    flow,
    isUndefined,
    mapValues,
    propertyOf,
} from 'lodash'

/* eslint-disable lodash/import-scope */
import {
    omitBy as fpOmitBy,
} from 'lodash/fp'
/* eslint-enable lodash/import-scope */

const defaultConfig = {
    checkCookies: true,
    checkParams: true,
    checkQuery: true,
}

const variantsFromObjGetter = (variantNames) => (obj) => mapValues(variantNames, propertyOf(obj))

const createReqVariantsExtractor = (variantNames = {}, config = {}) => {
    const {
        checkCookies,
        checkParams,
        checkQuery,
    } = defaults(config, defaultConfig)

    const getVariantsFromObj = variantsFromObjGetter(variantNames)

    const reqVariantsExtractor = (req) => {
        const getPropFromReq = propertyOf(req)
        const getVariantsFromReqProp = flow(
            getPropFromReq,
            getVariantsFromObj,
            fpOmitBy(isUndefined),
        )
        return {
            ...(checkCookies ? getVariantsFromReqProp('cookies') : {}),
            ...(checkCookies ? getVariantsFromReqProp('signedCookies') : {}),
            ...(checkParams ? getVariantsFromReqProp('params') : {}),
            ...(checkQuery ? getVariantsFromReqProp('query') : {}),
        }
    }
    return reqVariantsExtractor
}

export default createReqVariantsExtractor
