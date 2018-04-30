import React from 'react'
import { connect } from 'react-redux'
import { CustomFormItemTextArea, CustomUpdateButton, CustomSlider } from './FormHelper'
import { flexObj } from './globalOptions'
import { validateAll, rangeValidator } from '../Utils/utils'
import actionObjWithUpdateCalibration from '../Actions/parameters' 
import { Col, Alert } from 'antd'
import PropTypes from 'prop-types'

const { updateCalibration }=actionObjWithUpdateCalibration
const validator={
    fn:rangeValidator(0, 1000000),
    help:'Requires positive, comma separated numbers like "2, 3, 4"'
}
export const switchComponent=(condition, Component1, Component2)=>{
    return condition?Component1:Component2
}

const InputCalibrator=({
    calibrateValidation, calibrateParameters,
    variableItems,
    parameters, validation, submitOptions, 
    updateCalibration, isInProgress
})=>[
<Col xs={24} key={1}>
    <CustomFormItemTextArea 
        objKey='k' 
        validationResults={calibrateValidation}
        label="Strikes"
        parms={calibrateParameters}
        validator={validator}
        toolTip="Comma separated array of strikes"
        onChange={updateCalibration}
    />
</Col>,
<Col xs={24} key={2}>
    <CustomFormItemTextArea 
        objKey='prices' 
        validationResults={calibrateValidation}
        label="Prices"
        parms={calibrateParameters}
        validator={validator}
        toolTip="Comma separated array of prices"
        onChange={updateCalibration}
    />
</Col>,
...variableItems.map(({bounds, key, label})=>
    <CustomSlider 
        range={calibrateParameters.constraints[key]||bounds} 
        {...bounds} key={key} 
        label={label}
    />
),
<Col {...flexObj} key={3}>
    <CustomUpdateButton
        disabled={validateAll({...validation, ...calibrateValidation})}
        onClick={submitOptions({
            ...parameters, 
            ...calibrateParameters
        })}
        text="Calibrate"
        loading={isInProgress}
    />  
</Col>,
<Col {...flexObj} key={4}>
    {parameters.mse?<Alert message={`Mean Squared Error: ${parameters.mse}`} type="success" />:null}  
</Col>
]

InputCalibrator.propTypes={
    calibrateParameters:PropTypes.shape({
        prices:PropTypes.arrayOf(PropTypes.number).isRequired,
        k:PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
    calibrateValidation:PropTypes.object.isRequired,
    parameters:PropTypes.shape({
        mse:PropTypes.number
    }), 
    validation:PropTypes.object.isRequired, 
    submitOptions:PropTypes.func.isRequired, 
    updateCalibration:PropTypes.func.isRequired, 
    isInProgress:PropTypes.bool.isRequired
}

const mapStateToProps=({calibrateParameters, calibrateValidation})=>({calibrateParameters, calibrateValidation})

const mapDispatchToProps=dispatch=>({
    updateCalibration:(key, value, validateStatus)=>{
        updateCalibration(key, value, validateStatus, dispatch)
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputCalibrator)