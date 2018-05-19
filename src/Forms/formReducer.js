import { combineReducers } from 'redux'

import {
    createValidationType, 
    createOptionType, 
    createOptionReplaceAll 
} from '../appSkeleton'

import { modelMap, defaultKey } from '../modelSkeleton'

import {PARAMETERS, NOTIFY, VALIDATION} from '../Utils/constants'
import { 
    NOTIFY_CALIBRATION, 
    UPDATE_QUANTILE, 
    UPDATE_SLIDER_RANGE ,
    UPDATE_RANGE_DATA
} from '../Actions/actionDefinitions'


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
    muJ:'',
    sigJ:'',
    lambda:'',
    speed:'',
    meanVol:'',
    v0:'',
    adaV:'',
    rho:'',
    k:'',
    delta:'',
    q:'',
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



const quantile=(state=.01, action)=>{
    switch(action.type){
        case UPDATE_QUANTILE:
            return action.value
        default:
            return state
    }
}

const range=(state={}, action)=>{
    switch(action.type){
        case UPDATE_SLIDER_RANGE:
            const [lower, upper]=action.value
            return {...state, [action.key]:{lower, upper}}
        default:
            return state
    }
}

const staticRange=(state={}, action)=>{
    switch(action.type){
        case UPDATE_RANGE_DATA:
            return action.data
        default:
            return state
    }
}

export default combineReducers(
    modelMap.reduce((aggr, curr)=>({
        ...aggr,
        [curr.name+NOTIFY]:generateNotify(curr.name),
        [curr.name+PARAMETERS]:generateParameters(curr.name, extractDefaultValues(curr.parameters, defaultKey)),
        [curr.name+VALIDATION]:generateValidation(curr.name),
    }), {
        calibrateParameters:generateParameters('calibrate', calibrateState),
        calibrateValidation:generateValidation('calibrate'),
        range,
        quantile,
        staticRange
    })
)