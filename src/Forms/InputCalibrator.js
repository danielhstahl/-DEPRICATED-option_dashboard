import React from 'react'
import { connect } from 'react-redux'
import { CustomFormItemTextArea, CustomUpdateButton } from './FormHelper'
import { flexObj } from './globalOptions'
import { validateAll, rangeValidator } from '../Utils/utils'
import parameterObj from '../Actions/parameters' 
import { Col, Alert } from 'antd'
import PropTypes from 'prop-types'
const { updateCalibration }=parameterObj
const validator={
    fn:rangeValidator(0, 1000000),
    help:'Requires positive, comma separated numbers like "2, 3, 4"'
}

const isStockOutOfBounds=({S0, k})=>k.length>0?S0<k[0]||S0>k[k.length-1]:true

const InputCalibrator=({
    calibrateValidation, calibrateParameters,
    variableItems,range,
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
<Col {...flexObj} key={3}>
    <CustomUpdateButton
        disabled={validateAll({...validation, ...calibrateValidation})||isStockOutOfBounds({...parameters, ...calibrateParameters})}
        onClick={submitOptions({
            ...parameters, 
            ...calibrateParameters,
            constraints:range
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

const mapStateToProps=({calibrateParameters, calibrateValidation, range})=>({calibrateParameters, calibrateValidation, range})

const mapDispatchToProps=dispatch=>({
    updateCalibration:(key, value, validateStatus)=>{
        updateCalibration(key, value, validateStatus, dispatch)
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputCalibrator)