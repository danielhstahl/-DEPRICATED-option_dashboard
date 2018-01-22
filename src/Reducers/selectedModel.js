import { modelChoices, createModelType } from '../appSkeleton'
const [HestonName, BSName, CustomName]=modelChoices
const defaultState={
    model:HestonName
}


export const selectedModel=(state=defaultState, action)=>{
    const model=modelChoices.find(({value})=>{
        return action.type===createModelType(value)
    })
    if(model){
        return {...state, model}
    }
    else{
        return state
    }
}