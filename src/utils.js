export const keepMiddleElements=(arr, perc)=>{
    const n=arr.length
    const m=Math.floor(perc*n*.5)
    return arr.slice(m, -m)
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
