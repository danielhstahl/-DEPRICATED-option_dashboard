import { cartesian, excludePotentialArray } from './Utils/utils'
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

export const createOptionReplaceAll=modelType=>{
    return `UPDATE_${modelType.toUpperCase()}_PARAMETER_ALL`
}
export const createOptionType=modelType=>{
    return `UPDATE_${modelType.toUpperCase()}_PARAMETER`
}
export const createValidationType=modelType=>{
    return `UPDATE_${modelType.toUpperCase()}_VALIDATION`
}
export const notifyCalibrationJob=modelType=>{
    return `NOTIFY_${modelType.toUpperCase()}_JOB`
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