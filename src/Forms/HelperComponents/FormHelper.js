import React from 'react'
import { Tooltip, Input, Form, Button, Select, InputNumber, Slider } from 'antd'
import PropTypes from 'prop-types'
import { fullWidth, formItemLayoutLabel } from '../globalOptions'

const onChangeHelper=getV=>(onChange, validator, objKey)=>value=>{
    const isValid=validator?validator.fn(getV(value)):'truthy'
    onChange(objKey, getV(value), typeof isValid==='boolean'?'error':'') 
}

const FormItem=Form.Item
const Option=Select.Option

const parseArrOrNumber=(arr, fn)=>Array.isArray(arr)?arr.map(val=>fn(val)):fn(arr)
const fixedVal=round=>val=>val.toFixed(round)
const onSelectHelper=(onChange, key, parms)=>value=>onChange(key, parseArrOrNumber(value, parseFloat), parms)

export const CustomNumberDrop=({objKey, parms, options, onChange, round, toolTip, multiSelect})=>(
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
export const CustomDateDrop=({objKey, parms, options, onChange, toolTip})=>(
<Tooltip placement="top" title={toolTip}>
    <Select
        value={parms[objKey]}
        onChange={v=>onChange(objKey, v)}
        style={fullWidth}
    >
        {options.map(option=>{
            const date=new Date(option)
            return <Option key={option} value={option}>{date.toLocaleDateString()}</Option>
        })}
    </Select>
</Tooltip>
)

CustomNumberDrop.propTypes={
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
        onChange={onChangeHelper(v=>v)(onChange, validator, objKey)}
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

export const CustomInputText=({objKey, parms, onChange, toolTip, validator})=>(
    <Tooltip placement="top" title={toolTip}>
        <Input
            value={parms[objKey]}
            onChange={onChangeHelper(e=>e.target.value)(onChange, validator, objKey)}
            style={fullWidth}
        />
    </Tooltip>
)

CustomInputText.propTypes={
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
    <FormItem {...formItemLayoutLabel} label={label} validateStatus={validationResults} help={validationResults&&validator.help}>
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
export const CustomFormItemTextInput=CustomFormItemGeneric(CustomInputText)

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

export const CustomSlider=({range, onChange, label, objKey, min, max})=>(
    <FormItem 
        {...formItemLayoutLabel} 
        colon={false} 
        label={label}
    >
        <Slider 
            style={fullWidth} range 
            value={[range.lower, range.upper]} 
            min={min} max={max} 
            onChange={val=>onChange(objKey, val)} 
            step={(max-min)/100}
        />
    </FormItem>
)