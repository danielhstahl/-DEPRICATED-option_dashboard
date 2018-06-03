//Is this still used??
export const getAllAdvanced=(modelParameters, getAdvancedParams)=>{
    const {variable, ...rest}=getAdvancedParams(modelParameters)
    return {...rest, ...variable}
}

export const generateConvertSpecificToAdvanced=model=>model[model.name+'ToAdvanced']
export const generateConvertAdvancedToSpecific=model=>model['advancedTo'+model.name]
export const getParametersByFeature=(arr, chosenFeature)=>arr.filter(({feature})=>feature===chosenFeature)
//are these needed?

/*
export const generateSubmitOptions=(dispatch, getAdvancedParams, fetchFn)=>modelParameters=>()=>{
    fetchFn(getAllAdvanced(modelParameters, getAdvancedParams), dispatch)
}

export const generateCalibrationOptions=(dispatch, getAdvancedParams, fetchFn)=>modelParameters=>()=>{
    fetchFn(getAdvancedParams(modelParameters), dispatch)
}

*/