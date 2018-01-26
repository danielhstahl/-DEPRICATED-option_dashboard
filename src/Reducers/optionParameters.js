import {createValidationType, createOptionType, createOptionReplaceAll, notifyCalibrationJob } from '../appSkeleton'
const defaultState={
    numU:6,//gets raised to power of 2: 2^numU
    r:.03,
    T:.25,
    S0:50,
    sigma:.2,
    C:1.0,
    G:1.4,
    M:2.5,
    Y:.6,
    speed:.4,
    v0:1.05,
    adaV:.2,
    rho:-.5,
    k:[],
    prices:[],
    quantile:.01
}
const hestonState={
    ...defaultState, 
    C:0.0,
    v0:.04,
    adaV:.2,
    meanVol:.04
}

const bsState={
    ...defaultState,
    v0:1.0,
    C:0.0,
    adaV:0.0
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

export const hestonNotify=generateNotify('heston')
export const optionNotify=generateNotify('full')
export const bsNotify=generateNotify('bs')

export const optionParameters=generateParameters('full', defaultState)
export const hestonParameters=generateParameters('heston', hestonState)
export const bsParameters=generateParameters('bs', bsState)
export const optionValidation=generateValidation('full')
export const hestonValidation=generateValidation('heston')
export const bsValidation=generateValidation('bs')
