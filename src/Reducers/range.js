export const UPDATE_RANGE_DATA='UPDATE_RANGE_DATA'

export default (state={}, action)=>{
    switch(action.type){
        case UPDATE_RANGE_DATA:
            return action.data
        default:
            return state
    }
}

