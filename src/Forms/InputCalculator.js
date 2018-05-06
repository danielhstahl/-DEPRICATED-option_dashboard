import React from 'react'
import { connect } from 'react-redux'
import { validateAll } from './helperValidators'
import { CommonInputs, CommonUpdateButton } from './CommonInputs'
const InputCalculator=({
    parameters, validation, updateParameters, variableItems,
    calibrateParameters, submitOptions
})=>[
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
]
const mapStateToProps=({form})=>form //includes calibrateParameters

export default connect(
    mapStateToProps
)(InputCalculator)