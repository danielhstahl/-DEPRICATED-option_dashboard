const generateOptions=type=>(key, value, dispatch)=>{
    dispatch({
        type,
        key,
        value
    })
}
export const updateCustom=generateOptions('UPDATE_OPTIONS')
export const updateHeston=generateOptions('UPDATE_HESTON')


