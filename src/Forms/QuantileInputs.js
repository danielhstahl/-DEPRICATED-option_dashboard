import React from 'react'
import {createArray, handleForm} from '../utils'
import CustomDrop from './FormHelper'
import {updateOptions} from '../Actions/parameters'
import {getVaRData} from '../Actions/lambda'
import { connect } from 'react-redux'
import {Form, Button} from 'antd'
import PropTypes from 'prop-types'

const quantileOptions=createArray(.001, .05, .001)

const QuantileInputs=({quantileParameters, updateOptions, submitOptions})=>(
    <Form onSubmit={handleForm(quantileParameters, submitOptions)}>
        <CustomDrop 
            objKey='quantile' 
            parms={quantileParameters}
            options={quantileOptions}
            round={3}
            toolTip="This is the quantile of the asset return distribution.  A .01 quantile translates to a 99% VaR"
            label="Quantile"
            onChange={updateOptions}
        />
        <Button className='side-button submit-button' type="primary" htmlType="submit">Update</Button>
    </Form>
)
QuantileInputs.propTypes={
    quantileParameters:PropTypes.shape({
        quantile:PropTypes.number.isRequired
    }),
    updateOptions:PropTypes.func.isRequired,
    submitOptions:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    quantileParameters:state.optionParameters
})

const mapDispatchToProps =dispatch=>({
    updateOptions:(key, value)=>updateOptions(key, value, dispatch),
    submitOptions:vals=>getVaRData(vals, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(QuantileInputs)