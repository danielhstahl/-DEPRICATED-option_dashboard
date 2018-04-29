import {createValidationType, createOptionType, createOptionReplaceAll } from '../appSkeleton'
import { modelMap, defaultKey } from '../modelSkeleton'
import { parameters, notify, validation, NOTIFY_CALIBRATION, UPDATE_QUANTILE } from '../Actions/actionDefinitions'
import { extractDefaultValues } from '../Utils/utils'
const calibrateState={
    prices:[],
    k:[]
}

const defaultFormValidationStatus={
    numU:'',
    r:'',
    T:'',
    S0:'',
    sigma:'',
    C:'',
    G:'',
    M:'',
    Y:'',
    speed:'',
    meanVol:'',
    v0:'',
    adaV:'',
    rho:'',
    k:'',
    prices:''
}



const generateParameters=(paramName, defaultState)=>(state=defaultState, action)=>{
    switch (action.type){
        case createOptionType(paramName):
            return {...state, [action.key]:action.value}
        case createOptionReplaceAll(paramName):
            return {...state, ...action.data}
        default:
            return state
    }
}
const generateValidation=paramName=>(state=defaultFormValidationStatus, action)=>{
    switch (action.type){
        case createValidationType(paramName):
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}

const generateNotify=paramName=>(state=false, action)=>{
    switch(action.type){
        case NOTIFY_CALIBRATION:
            return action.value
        default:
            return state
    }
}



export default modelMap.reduce((aggr, curr)=>({
    ...aggr,
    [curr.name+notify]:generateNotify(curr.name),
    [curr.name+parameters]:generateParameters(curr.name, extractDefaultValues(curr.parameters, defaultKey)),
    [curr.name+validation]:generateValidation(curr.name),
}), {
    calibrateParameters:generateParameters('calibrate', calibrateState),
    calibrateValidation:generateValidation('calibrate')
})

export const quantile=(state=.01, action)=>{
    switch(action.type){
        case UPDATE_QUANTILE:
            return action.value
        default:
            return state
    }
}
