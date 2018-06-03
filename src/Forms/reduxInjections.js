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
    generateConvertAdvancedToSpecific
} from '../Utils/conversionUtils'
const { 
    updateOptionForm, 
    updateSlider, 
    updateQuantile
}=actionParameters

export const mapStateToProps=({form})=>form //includes a lot

export const mapDispatchToProps=dispatch=>({
    submitCalculator:(specificParameters, model)=>()=>{
        getCalculation(generateConvertSpecificToAdvanced(model)(specificParameters), dispatch)
    },
    submitCalibrator:(specificParameters, optionValues, model, range)=>()=>{
        const {k, prices}=optionValues
        const advancedParameters=generateConvertSpecificToAdvanced(model)(specificParameters)
        const calibrateParameters=model.parameters.reduce((aggr, curr)=>{
            if(curr.feature==='variable'){
                return {
                    ...aggr, 
                    variable:{
                        ...aggr.variable, 
                        [curr.key]:advancedParameters[curr.key]
                    }
                }
            }
            return {
                ...aggr,
                [curr.key]:advancedParameters[curr.key]
            }
        }, {constraints:range, k, prices})
        getCalibration(
            model.name, 
            generateConvertAdvancedToSpecific(model)
        )(
            calibrateParameters, 
            dispatch
        )
    },
    submitDensity:(specificParameters, model)=>()=>{
        getVaRData(generateConvertSpecificToAdvanced(model)(specificParameters), dispatch)
    },
    submitMaturities:(ticker, model)=>()=>getMaturities(model.name)(ticker, dispatch),
    getOptions:(ticker, maturity, model)=>()=>getOptions(model.name)(ticker, maturity, dispatch),
    generateUpdateParameters:model=>(key, value, validateStatus)=>{
        actionParameters['update'+model.name](key, value, validateStatus, dispatch)
    },
    updateOptionForm:(key, value)=>updateOptionForm(key, value, dispatch),
    updateSlider:(key, value)=>{
        updateSlider(key, value, dispatch)
    },
    updateQuantile:(key, value)=>updateQuantile(value, dispatch),
    
})