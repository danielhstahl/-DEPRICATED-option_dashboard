export const getAllAdvanced=(modelParameters, getAdvancedParams)=>{
    const {variable, ...rest}=getAdvancedParams(modelParameters)
    return {...rest, ...variable}
}

export const generateConvertSpecificToAdvanced=model=>model[model.name+'ToAdvanced']

export const generateSubmitOptions=(dispatch, getAdvancedParams, fetchFn)=>modelParameters=>()=>{
    fetchFn(getAllAdvanced(modelParameters, getAdvancedParams), dispatch)
}

export const generateCalibrationOptions=(dispatch, getAdvancedParams, fetchFn)=>modelParameters=>()=>{
    fetchFn(getAdvancedParams(modelParameters), dispatch)
}