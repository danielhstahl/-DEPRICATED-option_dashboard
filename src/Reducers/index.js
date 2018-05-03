import { combineReducers } from 'redux'

import optionParameters, { quantile } from './optionParameters'
import {
    VaR, density, 
    fangoost,
    carrmadan,
    fsts, spline
} from './data'
import range from './range'

/**Note that each import for the algorithms contains nested properties which must be unnested*/
export default combineReducers({
    ...optionParameters,
    VaR, density, 
    ...fangoost,
    ...carrmadan,
    ...fsts, 
    spline,
    quantile,
    range
})