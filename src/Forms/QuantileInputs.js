import React from 'react'
import { createArray, handleForm } from '../utils'
import CustomDrop from './FormHelper'
import { updateCustom } from '../Actions/parameters'
import { getVaRData } from '../Actions/lambda'
import { connect } from 'react-redux'
import { Form, Button, Row, Col} from 'antd'
import PropTypes from 'prop-types'
import {    
    flexObj,
    gutter
} from './globalOptions'
const quantileOptions=createArray(.001, .05, .001)
const FormItem=Form.Item
const QuantileInputs=({quantileParameters, updateOptions, submitOptions})=>(
    <Row gutter={gutter}>
        <Col {...flexObj}>
            <CustomDrop 
                objKey='quantile' 
                parms={quantileParameters}
                options={quantileOptions}
                round={3}
                toolTip="This is the quantile of the asset return distribution.  A .01 quantile translates to a 99% VaR"
                label="Quantile"
                onChange={updateOptions}
            />
        </Col>
        <Col {...flexObj}>
            <FormItem>
                <Button 
                    className='side-button submit-button' type="primary" 
                    onClick={handleForm(submitOptions, quantileParameters)}
                >Update</Button>
            </FormItem>
        </Col>
    </Row>
)
QuantileInputs.propTypes={
    quantileParameters:PropTypes.shape({
        quantile:PropTypes.number.isRequired
    }),
    updateOptions:PropTypes.func.isRequired,
    submitOptions:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    quantileParameters:state.customParameters
})

const mapDispatchToProps =dispatch=>({
    updateOptions:(key, value)=>updateCustom(key, value, dispatch),
    submitOptions:vals=>getVaRData(vals, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QuantileInputs)