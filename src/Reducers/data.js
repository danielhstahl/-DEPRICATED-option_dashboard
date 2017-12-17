import { 
    removeFirstAndLastElement, 
    filterBasedOffAnotherArray
} from '../utils'

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
const defaultOptionState={
    call:[],
    put:[]
}
const filterIv=val=>val.iv>0
const getFilteredOptions=(put, call)=>({
    put:filterBasedOffAnotherArray(put, call, filterIv), 
    call:call.filter(filterIv)
})
export const fsts=(state=defaultOptionState, action)=>{
    switch(action.type){
        case 'UPDATE_PUT_FSTS':
            if(state.call.length>0){
                return getFilteredOptions(action.data, state.call)
            }
            return {...state, put:action.data}
        case 'UPDATE_CALL_FSTS':
            if(state.put.length>0){
                return getFilteredOptions(state.put, action.data)
            }
            return {...state, call:action.data}
        default:
            return state
    }
}
export const carrmadan=(state=defaultOptionState, action)=>{
    switch(action.type){
        case 'UPDATE_PUT_CARRMADAN':
            if(state.call.length>0){
                return getFilteredOptions(action.data, state.call)
            }
            return {...state, put:action.data}
        case 'UPDATE_CALL_CARRMADAN':
            if(state.put.length>0){
                return getFilteredOptions(state.put, action.data)
            }
            return {...state, call:action.data}
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
