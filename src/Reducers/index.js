import { combineReducers } from 'redux'
import optionParameters from './optionParameters'
import {
    VaR, density, 
    fangoostcall, 
    fangoostput, 
    fsts,
    carrmadan
} from './data'
const app = combineReducers({
    optionParameters,
    VaR, density, 
    fangoostcall, 
    fangoostput, 
    fsts, 
    carrmadan
})

export default app