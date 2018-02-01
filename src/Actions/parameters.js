import { createValidationType, createOptionType } from '../appSkeleton'
import { modelMap } from '../modelSkeleton'
import { UPDATE_QUANTILE } from './actionDefinitions'
const generateValidation=paramName=>(key, value, dispatch)=>{
    dispatch({
        type:createValidationType(paramName),
        key,
        value
    })
}
const generateOptions=(paramName)=>(key, value, validation, dispatch)=>{
    dispatch({
        type:createOptionType(paramName),
        key,
        value
    })
    generateValidation(paramName)(key, validation, dispatch)
}
export default modelMap.reduce((aggr, curr)=>({
    ...aggr, 
    ['update'+curr.name]:generateOptions(curr.name)
}), {
    updateCalibration:generateOptions('calibrate')
})

export const updateQuantile=(value, dispatch)=>{
    dispatch({
        type:UPDATE_QUANTILE,
        value
    })
}