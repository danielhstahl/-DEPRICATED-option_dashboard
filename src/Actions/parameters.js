import { createValidationType, createOptionType } from '../appSkeleton'

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

export const updateCustom=generateOptions('full')
export const updateHeston=generateOptions('heston')
export const updateBS=generateOptions('bs')

