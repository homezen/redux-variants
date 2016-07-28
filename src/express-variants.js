import {
    has,
    set,
} from 'lodash'

import createReqVariantsExtractor from './extract-variants-from-req'

const expressVariantsMiddleware = (variantNames = {}, config = {}) => {
    const getVariantsFromReq = createReqVariantsExtractor(variantNames, config)

    return (req, res, next) => {
        if (!has(req, 'variants')) {
            set(req, 'variants', getVariantsFromReq(req))
        }
        next()
    }
}

export default expressVariantsMiddleware
