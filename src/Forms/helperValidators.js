const isNumeric=x=>!isNaN(x) && isFinite(x)
export const rangeValidator=(min, max)=>val=>{
    const x=parseFloat(val)
    return isNumeric(x)&&x>=min&&x<=max?x:false
}

export const isNotComplete=num=>{
    const strNum=num.toString()
    return strNum.indexOf('.') === strNum.length - 1
}



export const createBounds=(min, max)=>({
    fn:rangeValidator(min, max),
    help: `Must be a number between ${min} and ${max}`
})
export const validateAll=parameters=>Object.keys(parameters).some(val=>parameters[val])

export const arrayValidator={
    fn:rangeValidator(0, 1000000),
    help:'Requires positive, comma separated numbers like "2, 3, 4"'
}