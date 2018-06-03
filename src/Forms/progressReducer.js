import { combineReducers } from 'redux'

import { 
    NOTIFY_CALIBRATION, 
    NOTIFY_MATURITIES,
    NOTIFY_GET_OPTIONS,
    NOTIFY_CALCULATION

} from '../Actions/actionDefinitions'
const generateNotify=type=>(state=false, action)=>{
    switch(action.type){
        case type:
            return action.value
        default:
            return state
    }
}

export default combineReducers({
    isMaturityInProgress:generateNotify(NOTIFY_MATURITIES),
    isCalibationInProgress:generateNotify(NOTIFY_CALIBRATION),
    isGetOptionsInProgress:generateNotify(NOTIFY_GET_OPTIONS),
    isCalculationInProgress:generateNotify(NOTIFY_CALCULATION),
})