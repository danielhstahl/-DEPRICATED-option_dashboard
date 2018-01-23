import { CustomFormItemTextArea, CustomUpdateButton } from './FormHelper'
import { flexObj } from './globalOptions'

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
export default InputCalibrator=({calibrationParameters, calibrationValidation, otherValidation, otherParameters, update})=>(
<Col xs={24}>
    <CustomFormItemTextArea 
        objKey='strikes' 
        validationResults={calibrationValidation}
        label="Strikes"
        parms={calibrationParameters}
        validator={validator}
        toolTip="Comma separated array of strikes"
        onChange={update}
    />
</Col>
<Col xs={24}>
    <CustomFormItemTextArea 
        objKey='prices' 
        validationResults={calibrationValidation}
        label="Prices"
        parms={calibrationParameters}
        validator={validator}
        toolTip="Comma separated array of prices"
        onChange={update}
    />
</Col>
<Col xs={12}>
    <CustomUpdateButton
        disabled={validateAll({...otherValidation, ...calibrateValidation})}
        onClick={handleForm(submitOptions, {...calibrationParameters, ...otherParameters})}
    />
</Col>
)

const mapStateToProps=({calibrationParameters, calibrationValidation})=>({calibrationParameters, calibrationValidation})