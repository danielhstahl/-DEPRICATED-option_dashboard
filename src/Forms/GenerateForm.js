import React from 'react'
import { validateAll, createBounds, generateSubmitOptions, convertSpecificToAdvanced, generateCalibrationOptions } from '../Utils/utils'
import { getCalibration, getAllData } from '../Actions/lambda'
import { connect } from 'react-redux'
import { parameters, notify, validation } from '../Actions/actionDefinitions'
import InputCalibrator, { switchComponent } from './InputCalibrator'
import updateParameters from '../Actions/parameters'
import { Row } from 'antd'
import { modelMap } from '../modelSkeleton'
import ShowJson from './ShowJson'
import {
    gutter
} from './globalOptions'
import { CommonInputs, CommonUpdateButton } from './CommonInputs'

const ModelForm=({
    type, parameters, validation, 
    notify, calibrateParameters,
    staticItems,
    variableItems, 
    constantItems, 
    updateParameters, 
    submitCalibration, submitOptions, getActualJson
})=>{
    const CurryCommonInput=({formItems})=>(
        <CommonInputs 
            parameters={parameters}
            validation={validation}
            update={updateParameters}
            formItems={formItems}
        />
    )
    return [
        <Row gutter={gutter} key={0}>
            <CurryCommonInput formItems={staticItems}/>
            {switchComponent(type==='manual', 
            [
                <CurryCommonInput key={0} formItems={variableItems}/>,
                <CommonUpdateButton
                    key={1}
                    submitOptions={submitOptions}
                    calibrateParameters={calibrateParameters}
                    validateAll={validateAll}
                    parameters={parameters}
                    validation={validation}
                />
            ], 
            <InputCalibrator 
                variableItems={variableItems}
                constantItems={constantItems}
                parameters={parameters} 
                validation={validation}
                submitOptions={submitCalibration}
                isInProgress={notify}
            />)}
        </Row>,
        <Row key={1}>
            <ShowJson parameters={getActualJson(parameters)}/>
        </Row>
    ]
}
/*
const getValidator=arr=>arr.map(({key, uBound, lBound, ...rest})=>({
    key,
    ...rest,
    validator:createBounds(lBound, uBound)
}))*/

const getFeature=arr=>chosenFeature=>arr.filter(({feature})=>feature===chosenFeature)

const getSubKeys=key=>(arr, obj)=>arr.reduce((aggr, curr)=>({...aggr, [curr]:obj[curr][key]}), {})

const getBounds=(parameters, convertAdvancedToSpecific)=>ranges=>{
    const rangeKeys=Object.keys(ranges)
    const upperRanges=getSubKeys('upper')(rangeKeys, ranges)
    const lowerRanges=getSubKeys('lower')(rangeKeys, ranges)
    const convertedUpperRanges=convertAdvancedToSpecific(upperRanges)
    const convertedLowerRanges=convertAdvancedToSpecific(lowerRanges)
    return parameters.map(v=>({
        ...v, 
        validator:createBounds(convertedLowerRanges[v.key], convertedUpperRanges[v.key])
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
        staticItems:staticItemsGenerator(state.range),
        variableItems:variableItemsGenerator(state.range), 
        constantItems,
        getActualJson 
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
