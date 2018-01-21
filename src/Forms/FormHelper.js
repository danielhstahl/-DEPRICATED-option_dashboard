import React from 'react'
import { Tooltip, Input, Form } from 'antd'
import PropTypes from 'prop-types'
import { fullWidth, formItemLayoutLabel } from './globalOptions'

//const parseArrOrNumber=(arr, fn)=>Array.isArray(arr)?arr.map(val=>fn(val)):fn(arr)
const onChangeHelper=(onChange, validator, objKey, parms)=>value=>{
    const isValid=validator?validator(value):true
    onChange(objKey, value, isValid?'':'error', parms) 
}

const FormItem=Form.Item
export const CustomInput=({objKey, parms, onChange, toolTip, validator})=>(
<Tooltip placement="top" title={toolTip}>
    <Input
        value={parms[objKey]}
        onChange={onChangeHelper(onChange, validator, objKey, parms)}
        style={fullWidth}
    />
</Tooltip>
)

CustomInput.propTypes={
    objKey:PropTypes.string.isRequired,
    parms:PropTypes.object.isRequired,
    onChange:PropTypes.func.isRequired,
    round:PropTypes.number.isRequired,
    toolTip:PropTypes.string.isRequired,
    validator:PropTypes.func
}


export const CustomFormItemInput=({objKey, parms, onChange, toolTip, label, validator})=>(
    <FormItem {...formItemLayoutLabel} label={label} validateStatus={parms[objKey].validateStatus}>
        <CustomInput objKey={objKey} parms={parms} onChange={onChange} toolTip={toolTip} validator={validator}/>
    </FormItem>
)

CustomFormItemInput.propTypes={
    ...CustomInput.propTypes,
    label:PropTypes.string.isRequired,
    validator:PropTypes.func
}

export const CustomUpdateButton=({disabled, onClick, ...rest})=>(
    <FormItem {...formItemLayoutLabel} colon={false} label=" ">
        <Button 
            style={fullWidth}
            className='side-button submit-button' 
            type="primary" 
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >Update</Button>
    </FormItem>
)
CustomUpdateButton.propTypes={
    disabled:PropTypes.bool,
    onClick:PropTypes.func.isRequired
}
