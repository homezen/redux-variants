import {
    curry,
    get,
    identity,
    mapValues,
} from 'lodash'

import {connect} from 'react-redux'
import {
    createSelector,
    createStructuredSelector,
} from 'reselect'

const getVariantByName = (variantName) => (state) => get(state, ['variants', variantName])

const typeToCoercionFn = {
    boolean: (featureValue) => featureValue === 'false' ? false : !!featureValue,
}

const connectVariants = curry((config, ComposedComponent) => {
    const {
        propsToVariants,
    } = config
    const mapStateToProps = createStructuredSelector(mapValues(propsToVariants, (variantConf) => {
        const {name, type} = variantConf
        const coercionFn = get(typeToCoercionFn, type, identity)

        return createSelector(
            getVariantByName(name),
            coercionFn,
        )
    }))

    return connect(mapStateToProps)(ComposedComponent)
})

export default connectVariants
