export const updateOptions=(key, value, dispatch)=>{
    dispatch({
        type:'UPDATE_OPTIONS',
        key,
        value
    })
}
export const showOptionModal=(visible, dispatch)=>{
    dispatch({
        type:'SHOW_OPTION_MODAL',
        visible
    })
}

