import { combineReducers } from 'redux'

import { modelMap, defaultKey } from '../modelSkeleton'

import {PARAMETERS, VALIDATION} from '../Utils/constants'
import { 
    UPDATE_QUANTILE,
    UPDATE_OPTION_MATURITIES,
    UPDATE_OPTION_FORM,
    UPDATE_STRIKES_PRICE,
    UPDATE_OPTION_VALIDATION,
    NO_TICKER,
    createValidationType, 
    createOptionType, 
    createOptionReplaceAll,
    createOptionReplaceSome
} from '../Actions/actionDefinitions'

import progress from './progressReducer'
import range from './rangeReducer'

import { extractDefaultValues } from '../Utils/utils'

const defaultOptionValues={
    prices:[],
    k:[],
    ticker:'',
    maturity:null,
    minRelativeBidAskSpread:.1,
    minOpenInterest:25,
    maturityOptions:[]
}

const defaultOptionValuesValidation={
    minOpenInterest:'',
    minRelativeBidAskSpread:''
}
const defaultFormValidationStatus={
    numU:'',
    r:'',
    T:'', //updated from either the calibration screen OR the calculator screen
    S0:'',
    sigma:'',
    muJ:'',
    sigJ:'',
    lambda:'',
    speed:'',
    meanVol:'',
    v0:'',
    adaV:'',
    rho:''
}

const generateParameters=(paramName, defaultState)=>(state=defaultState, action)=>{
    switch (action.type){
        case createOptionType(paramName):
            return {...state, [action.key]:action.value}
        case createOptionReplaceAll(paramName):
            return {...state, ...action.data}
        case createOptionReplaceSome(paramName):
            return {...state, ...action.data}
        default:
            return state
    }
}

const optionValues=(state=defaultOptionValues, action)=>{
    switch (action.type){
        case UPDATE_OPTION_MATURITIES:
            return {...state, maturityOptions:action.data}
        case UPDATE_OPTION_FORM:
            return {...state, [action.key]:action.value}
        case UPDATE_STRIKES_PRICE:
            return {...state, ...action.data}
        default:
            return state
    }
}
const optionValuesValidation=(state=defaultOptionValuesValidation, action)=>{
    switch (action.type){
        case UPDATE_OPTION_VALIDATION:
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}
const invalidTicker=(state=false, action)=>{
    switch(action.type){
        case NO_TICKER:
            return action.value
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


const quantile=(state=.01, action)=>{
    switch(action.type){
        case UPDATE_QUANTILE:
            return action.value
        default:
            return state
    }
}

export default combineReducers(
    modelMap.reduce((aggr, curr)=>({
        ...aggr,       
        [curr.name+PARAMETERS]:generateParameters(curr.name, extractDefaultValues(curr.parameters, defaultKey)),
        [curr.name+VALIDATION]:generateValidation(curr.name),
    }), {
        quantile,
        range,
        progress,
        optionValues,
        invalidTicker,
        optionValuesValidation
    })
)