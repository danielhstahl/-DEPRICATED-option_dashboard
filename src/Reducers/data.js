import { 
    removeFirstAndLastElement, 
    filterBasedOffAnotherArray,
    keepMiddleElements
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
const fstsLowerBound=.3
const fstsUpperBound=.4
const carrMadanLowerBound=.4
const carrMadanUpperBound=.45
export const fsts=(state=defaultOptionState, action)=>{
    switch(action.type){
        case 'UPDATE_PUT_FSTS':{
            const data=keepMiddleElements(action.data, fstsLowerBound, fstsUpperBound)
            if(state.call.length>0&&action.data.length>0){
                return getFilteredOptions(data, state.call)
            }
            return {...state, put:data}
        }
        case 'UPDATE_CALL_FSTS':{
            const data=keepMiddleElements(action.data, fstsLowerBound, fstsUpperBound)
            if(state.put.length>0&&action.data.length>0){
                return getFilteredOptions(state.put, data)
            }
            return {...state, call:data}
        }
        default:
            return state
    }
}
export const carrmadan=(state=defaultOptionState, action)=>{
    switch(action.type){
        case 'UPDATE_PUT_CARRMADAN':{
            const data=keepMiddleElements(action.data, carrMadanLowerBound, carrMadanUpperBound)
            if(state.call.length>0&&action.data.length>0){
                return getFilteredOptions(data, state.call)
            }
            return {...state, put:action.data}
        }
        case 'UPDATE_CALL_CARRMADAN':{
            const data=keepMiddleElements(action.data, carrMadanLowerBound, carrMadanUpperBound)
            console.log(data)
            console.log(action.data)
            if(state.put.length>0&&action.data.length>0){
                return getFilteredOptions(state.put, data)
            }
            return {...state, call:data}
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
