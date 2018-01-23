const defaultState={
    model:0
}

export const selectedModel=(state=defaultState, action)=>{
    switch(action.type){
        case 'UPDATE_MODEL_TAB':
            return action.value
        default:
            return state
    }
}