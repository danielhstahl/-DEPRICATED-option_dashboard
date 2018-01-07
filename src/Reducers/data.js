import { 
    removeFirstAndLastElement,
    getMiddleByVal
} from '../utils'
import {
    keySkeleton,
    algorithms,
    createActionType
} from '../appSkeleton'
import {getDomain} from '../cgmyUtils'

const [fangoostName, carrMadanName, fstsName]=algorithms

const actionFangOostFactory=actionType=>(state=[], action)=>{
    switch(action.type){
        case actionType:
            return removeFirstAndLastElement(action.data)
        default:
            return state
    }
}

const actionDomainFactory=actionType=>(state=[], action, globalState)=>{
    switch(action.type){
        case actionType:
            const {upper, lower}=getDomain(globalState.customParameters)
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

export const fangoost=generateAlgorithmState(keySkeleton, fangoostName, actionFangOostFactory)
export const carrmadan=generateAlgorithmState(keySkeleton, carrMadanName, actionDomainFactory)
export const fsts=generateAlgorithmState(keySkeleton, fstsName, actionDomainFactory)

const actionVaRFactory=(actionType, defState)=>(state=defState, action)=>{
    switch (action.type){
        case actionType:
            return action.data
        default:
            return state
    }
}

export const VaR=actionVaRFactory('UPDATE_DENSITY_VAR', {})
export const density=actionVaRFactory('UPDATE_DENSITY_RAW', [])