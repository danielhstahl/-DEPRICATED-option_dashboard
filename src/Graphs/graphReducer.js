import { combineReducers } from 'redux'

import { 
    removeFirstAndLastElement,
    getMiddleByVal
} from '../Utils/utils'

import {
    keySkeleton,
    algorithms
} from '../appSkeleton'

import { getDomain } from '../Utils/mertonUtils'

import {
    UPDATE_DENSITY_VAR,
    UPDATE_DENSITY_RAW,
    UPDATE_SPLINE_DATA,
    createActionType
} from '../Actions/actionDefinitions'

const [fangoostName, carrMadanName, fstsName]=algorithms

const actionFangOostFactory=actionType=>(state=[], action)=>{
    switch(action.type){
        case actionType:
            return removeFirstAndLastElement(action.data)
        default:
            return state
    }
}

const actionDomainFactory=actionType=>(state=[], action)=>{
    switch(action.type){
        case actionType:
            const {upper, lower}=getDomain(action.parameters)
            return getMiddleByVal(action.data, lower, upper, 'atPoint')
        default:
            return state
    }
}

const generateAlgorithmState=(keySkeleton, algorithm, factory)=>{
    return keySkeleton[algorithm].reduce((aggr, [sensitivity, optionType])=>{
        return {
            ...aggr,
            [algorithm+optionType+sensitivity]:factory(createActionType(optionType, sensitivity, algorithm))
        }
    }, {})
}



const fangoost=generateAlgorithmState(keySkeleton, fangoostName, actionFangOostFactory)
const carrmadan=generateAlgorithmState(keySkeleton, carrMadanName, actionDomainFactory)
const fsts=generateAlgorithmState(keySkeleton, fstsName, actionDomainFactory)

const actionVaRFactory=(actionType, defState)=>(state=defState, action)=>{
    switch (action.type){
        case actionType:
            return action.data
        default:
            return state
    }
}

const riskMetrics=actionVaRFactory(UPDATE_DENSITY_VAR, {VaR:0, ES:0})
const density=actionVaRFactory(UPDATE_DENSITY_RAW, [])

const spline=(state={curve:[], points:[]}, action)=>{
    switch(action.type){
        case UPDATE_SPLINE_DATA:
            return action.data
        default:
            return state
    }
}
export default combineReducers({
    ...fangoost,
    ...carrmadan,
    ...fsts,
    riskMetrics,
    density,
    spline
})