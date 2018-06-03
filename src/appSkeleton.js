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

const appSkeleton=cartesian(optionTypes, sensitivities, algorithms).filter(([optionType, sensitivity, algorithm])=>excludePotentialArray(excludeFrom[algorithm], sensitivity))

const appendIfExists=(arr, val)=>arr?[...arr, val]:[val]

export const keySkeleton=appSkeleton.reduce((aggr, [optionType, sensitivity, algorithm])=>({
    ...aggr,
    [algorithm]:appendIfExists(aggr[algorithm], [sensitivity, optionType])
}), {})

export default appSkeleton