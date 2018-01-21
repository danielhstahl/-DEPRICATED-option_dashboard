const generateValidation=type=>(key, value, dispatch)=>{
    dispatch({
        type,
        key,
        value
    })
}
const generateOptions=(type, typeV)=>(key, value, validation, dispatch)=>{
    dispatch({
        type,
        key,
        value
    })
    generateValidation(typeV)(key, validation, dispatch)
}


export const updateAllCustom=(optionParameters, dispatch)=>{
    dispatch({
        type:'UPDATE_ALL_OPTIONS',
        optionParameters
    })
}


export const updateCustom=generateOptions(
    'UPDATE_OPTIONS', 'UPDATE_OPTION_VALIDATION'
)
export const updateHeston=generateOptions(
    'UPDATE_HESTON', 
    'UPDATE_HESTON_VALIDATION'
)



