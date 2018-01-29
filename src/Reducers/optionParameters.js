import {createValidationType, createOptionType, createOptionReplaceAll, notifyCalibrationJob } from '../appSkeleton'
import { modelMap, defaultKey } from '../modelSkeleton'
import { parameters, notify, validation } from '../Actions/actionDefinitions'
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
    prices:'',
    quantile:''
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
const generateValidation=(paramName)=>(state=defaultFormValidationStatus, action)=>{
    switch (action.type){
        case createValidationType(paramName):
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}

const generateNotify=paramName=>(state=false, action)=>{
    switch(action.type){
        case notifyCalibrationJob(paramName):
            return action.value
        default:
            return state
    }
}

const extractDefaultValues=parameters=>parameters.reduce((aggr, curr)=>({...aggr, [curr.key]:curr[defaultKey]}), {})

export default modelMap.reduce((aggr, curr)=>{
    return {
        ...aggr,
        [curr.name+notify]:generateNotify(curr.name),
        [curr.name+parameters]:generateParameters(curr.name, extractDefaultValues(curr.parameters)),
        [curr.name+validation]:generateValidation(curr.name),
    }
}, {
    calibrateParameters:generateParameters('calibrate', calibrateState),
    calibrateValidation:generateValidation('calibrate')
})

