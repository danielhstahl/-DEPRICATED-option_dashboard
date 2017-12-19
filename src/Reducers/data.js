import { 
    removeFirstAndLastElement,
    getMiddleByVal
} from '../utils'

import gamma from 'gamma'

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


export const divAndY=(x, Y)=>1/Math.pow(x, 2-Y)
export const vol=(T, sigma, C, G, M, Y)=>{
    return Math.sqrt(T*(sigma*sigma+C*gamma(2-Y)*(divAndY(G, Y)+divAndY(M, Y))))
}
const upperScalar=1.2
const lowerScalar=2.5
export const getDomain=(params)=>{
    const {T, sigma, C, G, M, Y, S0}=params
    const cgmyVol=vol(T, sigma, C, G, M, Y)
    return {
        upper:S0*Math.exp(cgmyVol*upperScalar),
        lower:S0*Math.exp(-cgmyVol*lowerScalar)
    }
}




export const fsts=(state=defaultOptionState, action, globalState)=>{
    switch(action.type){
        case 'UPDATE_PUT_FSTS':{
            const {upper, lower}=getDomain(globalState.optionParameters)
            return {...state, put:getMiddleByVal(action.data, lower, upper, 'atPoint')}
        }
        case 'UPDATE_CALL_FSTS':{
            const {upper, lower}=getDomain(globalState.optionParameters)
            return {...state, call:getMiddleByVal(action.data, lower, upper, 'atPoint')}
        }
        default:
            return state
    }
}
export const carrmadan=(state=defaultOptionState, action, globalState)=>{
    switch(action.type){
        case 'UPDATE_PUT_CARRMADAN':{
            const {upper, lower}=getDomain(globalState.optionParameters)
            return {...state, put:getMiddleByVal(action.data, lower, upper, 'atPoint')}
        }
        case 'UPDATE_CALL_CARRMADAN':{
            const {upper, lower}=getDomain(globalState.optionParameters)
            return {...state, call:getMiddleByVal(action.data, lower, upper, 'atPoint')}      
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
