import React from 'react'
import { createArray, handleForm } from '../Utils/utils'
import { CustomDrop } from './FormHelper'
import { updateQuantile } from '../Actions/parameters'
import { getVaRData } from '../Actions/lambda'
import { connect } from 'react-redux'
import { Button, Row, Col} from 'antd'
import PropTypes from 'prop-types'
import {    
    gutter
} from './globalOptions'
const quantileOptions=createArray(.001, .05, .001)
const QuantileInputs=({quantileParameters, updateQuantile, submitOptions})=>(
    <Row gutter={gutter}>
        <Col xs={24} md={16}>
            <CustomDrop 
                objKey='quantile' 
                parms={quantileParameters}
                options={quantileOptions}
                round={3}
                toolTip="This is the quantile of the asset return distribution.  A .01 quantile translates to a 99% VaR"
                label="Quantile"
                onChange={updateQuantile}
            />
        </Col>
        <Col xs={24} md={8}>
            
            <Button 
                className='side-button submit-button' type="primary" 
                onClick={handleForm(submitOptions, quantileParameters)}
            >Update</Button>
        </Col>
    </Row>
)
QuantileInputs.propTypes={
    quantileParameters:PropTypes.shape({
        quantile:PropTypes.number.isRequired,
    }),
    updateQuantile:PropTypes.func.isRequired,
    submitOptions:PropTypes.func.isRequired
}

const mapStateToProps=({optionParameters, quantile})=>({
    quantileParameters:{
        ...optionParameters,
        quantile
    }
})

const mapDispatchToProps =dispatch=>({
    updateQuantile:(key, value)=>updateQuantile(value, dispatch),
    submitOptions:vals=>getVaRData(vals, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QuantileInputs)