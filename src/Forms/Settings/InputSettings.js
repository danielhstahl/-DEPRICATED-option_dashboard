import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'antd'
import actionParameters from '../../Actions/parameters' 
import { CustomSlider } from '../HelperComponents/FormHelper'
import {mapStateToProps, mapDispatchToProps} from '../reduxInjections'
import {modelObj} from '../../modelSkeleton'
import {getParametersByFeature} from '../../Utils/conversionUtils'

const InputSettings=({
    model,
    updateSlider,
    range
})=>getParametersByFeature(modelObj[model].parameters, 'variable').map(({bounds, key, label})=>(
    <Col xs={24} key={key} >
        <CustomSlider 
            objKey={key}
            range={range.currentRange[key]||bounds} 
            min={bounds.lower} 
            max={bounds.upper} 
            label={label}
            onChange={updateSlider}
        />
    </Col>
))

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputSettings)