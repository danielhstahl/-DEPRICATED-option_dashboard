import React from 'react'
import { Tooltip, Input, Form, Button, Select } from 'antd'
import PropTypes from 'prop-types'
import { fullWidth, formItemLayoutLabel } from './globalOptions'

//const parseArrOrNumber=(arr, fn)=>Array.isArray(arr)?arr.map(val=>fn(val)):fn(arr)
const onChangeHelper=(onChange, validator, objKey)=>value=>{
    const isValid=validator?validator(value):true
    onChange(objKey, value, isValid?'':'error') 
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
