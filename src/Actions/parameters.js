/*const generateOptions=type=>(key, value, dispatch)=>{
    dispatch({
        type,
        key,
        value
    })
}*/
export const updateAllCustom=(optionParameters, dispatch)=>{
    dispatch({
        type:'UPDATE_ALL_OPTIONS',
        optionParameters
    })
}
export const updateValidation=(key, value, dispatch)=>{
    dispatch({
        type:'UPDATE_VALIDATION_STATUS',
        key,
        value
    })
}
export const updateCustom=(key, value, dispatch)=>{
    dispatch({
        type:'UPDATE_OPTIONS',
        key,
        value
    })
}//generateOptions('UPDATE_OPTIONS')
//export const updateHeston=generateOptions('UPDATE_HESTON')


