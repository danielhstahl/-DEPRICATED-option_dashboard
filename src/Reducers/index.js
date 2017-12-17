import { combineReducers } from 'redux'
import optionParameters from './optionParameters'
import {
    VaR, density, 
    fangoostcall, 
    fangoostput, 
    fstsput, fstscall, 
    carrmadanput, carrmadancall
} from './data'
const app = combineReducers({
    optionParameters,
    VaR, density, 
    fangoostcall, 
    fangoostput, 
    fstsput, fstscall, 
    carrmadanput, carrmadancall
})

export default app