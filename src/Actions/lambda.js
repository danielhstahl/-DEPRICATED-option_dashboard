import {cartesian, excludePotentialArray} from '../utils'
const baseUrl= 'https://ni6jd9f0z4.execute-api.us-east-1.amazonaws.com/dev/'

const createBody=params=>({
    method:'post',
    body:JSON.stringify(params)
})

export const getOptionUrl=(base, type, section)=>params=>fetch(`${baseUrl}${base}/${type}/${section}`, createBody(params)).then(response=>response.json())

export const getUnderlyingUrl=(base, section)=>params=>fetch(`${baseUrl}${base}/${section}`, createBody(params)).then(response=>response.json())

const sensitivities=[
    'price',
    'delta',
    'theta',
    'gamma'
]
const optionTypes=[
    'call',
    'put'
]
const algorithm=[
    'fangoost',
    'carrmadan',
    'fsts'
]
const excludeFrom={
    carrmadan:['delta', 'theta', 'gamma']
}

const combinationOfArray=cartesian(optionTypes, sensitivities, algorithm).filter(val=>excludePotentialArray(excludeFrom[val[2]], val[1]))

//I think this is bad practice
const createActionType=(base, type, section)=>{
    return `UPDATE_${base.toUpperCase()}_${type.toUpperCase()}_${section.toUpperCase()}`
}
const createActionUnderlyingType=(base, section)=>{
    return `UPDATE_${base.toUpperCase()}_${section.toUpperCase()}`
}

export const getVaRData=(parms, dispatch)=>{
    const base='density'
    const section='var'
    getUnderlyingUrl(base, section)(parms).then(response=>dispatch({
        type:createActionUnderlyingType(base, section),
        data:response
    }))
}
export const getDensity=(parms, dispatch)=>{
    const base='density'
    const section='raw'
    getUnderlyingUrl(base, section)(parms).then(response=>dispatch({
        type:createActionUnderlyingType(base, section),
        data:response
    }))
}

export const getFangOostCall=(parms, dispatch)=>{
    const base='call'
    const section='fangoost'
    const type='price'
    getOptionUrl(base, type, section)(parms).then(response=>dispatch({
        type:createActionType(base, type, section),
        data:response
    }))
}

export const getFangOostPut=(parms, dispatch)=>{
    const base='put'
    const section='fangoost'
    const type='price'
    getOptionUrl(base, type, section)(parms).then(response=>dispatch({
        type:createActionType(base, type, section),
        data:response
    }))
}
const resetOptions=(dispatch)=>{
    dispatch({
        type:'UPDATE_CALL_PRICE_CARRMADAN',
        data:[]
    })
    dispatch({
        type:'UPDATE_PUT_PRICE_CARRMADAN',
        data:[]
    })
    dispatch({
        type:'UPDATE_PUT_PRICE_FSTS',
        data:[]
    })
    dispatch({
        type:'UPDATE_CALL_PRICE_FSTS',
        data:[]
    })
}
export const getAllData=(parms, dispatch)=>{
    resetOptions(dispatch)
    combinationOfArray.map(
        row=>getOptionUrl(...row)(parms).then(response=>dispatch({
            type:createActionType(...row),
            data:response
        }))
    )
    getVaRData(parms, dispatch)
    getDensity(parms, dispatch)

}
