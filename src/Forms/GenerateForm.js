import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row } from 'antd'

/**Helpers and constants */
import { createBounds } from './helperValidators'
import { 
    generateSubmitOptions, 
    generateConvertSpecificToAdvanced, 
    generateCalibrationOptions
} from '../Utils/conversionUtils'
import { modelMap } from '../modelSkeleton'
import { gutter } from './globalOptions'
import {PARAMETERS, NOTIFY, VALIDATION} from '../Utils/constants'

/**Actions */
import { getCalibration, getAllData } from '../Actions/lambda'
import updateParameters from '../Actions/parameters'

/**Components */
import InputSettings from  './InputSettings'
import InputCalculator from  './InputCalculator'
import InputCalibrator from './InputCalibrator'
import { CommonInputs } from './CommonInputs'
import ShowJson from './ShowJson'


const ModelForm=({
    parameters, validation, 
    notify, calibrateParameters,
    staticItems, variableItems, 
    constantItems, updateParameters, 
    submitCalibration, submitOptions, 
    basePath, convertSpecificToAdvanced, spline
})=>[
    <Row gutter={gutter} key='inputrow'>
        <CommonInputs 
            parameters={parameters}
            validation={validation}
            update={updateParameters}
            formItems={staticItems}
        />
        <Route 
            path={`${basePath}/manual`} exact 
            render={()=>(
                <InputCalculator
                    parameters={parameters}
                    validation={validation}
                    updateParameters={updateParameters}
                    variableItems={variableItems}
                    submitOptions={submitOptions}
                />
            )}
        />
        <Route 
            path={`${basePath}/calibration`} exact 
            render={()=>(
                <InputCalibrator 
                    key='inputcal'
                    variableItems={variableItems}
                    parameters={parameters} 
                    validation={validation}
                    submitOptions={submitCalibration}
                    isInProgress={notify}
                />
            )}
        />
        <Route 
            path={`${basePath}/settings`} exact 
            render={()=>(
                <InputSettings 
                    variableItems={variableItems}
                />
            )}
        />
    </Row>,
    <Row key='jsonrow'>
        <ShowJson parameters={convertSpecificToAdvanced(parameters)}/>
    </Row>
]


const getFeature=arr=>chosenFeature=>arr.filter(({feature})=>feature===chosenFeature)

const getSubKeys=key=>(arr, obj)=>arr.reduce((aggr, curr)=>({...aggr, [curr]:obj[curr][key]}), {})
const ifExistsThenShow=(val, defaultVal)=>val===undefined?defaultVal:val
const getBounds=(parameters, convertAdvancedToSpecific)=>ranges=>{
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


const getConversions=(model, convertAdvancedToSpecific)=>{
    const filterParam=getFeature(model.parameters)
    const getVariableItems=getBounds(filterParam('variable'), convertAdvancedToSpecific)
    const getStaticItems=getBounds(filterParam('static'), convertAdvancedToSpecific)
    const constantItems=filterParam('constant')
    const convertSpecificToAdvanced=generateConvertSpecificToAdvanced(model)
    return {getVariableItems, getStaticItems, convertSpecificToAdvanced, constantItems}
}

export default modelMap.reduce((aggr, curr)=>{
    const convertAdvancedToSpecific=curr['advancedTo'+curr.name]
    const {getVariableItems, getStaticItems, convertSpecificToAdvanced, constantItems}=getConversions(curr, convertAdvancedToSpecific)
    const mapStateToProps=({form, graph})=>({
        parameters:{...form[curr.name+PARAMETERS], quantile:form.quantile},
        validation:form[curr.name+VALIDATION],
        notify:form[curr.name+NOTIFY],
        staticItems:getStaticItems(form.staticRange),
        variableItems:getVariableItems(form.staticRange), 
        constantItems,
        convertSpecificToAdvanced
    })
    const modelCal=getCalibration(curr.name, convertAdvancedToSpecific)
    const mapDispatchToProps=dispatch=>({
        updateParameters:(key, value, validateStatus)=>{
            updateParameters['update'+curr.name](key, value, validateStatus, dispatch)
        },
        submitCalibration:generateCalibrationOptions(dispatch, convertSpecificToAdvanced, modelCal),
        submitOptions:generateSubmitOptions(dispatch, convertSpecificToAdvanced, getAllData)
    })
    
    return {
        ...aggr, [curr.name]:connect(
            mapStateToProps,
            mapDispatchToProps
        )(ModelForm)
    }
}, {})
