export const keepMiddleElements=(arr, perc1, perc2)=>{
    const n=arr.length
    const m1=Math.floor(perc1*n)
    const m2=Math.floor(perc2*n)
    return arr.slice(m1, -m2)
}

export const getMiddleByVal=(arr, lower, upper, key)=>{
    return arr.filter(val=>val[key]>lower&&val[key]<upper)
}

export const createArray=(init, last, by=1)=>{
    let arr=[]
    //.00000001 is to fix the rounding errors that sometimes happen
    const n=Math.floor(.00000001+(last-init)/by)

    for(let i=0; i<(n+1); ++i){
        const val=init+by*i
        arr.push(val)        
    }
    return arr
}

export const handleForm=(optionParameters, submitOptions)=>e=>{
    e.preventDefault()
    submitOptions(optionParameters)
}

export const removeFirstAndLastElement=arr=>arr.slice(1, -1)
export const filterBasedOffAnotherArray=(arrToFilter, arrFilterLogic, cb)=>arrToFilter.filter((val, index)=>cb(arrFilterLogic[index]))

export const filterTwoArraysSameFn=(arrToFilter, arrFilterLogic, cb)=>arrToFilter.length===arrFilterLogic.length&&arrToFilter.length>0?arrToFilter.filter((val, index)=>cb(arrFilterLogic[index])&&cb(val)):[]
