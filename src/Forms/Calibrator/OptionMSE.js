import React from 'react'
import { connect } from 'react-redux'
import {getMaturities} from '../../Actions/lambda' 
import { Col, Alert } from 'antd'
import { arrayValidator, validateAll } from '../helperValidators'
import actionParameters from '../../Actions/parameters' 
import {mapStateToProps } from '../reduxInjections'
import {flexObj} from '../globalOptions'
import {PARAMETERS} from '../../Utils/constants'

const OptionMSE=({
    model, 
    ...form
})=>(
    <Col {...flexObj} key={4}>
        {form[model+PARAMETERS].mse?<Alert message={`Mean Squared Error: ${form[model+PARAMETERS].mse}`} type="success" />:null}  
    </Col>
)
export default connect(
    mapStateToProps
)(OptionMSE)