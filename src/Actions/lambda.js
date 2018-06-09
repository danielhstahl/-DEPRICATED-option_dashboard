import {
    NOTIFY_CALIBRATION,
    UPDATE_DENSITY_RAW,
    UPDATE_DENSITY_VAR,
    UPDATE_RANGE_DATA,
    UPDATE_SPLINE_DATA,
    NOTIFY_MATURITIES,
    NOTIFY_GET_OPTIONS,
    UPDATE_OPTION_MATURITIES,
    UPDATE_STRIKES_PRICE,
    NO_TICKER,
    createActionType,
    createOptionReplaceSome,
    createOptionReplaceAll
} from './actionDefinitions'
import querystring from 'querystring'
import appSkeleton from '../appSkeleton'

export const baseUrl=process.env.NODE_ENV === 'production'||process.env.REACT_APP_CUST==='production'?'https://74ekexhct2.execute-api.us-east-1.amazonaws.com/dev/v2/':'/'

const createBody=params=>({
    method:'post',
    body:JSON.stringify(params)
})
export const createUrl=urlParams=>`${baseUrl}${urlParams.join('/')}`

const getOptionUrl=(...urlParams)=>params=>fetch(createUrl(urlParams), createBody(params)).then(response=>response.json())


const getDefaultUrl=(...urlParams)=>fetch(createUrl(urlParams)).then(response=>response.json())

export const getRangeData=dispatch=>getDefaultUrl('parameters', 'parameter_ranges').then(data=>dispatch({
    type:UPDATE_RANGE_DATA,
    data
}))

const getDData=(section, type)=>(parms, dispatch)=>{
    const base='density'
    console.log(type)
    console.log(parms)
    getOptionUrl(base, section)(parms).then(data=>dispatch({
        type,
        data
    }))
}
export const getVaRData=getDData('var', UPDATE_DENSITY_VAR)
export const getDensity=getDData('raw', UPDATE_DENSITY_RAW)

export const getCalibration=(type, optionalChangeParameters)=>(parms, dispatch)=>{
    const eventRemoveNotify={
        type:NOTIFY_CALIBRATION,
        value:false
    }
    dispatch({
        type:NOTIFY_CALIBRATION,
        value:true
    })
    getOptionUrl('calibrator', 'calibrate')(parms).then(response=>{
        dispatch({
            type:createOptionReplaceAll(type),
            data:optionalChangeParameters?optionalChangeParameters(response):response,
        })
        dispatch(eventRemoveNotify)
    }).catch(err=>{
        console.log(err)
        dispatch(eventRemoveNotify)
    })
}
const msToWait=3000
export const getMaturities=type=>({ticker}, dispatch)=>{
    const eventRemoveNotify={
        type:NOTIFY_MATURITIES,
        value:false
    }
    dispatch({
        type:NOTIFY_MATURITIES,
        value:true
    })
    getDefaultUrl('options', ticker, 'maturities').then(({expirationDates, ...rest})=>{
        dispatch({
            type:createOptionReplaceSome(type),
            data:rest,
        })
        dispatch({
            type:UPDATE_OPTION_MATURITIES,
            data:expirationDates,
        })
        dispatch(eventRemoveNotify)
    }).catch(err=>{
        console.log(err)
        dispatch({
            type:NO_TICKER,
            value:true
        })
        setTimeout(()=>{
            dispatch({
                type:NO_TICKER,
                value:false
            })
        }, msToWait)
        dispatch(eventRemoveNotify)
    })
}
export const getOptions=type=>({ticker, maturity, minOpenInterest, minRelativeBidAskSpread}, dispatch)=>{
    const eventRemoveNotify={
        type:NOTIFY_GET_OPTIONS,
        value:false
    }
    dispatch({
        type:NOTIFY_GET_OPTIONS,
        value:true
    })
    const url=createUrl(['options', ticker, 'prices', maturity])+'?'+querystring.stringify({minOpenInterest, minRelativeBidAskSpread})
    fetch(url).then(response=>response.json()).then(({curve, points, ...rest})=>{
        dispatch({
            type:createOptionReplaceSome(type),
            data:rest,
        })
        dispatch({
            type:UPDATE_STRIKES_PRICE,
            data:rest,
        })
        dispatch({
            type:UPDATE_SPLINE_DATA,
            data:{curve, points},
        })
        dispatch(eventRemoveNotify)
    }).catch(err=>{
        console.log(err)
        dispatch(eventRemoveNotify)
    })
}

export const getCalculation=(parameters, dispatch)=>{
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
