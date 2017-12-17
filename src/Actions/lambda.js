//import axios from 'axios'
const baseUrl= 'https://ni6jd9f0z4.execute-api.us-east-1.amazonaws.com/dev/'

const createBody=params=>({
    method:'post',
    body:JSON.stringify(params)
})

export const getUrl=(base, section)=>params=>fetch(`${baseUrl}${base}/${section}`, createBody(params)).then(response=>{
    const res=response.json()
    console.log(res)
    return res
}
)

const allBaseAndSection=[
    {
        base:'call',
        section:'fangoost'
    },
    {
        base:'put',
        section:'fangoost'
    },
    {
        base:'call',
        section:'carrmadan'
    },
    {
        base:'put',
        section:'carrmadan'
    },
    {
        base:'call',
        section:'fsts'
    },
    {
        base:'put',
        section:'fsts'
    },
    {
        base:'density',
        section:'var'
    },
    {
        base:'density',
        section:'raw'
    }
]
//I think this is bad practice
const createActionType=(base, section)=>{
    return `UPDATE_${base.toUpperCase()}_${section.toUpperCase()}`
}

export const getVaRData=(parms, dispatch)=>{
    const base='density'
    const section='var'
    console.log(parms)
    getUrl(base, section)(parms).then(response=>dispatch({
        type:createActionType(base, section),
        data:response
    }))
}
export const getFangOostCall=(parms, dispatch)=>{
    const base='call'
    const section='fangoost'
    getUrl(base, section)(parms).then(response=>dispatch({
        type:createActionType(base, section),
        data:response
    }))
}
export const getFangOostPut=(parms, dispatch)=>{
    const base='put'
    const section='fangoost'
    console.log(parms)
    getUrl(base, section)(parms).then(response=>dispatch({
        type:createActionType(base, section),
        data:response
    }))
}

export const getAllData=(parms, dispatch)=>{
    console.log(parms)
    allBaseAndSection.map(
        ({base, section})=>getUrl(base, section)(parms).then(response=>dispatch({
            type:createActionType(base, section),
            data:response
        }))
    )
}
