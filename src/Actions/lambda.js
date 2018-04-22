import appSkeleton, {
    createActionType,
    createOptionReplaceAll
} from '../appSkeleton'
import {
    NOTIFY_CALIBRATION
} from './actionDefinitions'
//https://74ekexhct2.execute-api.us-east-1.amazonaws.com/dev/v1/call/price/fangoost
const baseUrl= 'https://74ekexhct2.execute-api.us-east-1.amazonaws.com/dev/v1/'

const createBody=params=>({
    method:'post',
    body:JSON.stringify(params)
})
export const getOptionUrl=(optionType, sensitivity, algorithm)=>params=>fetch(`${baseUrl}${optionType}/${sensitivity}/${algorithm}`, createBody(params)).then(response=>response.json())

export const getUnderlyingUrl=(base, section)=>params=>fetch(`${baseUrl}${base}/${section}`, createBody(params)).then(response=> response.json())


export const getVaRData=(parms, dispatch)=>{
    const base='density'
    const section='var'
    getUnderlyingUrl(base, section)(parms).then(response=>dispatch({
        type:'UPDATE_DENSITY_VAR',
        data:response
    }))
}
export const getDensity=(parms, dispatch)=>{
    const base='density'
    const section='raw'
    getUnderlyingUrl(base, section)(parms).then(response=>dispatch({
        type:'UPDATE_DENSITY_RAW',
        data:response
    }))
}

export const getCalibration=(type, optionalChangeParameters)=>(parms, dispatch)=>{
    dispatch({
        type:NOTIFY_CALIBRATION,
        value:true
    })
    getUnderlyingUrl('call', 'calibration')(parms).then(response=>{
        dispatch({
            type:createOptionReplaceAll(type),
            data:optionalChangeParameters?optionalChangeParameters(response):response,
        })
        dispatch({
            type:NOTIFY_CALIBRATION,
            value:false
        })
    })
}

export const getAllData=(parameters, dispatch)=>{
    appSkeleton.forEach(
        row=>getOptionUrl(...row)(parameters).then(response=>dispatch({
            type:createActionType(...row),
            data:response, 
            parameters
        }))
    )
    getVaRData(parameters, dispatch)
    getDensity(parameters, dispatch)
}
