import { combineReducers } from 'redux'
import {
    optionParameters, 
    hestonParameters, 
    bsParameters, 
    calibrateParameters,
    optionValidation,
    hestonValidation,
    bsValidation,
    calibrateValidation,
    hestonNotify,
    optionNotify,
    bsNotify
 } from './optionParameters'
import {
    VaR, density, 
    fangoost,
    carrmadan,
    fsts
} from './data'


/**Note that each import for the algorithms contains nested properties which must be unnested*/
export default combineReducers({
    optionParameters,
    hestonParameters,
    hestonValidation,
    calibrateValidation,
    calibrateParameters,
    bsParameters,
    bsValidation,
    optionValidation,
    hestonNotify,
    optionNotify,
    bsNotify,
    VaR, density, 
    ...fangoost,
    ...carrmadan,
    ...fsts
})