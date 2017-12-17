import {keepMiddleElements} from '../utils'

export const fangoostcall=(state=[], action)=>{
    switch(action.type){
        case 'UPDATE_CALL_FANGOOST':
            return keepMiddleElements(action.data, .5)
        default:
            return state
    }
}

export const fangoostput=(state=[], action)=>{
    switch(action.type){
        case 'UPDATE_PUT_FANGOOST':
            return keepMiddleElements(action.data, .5)
        default:
            return state
    }
}
export const fstsput=(state=[], action)=>{
    switch(action.type){
        case 'UPDATE_PUT_FSTS':
            return keepMiddleElements(action.data, .5)
        default:
            return state
    }
}
export const fstscall=(state=[], action)=>{
    switch(action.type){
        case 'UPDATE_CALL_FSTS':
            return keepMiddleElements(action.data, .5)
        default:
            return state
    }
}
export const carrmadanput=(state=[], action)=>{
    switch(action.type){
        case 'UPDATE_PUT_CARRMADAN':
            return keepMiddleElements(action.data, .5)
        default:
            return state
    }
}
export const carrmadancall=(state=[], action)=>{
    switch(action.type){
        case 'UPDATE_CALL_CARRMADAN':
            return keepMiddleElements(action.data, .5)
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
