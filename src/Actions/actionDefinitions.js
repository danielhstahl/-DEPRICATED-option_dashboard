export const NOTIFY_CALIBRATION='NOTIFY_CALIBRATION'
export const NOTIFY_CALCULATION='NOTIFY_CALCULATION'
export const UPDATE_QUANTILE='UPDATE_QUANTILE'
export const UPDATE_SLIDER_RANGE='UPDATE_SLIDER_RANGE'
export const UPDATE_DENSITY_VAR='UPDATE_DENSITY_VAR'
export const UPDATE_DENSITY_RAW='UPDATE_DENSITY_RAW'
export const UPDATE_SPLINE_DATA='UPDATE_SPLINE_DATA'
export const UPDATE_RANGE_DATA='UPDATE_RANGE_DATA'
export const NOTIFY_MATURITIES='NOTIFY_MATURITIES'
export const NOTIFY_GET_OPTIONS='NOTIFY_GET_OPTIONS'
export const UPDATE_OPTION_MATURITIES='UPDATE_OPTION_MATURITIES'
export const UPDATE_OPTION_FORM='UPDATE_OPTION_FORM'
export const UPDATE_STRIKES_PRICE='UPDATE_STRIKES_PRICE'

export const createActionType=(optionType, sensitivity, algorithm)=>{
    return `UPDATE_${optionType.toUpperCase()}_${sensitivity.toUpperCase()}_${algorithm.toUpperCase()}`
}

export const createOptionReplaceAll=modelType=>{
    return `UPDATE_${modelType.toUpperCase()}_PARAMETER_ALL`
}
export const createOptionReplaceSome=modelType=>{
    return `UPDATE_${modelType.toUpperCase()}_PARAMETER_SOME`
}
export const createOptionType=modelType=>{
    return `UPDATE_${modelType.toUpperCase()}_PARAMETER`
}
export const createValidationType=modelType=>{
    return `UPDATE_${modelType.toUpperCase()}_VALIDATION`
}