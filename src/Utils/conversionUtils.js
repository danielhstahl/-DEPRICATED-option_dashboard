import { PARAMETERS } from './constants'
export const generateConvertSpecificToAdvanced=model=>model[model.name+'ToAdvanced']
export const generateConvertAdvancedToSpecific=model=>model['advancedTo'+model.name]
export const getParametersByFeature=(arr, chosenFeature)=>arr.filter(({feature})=>feature===chosenFeature)

export const getCalculationParameters=(form, model)=>({
    ...form[model.name+PARAMETERS], quantile:form.quantile
})