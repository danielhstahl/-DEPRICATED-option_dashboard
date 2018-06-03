import {
    getCalculation, 
    getCalibration, 
    getVaRData, 
    getMaturities,
    getOptions
} from '../Actions/lambda'
import actionParameters from '../Actions/parameters' 
import {
    generateConvertSpecificToAdvanced, 
    generateConvertAdvancedToSpecific,
    getParametersByFeature
} from '../Utils/conversionUtils'
import {modelObj} from '../modelSkeleton'
const {
    updateParameters, 
    updateOptionForm, 
    updateSlider, 
    updateQuantile
}=actionParameters

export const mapStateToProps=({form})=>form //includes a lot

export const mapDispatchToProps=dispatch=>({
    submitCalculator:(specificParameters, model)=>()=>{
        getCalculation(generateConvertSpecificToAdvanced(modelObj[model])(specificParameters), dispatch)
    },
    submitCalibrator:(specificParameters, model, range)=>()=>{
        const advancedParameters=generateConvertSpecificToAdvanced(modelObj[model])(specificParameters)
        const variable=getParametersByFeature(modelObj[model].parameters, 'variable').reduce((aggr, curr)=>({
            ...aggr,
            [curr.key]:advancedParameters[curr.key]
        }), {})
        getCalibration(
            model, 
            generateConvertAdvancedToSpecific(modelObj[model])
        )(
            {...advancedParameters, variable, constraints:range}, 
            dispatch
        )
    },
    submitDensity:(specificParameters, model)=>()=>{
        getVaRData(generateConvertSpecificToAdvanced(modelObj[model])(specificParameters), dispatch)
    },
    submitMaturities:ticker=>()=>getMaturities(ticker, dispatch),
    getOptions:(ticker, maturity)=>()=>getOptions(ticker, maturity, dispatch),
    generateUpdateParameters:model=>(key, value, validateStatus)=>{
        updateParameters['update'+model](key, value, validateStatus, dispatch)
    },
    updateOptionForm:(key, value)=>updateOptionForm(key, value, dispatch),
    updateSlider:(key, value)=>{
        updateSlider(key, value, dispatch)
    },
    updateQuantile:(key, value)=>updateQuantile(value, dispatch),
    
})