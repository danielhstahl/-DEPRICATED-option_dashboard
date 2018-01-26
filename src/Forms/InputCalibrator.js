import React from 'react'
import { CustomFormItemTextArea, CustomUpdateButton } from './FormHelper'
import { flexObj } from './globalOptions'
import { handleForm, validateAll } from '../Utils/utils'
import { Col } from 'antd'
const checkValidJson=(jsonString)=>{
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o
        }
    }
    catch (e) { }
    return false
}

const validator={
    fn:commaString=>checkValidJson(`[${commaString}]`),
    help:'Requires comma seperated values like "2, 3, 4"'
}
export const switchComponent=(condition, Component1, Component2)=>{
    return condition?Component1:Component2
}
const InputCalibrator=({validation, parameters, submitOptions, onChange, isInProgress})=>[
<Col xs={24} key={1}>
    <CustomFormItemTextArea 
        objKey='k' 
        validationResults={validation}
        label="Strikes"
        parms={parameters}
        validator={validator}
        toolTip="Comma separated array of strikes"
        onChange={onChange}
    />
</Col>,
<Col xs={24} key={2}>
    <CustomFormItemTextArea 
        objKey='prices' 
        validationResults={validation}
        label="Prices"
        parms={parameters}
        validator={validator}
        toolTip="Comma separated array of prices"
        onChange={onChange}
    />
</Col>,
<Col {...flexObj} key={3}>
    <CustomUpdateButton
        disabled={validateAll(validation)}
        onClick={handleForm(submitOptions, parameters)}
        text="Calibrate"
        loading={isInProgress}
    />  
</Col>
]

//const mapStateToProps=({calibrateParameters, calibrateValidation})=>({calibrateParameters, calibrateValidation})

/*const mapDispatchToProps=dispatch=>({
    updateCalibration:(key, value, validateStatus)=>{
        updateCalibration(key, value, validateStatus, dispatch)
    }
})*/
export default InputCalibrator
/*export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputCalibrator)*/