import React from 'react'
import { Select, Tooltip} from 'antd'
import PropTypes from 'prop-types'
import { fullWidth } from './globalOptions'
const Option = Select.Option
const parseArrOrNumber=(arr, fn)=>Array.isArray(arr)?arr.map(val=>fn(val)):fn(arr)
const fixedVal=round=>val=>val.toFixed(round)
const onChangeHelper=(onChange, key, parms)=>value=>onChange(key, parseArrOrNumber(value, parseFloat), parms)

const CustomDrop=({objKey, parms, options, onChange, round, toolTip, multiSelect})=>(
<Tooltip placement="top" title={toolTip}>
    <Select
        value={parseArrOrNumber(parms[objKey], fixedVal(round))}
        onChange={onChangeHelper(onChange, objKey, parms)}
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
    //label:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    round:PropTypes.number.isRequired,
    toolTip:PropTypes.string.isRequired
}
export default CustomDrop