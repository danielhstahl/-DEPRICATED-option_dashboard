export const keepMiddleElements=(arr, perc1, perc2)=>{
    const n=arr.length
    const m1=Math.floor(perc1*n)
    const m2=Math.floor(perc2*n)
    return arr.slice(m1, -m2)
}

export const createArray=(init, last, by=1)=>{
    let arr=[]
    const n=(last-init)/by
    for(let i=0; i<n; ++i){
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
