import appSkeleton, {
    createActionType,
    createOptionReplaceAll,
    notifyCalibrationJob
} from '../appSkeleton'
const baseUrl= 'https://ni6jd9f0z4.execute-api.us-east-1.amazonaws.com/dev/'

const createBody=params=>({
    method:'post',
    body:JSON.stringify(params)
})
export const getOptionUrl=(optionType, sensitivity, algorithm)=>params=>fetch(`${baseUrl}${optionType}/${sensitivity}/${algorithm}`, createBody(params)).then(response=>response.json())

export const getUnderlyingUrl=(base, section)=>params=>fetch(`${baseUrl}${base}/${section}`, createBody(params)).then(response=>response.json())


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
    //type is "full", "heston", "bs"
    dispatch({
        type:notifyCalibrationJob(type),
        value:true
    })
    getOptionUrl('call', 'calibration', type)(parms).then(response=>{
        dispatch({
            type:createOptionReplaceAll(type),
            data:optionalChangeParameters?optionalChangeParameters(response):response,
        })
        dispatch({
            type:notifyCalibrationJob(type),
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
