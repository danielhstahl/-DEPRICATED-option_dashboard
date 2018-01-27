import React from 'react'
import { Tooltip, Input, Form, Button, Select, InputNumber } from 'antd'
import PropTypes from 'prop-types'
import { fullWidth, formItemLayoutLabel } from './globalOptions'
import { isNotComplete } from '../Utils/utils'
const onChangeNumberHelper=(onChange, validator, objKey)=>value=>{
    const isValid=validator?validator.fn(value):true
    onChange(objKey, value, isValid?'':'error') 
}
const onChangeTextAreaHelper=(onChange, validator, objKey)=>e=>{
    const value=e.target.value
    const result=value.split(',').map(val=>isNotComplete(val)?val:validator.fn(val)||val)
    onChange(objKey, result, result.find(v=>!validator.fn(v))?'error':'') 
}

const FormItem=Form.Item
const Option=Select.Option

const parseArrOrNumber=(arr, fn)=>Array.isArray(arr)?arr.map(val=>fn(val)):fn(arr)
const fixedVal=round=>val=>val.toFixed(round)
const onSelectHelper=(onChange, key, parms)=>value=>onChange(key, parseArrOrNumber(value, parseFloat), parms)

export const CustomDrop=({objKey, parms, options, onChange, round, toolTip, multiSelect})=>(
<Tooltip placement="top" title={toolTip}>
    <Select
        value={parseArrOrNumber(parms[objKey], fixedVal(round))}
        onChange={onSelectHelper(onChange, objKey, parms)}
        mode={multiSelect?'multiple':null}
        style={fullWidth}
    >
        {options.map(option=>{
            const val=option.toFixed(round)
            return <Option key={val} value={val}>{val}</Option>
        })}
    </Select>
</Tooltip>
)

CustomDrop.propTypes={
    objKey:PropTypes.string.isRequired,
    parms:PropTypes.object.isRequired,
    options:PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange:PropTypes.func.isRequired,
    round:PropTypes.number.isRequired,
    toolTip:PropTypes.string.isRequired
}

export const CustomInput=({objKey, parms, onChange, toolTip, validator})=>(
<Tooltip placement="top" title={toolTip}>
    <InputNumber
        value={parms[objKey]}
        onChange={onChangeNumberHelper(onChange, validator, objKey)}
        style={fullWidth}
    />
</Tooltip>
)

CustomInput.propTypes={
    objKey:PropTypes.string.isRequired,
    parms:PropTypes.object.isRequired,
    onChange:PropTypes.func.isRequired,
    toolTip:PropTypes.string.isRequired,
    validator:PropTypes.shape({
        fn:PropTypes.func.isRequired,
        help:PropTypes.string.isRequired
    })
}
export const CustomTextArea=({objKey, parms, onChange, toolTip, validator})=>(
<Tooltip placement="top" title={toolTip}>
    <Input.TextArea
        autosize
        value={parms[objKey]}
        onChange={onChangeTextAreaHelper(onChange, validator, objKey)}
        style={fullWidth}
    />
</Tooltip>
)
CustomTextArea.propTypes={
    objKey:PropTypes.string.isRequired,
    parms:PropTypes.object.isRequired,
    onChange:PropTypes.func.isRequired,
    toolTip:PropTypes.string.isRequired,
    validator:PropTypes.shape({
        fn:PropTypes.func.isRequired,
        help:PropTypes.string.isRequired
    })
}

const CustomFormItemGeneric=CustInput=>({objKey, parms, onChange, toolTip, label, validator, validationResults})=>(
    <FormItem {...formItemLayoutLabel} label={label} validateStatus={validationResults[objKey]} help={validationResults[objKey]&&validator.help}>
        <CustInput objKey={objKey} parms={parms} onChange={onChange} toolTip={toolTip} validator={validator}/>
    </FormItem>
)

CustomFormItemGeneric.propTypes={
    ...CustomInput.propTypes,
    validationResults:PropTypes.object.isRequired,
    label:PropTypes.string.isRequired,
    validator:PropTypes.shape({
        fn:PropTypes.func.isRequired,
        help:PropTypes.string.isRequired
    })
}

export const CustomFormItemInput=CustomFormItemGeneric(CustomInput)
export const CustomFormItemTextArea=CustomFormItemGeneric(CustomTextArea)

export const CustomUpdateButton=({disabled, onClick, text, ...rest})=>(
    <FormItem {...formItemLayoutLabel} colon={false} label=" ">
        <Button 
            style={fullWidth}
            className='side-button submit-button' 
            type="primary" 
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >{text||"Update"}</Button>
    </FormItem>
)
CustomUpdateButton.propTypes={
    disabled:PropTypes.bool,
    onClick:PropTypes.func.isRequired
}
