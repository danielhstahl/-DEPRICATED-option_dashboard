import appSkeleton, {
    createActionType,
    createOptionReplaceAll
} from '../appSkeleton'
import {
    NOTIFY_CALIBRATION,
    UPDATE_DENSITY_RAW,
    UPDATE_DENSITY_VAR,
    UPDATE_RANGE_DATA,
    UPDATE_SPLINE_DATA
} from './actionDefinitions'
export const baseUrl=process.env.NODE_ENV === 'production'?'https://74ekexhct2.execute-api.us-east-1.amazonaws.com/dev/v2/':'/'

const createBody=params=>({
    method:'post',
    body:JSON.stringify(params)
})
export const createUrl=urlParams=>`${baseUrl}${urlParams.join('/')}`

const getOptionUrl=(...urlParams)=>params=>fetch(createUrl(urlParams), createBody(params)).then(response=>response.json())


const getDefaultUrl=(...urlParams)=>fetch(createUrl(urlParams)).then(response=>response.json())

export const getRangeData=dispatch=>()=>getDefaultUrl('parameters', 'parameter_ranges').then(data=>dispatch({
    type:UPDATE_RANGE_DATA,
    data
}))

const getDData=(section, type)=>(parms, dispatch)=>{
    const base='density'
    getOptionUrl(base, section)(parms).then(data=>dispatch({
        type,
        data
    }))
}
export const getVaRData=getDData('var', UPDATE_DENSITY_VAR)
export const getDensity=getDData('raw', UPDATE_DENSITY_RAW)

export const getCalibration=(type, optionalChangeParameters)=>(parms, dispatch)=>{
    dispatch({
        type:NOTIFY_CALIBRATION,
        value:true
    })
    getOptionUrl('calibrator', 'calibrate')(parms).then(response=>{
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
export const getSpline=(parms, dispatch)=>{
    getOptionUrl('calibrator', 'spline')(parms).then(response=>{
        dispatch({
            type:UPDATE_SPLINE_DATA,
            data:response
        })
    })
}

export const getAllData=(parameters, dispatch)=>{
    console.log(parameters)
    appSkeleton.forEach(
        row=>getOptionUrl('calculator', ...row)(parameters).then(response=>dispatch({
            type:createActionType(...row),
            data:response, 
            parameters
        }))
    )
    getVaRData(parameters, dispatch)
    getDensity(parameters, dispatch)
}
