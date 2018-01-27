import appSkeleton, {
    sensitivities,  
    createActionType,
    optionTypes,
    algorithms,
    createOptionReplaceAll,
    notifyCalibrationJob
} from '../appSkeleton'
const baseUrl= 'https://ni6jd9f0z4.execute-api.us-east-1.amazonaws.com/dev/'

const createBody=params=>({
    method:'post',
    body:JSON.stringify(params)
})

const [callName, putName]=optionTypes
const [fangOostName]=algorithms
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
    //console.log(parms)
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

const generateFangOost=optionType=>(parms, dispatch)=>sensitivities.forEach(
    sensitivity=>getOptionUrl(optionType, sensitivity, fangOostName)(parms).then(response=>dispatch({
        type:createActionType(optionType, sensitivity, fangOostName),
        data:response
    }))
)


export const getFangOostCall=generateFangOost(callName)
export const getFangOostPut=generateFangOost(putName)


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
