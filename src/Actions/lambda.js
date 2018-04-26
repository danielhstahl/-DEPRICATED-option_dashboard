import appSkeleton, {
    createActionType,
    createOptionReplaceAll
} from '../appSkeleton'
import {
    NOTIFY_CALIBRATION
} from './actionDefinitions'
//https://74ekexhct2.execute-api.us-east-1.amazonaws.com/dev/v1/call/price/fangoost
export const baseUrl= 'https://74ekexhct2.execute-api.us-east-1.amazonaws.com/dev/v1/'

const createBody=params=>({
    method:'post',
    body:JSON.stringify(params)
})
export const createUrl=(...urlParams)=>`${baseUrl}${urlParams.join('/')}`

const getOptionUrl=(...urlParams)=>params=>fetch(createUrl(urlParams), createBody(params)).then(response=>response.json())

const getDData=section=>(parms, dispatch)=>{
    const base='density'
    getOptionUrl('calculator', base, section)(parms).then(response=>dispatch({
        type:'UPDATE_DENSITY_VAR',
        data:response
    }))
}
export const getVaRData=getDData('var')
export const getDensity=getDData('raw')

export const getCalibration=(type, optionalChangeParameters)=>(parms, dispatch)=>{
    dispatch({
        type:NOTIFY_CALIBRATION,
        value:true
    })
    getOptionUrl('calibrator')(parms).then(response=>{
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
