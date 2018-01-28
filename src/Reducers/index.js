import { combineReducers } from 'redux'
/*import {
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
 } from './optionParameters'*/
 import optionParameters from './optionParameters'
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
    ...fsts
})