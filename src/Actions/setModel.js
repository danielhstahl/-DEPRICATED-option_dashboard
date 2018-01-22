import {createModelType, modelChoices} from '../appSkeleton'
const generateSetModel=(modelValue, dispatch)=>dispatch({
    type:createModelType(modelValue)
})

export const setModels=modelChoices.reduce((aggr, {value})=>{
    return {...aggr, value:dispatch=>generateSetModel(value, dispatch)}
}, {})