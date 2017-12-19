import { 
    removeFirstAndLastElement,
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

//is it possible to make this dependent on the state? eg, make smaller for lower volatility
const fstsLowerBound=.4
const fstsUpperBound=.4
const fstsMiddle=arr=>keepMiddleElements(arr, fstsLowerBound, fstsUpperBound)
const carrMadanLowerBound=.46
const carrMadanUpperBound=.46
const carrMadanMiddle=arr=>keepMiddleElements(arr, carrMadanLowerBound, carrMadanUpperBound)
export const fsts=(state=defaultOptionState, action)=>{
    switch(action.type){
        case 'UPDATE_PUT_FSTS':{
            return {...state, put:fstsMiddle(action.data)}
        }
        case 'UPDATE_CALL_FSTS':{
            return {...state, call:fstsMiddle(action.data)}
        }
        default:
            return state
    }
}
export const carrmadan=(state=defaultOptionState, action)=>{
    switch(action.type){
        case 'UPDATE_PUT_CARRMADAN':{
            return {...state, put:carrMadanMiddle(action.data)}
        }
        case 'UPDATE_CALL_CARRMADAN':{
            return {...state, call:carrMadanMiddle(action.data)}
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
