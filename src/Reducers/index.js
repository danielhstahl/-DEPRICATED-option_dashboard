import { combineReducers } from 'redux'

import optionParameters, { quantile, range } from './optionParameters'
import {
    VaR, density, 
    fangoost,
    carrmadan,
    fsts, spline, 
} from './data'
import staticRange from './range'
/**Note that each import for the algorithms contains nested properties which must be unnested*/
export default combineReducers({
    ...optionParameters,
    VaR, density, 
    ...fangoost,
    ...carrmadan,
    ...fsts, 
    spline,
    quantile,
    staticRange,
    range
})