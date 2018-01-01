import { 
    removeFirstAndLastElement,
    getMiddleByVal
} from '../utils'
import {getDomain} from '../cgmyUtils'

const actionFangOostFactory=actionType=>(state=[], action)=>{
    switch(action.type){
        case actionType:
            return removeFirstAndLastElement(action.data)
        default:
            return state
    }
}
export const fangoostcall=actionFangOostFactory('UPDATE_CALL_FANGOOST')
export const fangoostput=actionFangOostFactory('UPDATE_PUT_FANGOOST')

const actionDomainFactory=actionType=>(state=[], action, globalState)=>{
    switch(action.type){
        case actionType:
            const {upper, lower}=getDomain(globalState.optionParameters)
            return getMiddleByVal(action.data, lower, upper, 'atPoint')
        default:
            return state
    }
}
export const fstscall=actionDomainFactory('UPDATE_CALL_FSTS')
export const fstsput=actionDomainFactory('UPDATE_PUT_FSTS')
export const carrmadancall=actionDomainFactory('UPDATE_CALL_CARRMADAN')
export const carrmadanput=actionDomainFactory('UPDATE_PUT_CARRMADAN')
 
const actionVaRFactory=(actionType, defState)=>(state=defState, action)=>{
    switch (action.type){
        case actionType:
            return action.data
        default:
            return state
    }
}
export const VaR=actionVaRFactory('UPDATE_DENSITY_VAR', {})
export const density=actionVaRFactory('UPDATE_DENSITY_RAW', [])