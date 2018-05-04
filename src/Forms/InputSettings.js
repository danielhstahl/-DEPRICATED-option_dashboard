import React from 'react'
import { connect } from 'react-redux'
import { updateSlider } from '../Actions/parameters' 
import { CustomSlider } from './FormHelper'
import { Col } from 'antd'
const InputSettings=({
    variableItems,range,updateSlider
})=>variableItems.map(({bounds, key, label})=>(
    <Col xs={24} key={key} >
        <CustomSlider 
            objKey={key}
            range={range[key]||bounds} 
            min={bounds.lower} 
            max={bounds.upper} 
            label={label}
            onChange={updateSlider}
        />
    </Col>
))
const mapStateToProps=({range})=>({range})
const mapDispatchToProps=dispatch=>({
    updateSlider:(key, value)=>{
        updateSlider(key, value, dispatch)
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputSettings)