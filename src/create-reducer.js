import {
    defaults,
} from 'lodash'

/**
 * Create the reducer for the variants slice of the state tree.
 *
 * This reducer assumes that variants are only set at state tree creation.
 *
 * @param  {object} defaultVariants k/v pairs. Variant values to use if variants
 *                                  are not initialized at store creattion
 * @returns {function}              Reducer for variants slice of state tree
 */
const createReducer = (defaultVariants = {}) =>
    (state) => defaults(state, defaultVariants)

export default createReducer
