import React from 'react'
import { validateAll, createBounds, generateSubmitOptions, convertSpecificToAdvanced, generateCalibrationOptions } from '../Utils/utils'
import { getCalibration, getAllData } from '../Actions/lambda'
import InputSettings from  './InputSettings'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { parameters, notify, validation } from '../Actions/actionDefinitions'
import InputCalibrator from './InputCalibrator'
import updateParameters from '../Actions/parameters'
import { Row } from 'antd'
import { modelMap } from '../modelSkeleton'
import ShowJson from './ShowJson'
import {SplineCurves} from '../Graphs/Graphs.js'
import {
    gutter
} from './globalOptions'
import { CommonInputs, CommonUpdateButton } from './CommonInputs'

const ModelForm=({
    parameters, validation, 
    notify, calibrateParameters,
    staticItems, variableItems, 
    constantItems, updateParameters, 
    submitCalibration, submitOptions, 
    basePath, getActualJson, spline
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
            render={()=>[
                <CommonInputs 
                    key='variableparameters'
                    parameters={parameters}
                    validation={validation}
                    update={updateParameters}
                    formItems={variableItems}
                />,
                <CommonUpdateButton
                    key='updatebutton'
                    submitOptions={submitOptions}
                    calibrateParameters={calibrateParameters}
                    validateAll={validateAll}
                    parameters={parameters}
                    validation={validation}
                />
            ]}
        />
        <Route 
            path={`${basePath}/calibration`} exact 
            render={()=>[
                <InputCalibrator 
                    key='inputcal'
                    variableItems={variableItems}
                    parameters={parameters} 
                    validation={validation}
                    submitOptions={submitCalibration}
                    isInProgress={notify}
                />,
                <SplineCurves key='spline' spline={spline} title='Fit' xLabel='Log Strikes' yLabel='Transformed Option Prices'/>
            ]}
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
        <ShowJson parameters={getActualJson(parameters)}/>
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

export default modelMap.reduce((aggr, curr)=>{
    const convertAdvancedToSpecific=curr['advancedTo'+curr.name]
    const modelCal=getCalibration(curr.name, convertAdvancedToSpecific)
    const filterParam=getFeature(curr.parameters)
    const variableItemsGenerator=getBounds(filterParam('variable'), convertAdvancedToSpecific)
    const staticItemsGenerator=getBounds(filterParam('static'), convertAdvancedToSpecific)
    const constantItems=filterParam('constant')
    const getActualJson=convertSpecificToAdvanced(curr)
    const mapStateToProps=state=>({
        parameters:{...state[curr.name+parameters], quantile:state.quantile},
        validation:state[curr.name+validation],
        notify:state[curr.name+notify],
        calibrateParameters:state.calibrateParameters, 
        staticItems:staticItemsGenerator(state.staticRange),
        variableItems:variableItemsGenerator(state.staticRange), 
        constantItems,
        getActualJson,
        spline:state.spline
    })
    
    const mapDispatchToProps=dispatch=>({
        updateParameters:(key, value, validateStatus)=>{
            updateParameters['update'+curr.name](key, value, validateStatus, dispatch)
        },
        submitCalibration:generateCalibrationOptions(dispatch, getActualJson, modelCal),
        submitOptions:generateSubmitOptions(dispatch, getActualJson, getAllData)
    })
    
    return {
        ...aggr, [curr.name]:connect(
            mapStateToProps,
            mapDispatchToProps
        )(ModelForm)
    }
}, {})
