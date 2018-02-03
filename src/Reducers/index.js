import { combineReducers } from 'redux'

import optionParameters, { quantile } from './optionParameters'
import {
    VaR, density, 
    fangoost,
    carrmadan,
    fsts
} from './data'


/**Note that each import for the algorithms contains nested properties which must be unnested*/
export default combineReducers({
    ...optionParameters,
    VaR, density, 
    ...fangoost,
    ...carrmadan,
    ...fsts, 
    quantile
})