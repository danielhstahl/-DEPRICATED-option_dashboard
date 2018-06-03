import { combineReducers } from 'redux'

import {  
    UPDATE_SLIDER_RANGE,
    UPDATE_RANGE_DATA,
} from '../Actions/actionDefinitions'

const currentRange=(state={}, action)=>{
    switch(action.type){
        case UPDATE_SLIDER_RANGE:
            const [lower, upper]=action.value
            return {...state, [action.key]:{lower, upper}}
        case UPDATE_RANGE_DATA: //sync defaultRange and currentRange at start
            return action.data
        default:
            return state
    }
}

//used for validation
const defaultRange=(state={}, action)=>{
    switch(action.type){
        case UPDATE_RANGE_DATA:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    currentRange, defaultRange
})