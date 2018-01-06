/**TODO!! THIS IS TEMPORARY!! USE React Router instead!! */
export const toggleCarrMadanHelp=(dispatch, isOpen)=>{
    dispatch({
        type:'TOGGLE_CARR_MADAN_HELP',
        isOpen
    })
}
export const toggleFSTSHelp=(dispatch, isOpen)=>{
    dispatch({
        type:'TOGGLE_FSTS_HELP',
        isOpen
    })
}
export const toggleFangOostHelp=(dispatch, isOpen)=>{
    dispatch({
        type:'TOGGLE_FANG_OOST_HELP',
        isOpen
    })
}