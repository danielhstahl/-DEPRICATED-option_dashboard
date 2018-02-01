import React from 'react'
import { connect } from 'react-redux'
import { CustomFormItemTextArea, CustomUpdateButton } from './FormHelper'
import { flexObj } from './globalOptions'
import { handleForm, validateAll, rangeValidator } from '../Utils/utils'
import parameters from '../Actions/parameters'
import { Col } from 'antd'
import {modelMap} from '../modelSkeleton'


const validator={
    fn:rangeValidator(0, 1000000),
    help:'Requires positive, comma separated numbers like "2, 3, 4"'
}
export const switchComponent=(condition, Component1, Component2)=>{
    return condition?Component1:Component2
}
<<<<<<< HEAD
=======

>>>>>>> e92be43bff6bf96c965e6886af324dcbbf92ab27

const InputCalibrator=({
    calibrateValidation, calibrateParameters, 
    constantItems,
    parameters, validation, submitOptions, 
    updateCalibration, isInProgress, constantItems,
    variableItems
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
        disabled={validateAll({...validation, ...calibrateValidation})}
        onClick={handleForm(submitOptions, {...constantItems, ...parameters, ...calibrateParameters, variable:variableItems})}
        text="Calibrate"
        loading={isInProgress}
    />  
</Col>
]

const mapStateToProps=({calibrateParameters, calibrateValidation})=>({calibrateParameters, calibrateValidation})

const mapDispatchToProps=dispatch=>({
    updateCalibration:(key, value, validateStatus)=>{
        parameters.updateCalibration(key, value, validateStatus, dispatch)
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputCalibrator)