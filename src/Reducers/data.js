import { 
    removeFirstAndLastElement,
    filterTwoArraysSameFn
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
    put:[],
    callDisplay:[],
    putDisplay:[]
}


const filterOpt=max=>val=>val.value<max&&val.value>0
export const getFilteredOptions=(put, call, max)=>({
    putDisplay:filterTwoArraysSameFn(put, call, filterOpt(max)),
    callDisplay:filterTwoArraysSameFn(call, put, filterOpt(max))
})

const getMaxOptionPrice=(globalState)=>.6*globalState.optionParameters.S0

export const fsts=(state=defaultOptionState, action, globalState)=>{
    switch(action.type){
        case 'UPDATE_PUT_FSTS':{
            return {...state, put:action.data, ...getFilteredOptions(action.data, state.call, getMaxOptionPrice(globalState))}
        }
        case 'UPDATE_CALL_FSTS':{
            return {...state, call:action.data, ...getFilteredOptions(state.put, action.data, getMaxOptionPrice(globalState))}
        }
        default:
            return state
    }
}
export const carrmadan=(state=defaultOptionState, action, globalState)=>{
    switch(action.type){
        case 'UPDATE_PUT_CARRMADAN':{
            return {...state, put:action.data, ...getFilteredOptions(action.data, state.call,getMaxOptionPrice(globalState))}
        }
        case 'UPDATE_CALL_CARRMADAN':{
            return {...state, call:action.data, ...getFilteredOptions(state.put, action.data, getMaxOptionPrice(globalState))}       
        }
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
