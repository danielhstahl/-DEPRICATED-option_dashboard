import {cartesian, excludePotentialArray} from './utils'
export const sensitivities=[
    'price',
    'delta',
    'theta',
    'gamma'
]
export const optionTypes=[
    'call',
    'put'
]
export const algorithms=[
    'fangoost',
    'carrmadan',
    'fsts'
]
export const excludeFrom={
    carrmadan:['delta', 'theta', 'gamma']
}

export const createActionType=(optionType, sensitivity, algorithm)=>{
    return `UPDATE_${optionType.toUpperCase()}_${sensitivity.toUpperCase()}_${algorithm.toUpperCase()}`
}

const appSkeleton=cartesian(optionTypes, sensitivities, algorithms).filter(([optionType, sensitivity, algorithm])=>excludePotentialArray(excludeFrom[algorithm], sensitivity))

const appendIfExists=(arr, val)=>arr?[...arr, val]:[val]

export const keySkeleton=appSkeleton.reduce((aggr, [optionType, sensitivity, algorithm])=>{
    return {
        ...aggr,
        [algorithm]:appendIfExists(aggr[algorithm], [sensitivity, optionType])
    }
}, {})

export default appSkeleton