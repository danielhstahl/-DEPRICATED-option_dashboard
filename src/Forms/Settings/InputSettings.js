import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'antd'
import { CustomSlider } from '../HelperComponents/FormHelper'
import {mapStateToProps, mapDispatchToProps} from '../reduxInjections'
import {getParametersByFeature} from '../../Utils/conversionUtils'
import { getFormItems} from '../helperValidators'
const InputSettings=({
    model,
    updateSlider,
    range
})=>getFormItems(model, getParametersByFeature(model.parameters, 'variable'), range.defaultRange).map(({bounds, key, label})=>(
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