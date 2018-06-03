import React from 'react'
import { connect } from 'react-redux'
import { Col, Alert } from 'antd'
import {mapStateToProps } from '../reduxInjections'
import {flexObj} from '../globalOptions'
import {PARAMETERS} from '../../Utils/constants'

const OptionMSE=({
    model, 
    ...form
})=>(
    <Col {...flexObj} key={4}>
        {form[model.name+PARAMETERS].mse?<Alert message={`Mean Squared Error: ${form[model.name+PARAMETERS].mse}`} type="success" />:null}  
    </Col>
)
export default connect(
    mapStateToProps
)(OptionMSE)