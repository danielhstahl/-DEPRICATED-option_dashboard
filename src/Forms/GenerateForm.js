import React from 'react'
import { handleForm, validateAll, createBounds, generateSubmitOptions } from '../Utils/utils'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getCalibration } from '../Actions/lambda'
import { connect } from 'react-redux'
import { parameters, notify, validation } from '../Actions/actionDefinitions'
import InputCalibrator, { switchComponent } from './InputCalibrator'
import updateParameters from '../Actions/parameters'
import { Row, Col } from 'antd'
import { modelMap } from '../modelSkeleton'
import ShowJson from './ShowJson'
import {
    flexObj,
    gutter
} from './globalOptions'
import CommonInputs from './CommonInputs'

const Manual=({validation, calibrateParameters, parameters, update, submitOptions, formItems})=>[...formItems.map(({key, validator, label, toolTip}, index)=>(
        <Col {...flexObj} key={index}>
            <CustomFormItemInput
                label={label}
                objKey={key}
                parms={parameters}
                validator={validator}
                validationResults={validation}
                toolTip={toolTip}
                onChange={update}
            />
        </Col>
    )), 
    <Col {...flexObj} key={formItems.length}>
        <CustomUpdateButton
            disabled={validateAll(validation)}
            onClick={handleForm(
                submitOptions, {...parameters, ...calibrateParameters}
            )}
        />
    </Col>
]

const ModelForm=({
    type, parameters, validation, 
    notify, calibrateParameters,
    staticItems,
    variableItems, 
    constantItems, 
    updateParameters, 
    submitCalibration, submitOptions, getActualJson
})=>[
    <Row gutter={gutter} key={0}>
        <CommonInputs 
            parameters={parameters} 
            validation={validation} 
            update={updateParameters} 
            formItems={staticItems}
        />
        {switchComponent(type==='manual', 
        <Manual 
            formItems={variableItems}
            validation={validation} 
            parameters={parameters} 
            update={updateParameters} 
            submitOptions={submitOptions}
            calibrateParameters={calibrateParameters}
        />, 
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
const getValidator=arr=>arr.map(({key, uBound, lBound, ...rest})=>({
    key,
    ...rest,
    validator:createBounds(lBound, uBound)
}))

const getFeature=arr=>chosenFeature=>arr.filter(({feature})=>feature===chosenFeature)

export default modelMap.reduce((aggr, curr)=>{
    const modelCal=getCalibration(curr.name, curr['advancedTo'+curr.name])
    const filterParam=getFeature(curr.parameters)
    const variableItems=getValidator(filterParam('variable'))
    const staticItems=getValidator(filterParam('static'))
    const constantItems=filterParam('constant')
    const mapStateToProps=state=>({
        parameters:state[curr.name+parameters],
        validation:state[curr.name+validation],
        notify:state[curr.name+notify],
        calibrateParameters:state.calibrateParameters, 
        staticItems,
        variableItems, 
        constantItems,
        getActualJson:curr[curr.name+'ToAdvanced']
    })
    
    const mapDispatchToProps=dispatch=>({
        updateParameters:(key, value, validateStatus)=>{
            updateParameters['update'+curr.name](key, value, validateStatus, dispatch)
        },
        submitCalibration:parameters=>{
            modelCal(parameters, dispatch)
        },
        submitOptions:generateSubmitOptions(dispatch, curr)
    })
    
    return {
        ...aggr, [curr.name]:connect(
            mapStateToProps,
            mapDispatchToProps
        )(ModelForm)
    }
}, {})
