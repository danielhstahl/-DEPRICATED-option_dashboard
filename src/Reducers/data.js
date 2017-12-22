import { 
    removeFirstAndLastElement,
    getMiddleByVal
} from '../utils'
import {getDomain} from '../cgmyUtils'

export const fangoostcall=(state=[], action)=>{
    switch(action.type){
        case 'UPDATE_CALL_FANGOOST':
            return removeFirstAndLastElement(action.data)
        default:
            return state
    }
}

export const fangoostput=(state=[], action)=>{
    switch(action.type){
        case 'UPDATE_PUT_FANGOOST':
            return removeFirstAndLastElement(action.data)
        default:
            return state
    }
}

export const fstscall=(state=[], action, globalState)=>{
    switch(action.type){
        case 'UPDATE_CALL_FSTS':
            const {upper, lower}=getDomain(globalState.optionParameters)
            return getMiddleByVal(action.data, lower, upper, 'atPoint')
        default:
            return state
    }
}

export const fstsput=(state=[], action, globalState)=>{
    switch(action.type){
        case 'UPDATE_PUT_FSTS':
            const {upper, lower}=getDomain(globalState.optionParameters)
            return getMiddleByVal(action.data, lower, upper, 'atPoint')
        default:
            return state
    }
}

export const carrmadancall=(state=[], action, globalState)=>{
    switch(action.type){
        case 'UPDATE_CALL_CARRMADAN':
            const {upper, lower}=getDomain(globalState.optionParameters)
            return getMiddleByVal(action.data, lower, upper, 'atPoint')
        default:
            return state
    }
}

export const carrmadanput=(state=[], action, globalState)=>{
    switch(action.type){
        case 'UPDATE_PUT_CARRMADAN':
            const {upper, lower}=getDomain(globalState.optionParameters)
            return getMiddleByVal(action.data, lower, upper, 'atPoint')
        default:
            return state
    }
}
 
export const VaR=(state={}, action)=>{
    switch (action.type){
        case 'UPDATE_DENSITY_VAR':
            return action.data
        default:
            return state
    }
}

export const density=(state=[], action)=>{
    switch (action.type){
        case 'UPDATE_DENSITY_RAW':
            return action.data
        default:
            return state
    }
}