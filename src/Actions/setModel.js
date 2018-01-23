/*import {createModelType, modelChoices} from '../appSkeleton'
const generateSetModel=(modelValue, dispatch)=>dispatch({
    type:createModelType(modelValue)
})

export const setModelTab=modelChoices.reduce((aggr, {value})=>{
    return {...aggr, value:dispatch=>generateSetModel(value, dispatch)}
}, {})*/


export const setModelTab=(modelIndex, dispatch)=>dispatch({
    type:'UPDATE_MODEL_TAB',
    value:modelIndex
})