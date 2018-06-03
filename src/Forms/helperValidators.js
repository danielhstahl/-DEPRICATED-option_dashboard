import {generateConvertAdvancedToSpecific} from '../Utils/conversionUtils'

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

const getSubKeys=key=>(arr, obj)=>arr.reduce((aggr, curr)=>({...aggr, [curr]:obj[curr][key]}), {})
const ifExistsThenShow=(val, defaultVal)=>val===undefined?defaultVal:val

export const convertParametersToSpecificAndAddValidation=(parameters, convertAdvancedToSpecific)=>ranges=>{
    const rangeKeys=Object.keys(ranges)
    const upperRanges=getSubKeys('upper')(rangeKeys, ranges)
    const lowerRanges=getSubKeys('lower')(rangeKeys, ranges)
    const convertedUpperRanges=convertAdvancedToSpecific(upperRanges)
    const convertedLowerRanges=convertAdvancedToSpecific(lowerRanges)
    return parameters.map(v=>({
        ...v, 
        validator:createBounds(convertedLowerRanges[v.key], convertedUpperRanges[v.key]),
        bounds:{
            lower:ifExistsThenShow(convertedLowerRanges[v.key], 0), 
            upper:ifExistsThenShow(convertedUpperRanges[v.key], 100)
        }
    }))
}

export const getFormItems=(model, modelParameters, range)=>convertParametersToSpecificAndAddValidation(
    modelParameters,
    generateConvertAdvancedToSpecific(model)
)(range)