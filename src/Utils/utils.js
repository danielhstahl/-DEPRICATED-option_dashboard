export const keepMiddleElements=(arr, perc1, perc2)=>{
    const n=arr.length
    const m1=Math.floor(perc1*n)
    const m2=Math.floor(perc2*n)
    return arr.slice(m1, -m2)
}

export const getMiddleByVal=(arr, lower, upper, key)=>{
    return arr.filter(val=>val[key]>lower&&val[key]<upper)
}
//.00000001 is to fix the rounding errors that sometimes happen
const roundErr=.00000001
export const createArray=(init, last, by=1)=>{
    let arr=[]
    const n=Math.floor(roundErr+(last-init)/by)
    for(let i=0; i<(n+1); ++i){
        const val=init+by*i
        arr.push(val)        
    }
    return arr
}

const isNumeric=x=>!isNaN(x) && isFinite(x)
export const rangeValidator=(min, max)=>val=>{
    const x=parseFloat(val)
    return isNumeric(x)&&x>=min&&x<=max?x:false
}

export const isNotComplete=num=>{
    const strNum=num.toString()
    return strNum.indexOf('.') === strNum.length - 1
}

export const extractDefaultValues=(parameters, defaultKey)=>parameters.reduce((aggr, curr)=>({...aggr, [curr.key]:curr[defaultKey]}), {})

export const createBounds=(min, max)=>({
    fn:rangeValidator(min, max),
    help: `Must be a number between ${min} and ${max}`
})

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))))

export const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a)

export const excludePotentialArray=(maybeArr, maybeInArr)=>maybeArr?maybeArr.indexOf(maybeInArr)===-1:true

export const handleForm=(submitOptions, ...parameters)=>e=>{
    e.preventDefault()
    submitOptions(...parameters)
}
export const validateAll=parameters=>{
    return Object.keys(parameters).some(val=>parameters[val])
}

export const removeFirstAndLastElement=arr=>arr.slice(1, -1)

export const upperFirstLetter=string=>string[0].toUpperCase() + string.substring(1)

export const getAllCGMY=(modelParameters, getCGMYParams)=>{
    const {variable, ...rest}=getCGMYParams(modelParameters)
    return {...rest, ...variable}
}

export const getCGMYFunction=(model)=>model[model.name+'ToAdvanced']

export const generateSubmitOptions=(dispatch, getCGMYParams, getAllData)=>modelParameters=>{
    getAllData(getAllCGMY(modelParameters, getCGMYParams), dispatch)
}