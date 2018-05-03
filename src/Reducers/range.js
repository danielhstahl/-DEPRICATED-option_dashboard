import {UPDATE_RANGE_DATA} from '../Actions/actionDefinitions'

export default (state={}, action)=>{
    switch(action.type){
        case UPDATE_RANGE_DATA:
            return action.data
        default:
            return state
    }
}

