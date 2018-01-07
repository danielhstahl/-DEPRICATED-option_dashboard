import React from 'react'
import { handleForm } from '../utils'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import { getAllData } from '../Actions/lambda'
import {
    sigmaOptions
} from './globalOptions'
import { Row, Col, Form } from 'antd'
import {
    updateCustom 
} from '../Actions/parameters'

const BSForm=({customParameters, submitOptions, updateCustom})=>(
    <Form onSubmit={handleForm(submitOptions, customParameters)}>
        <Row gutter={16}>
            <Col span={12}>
                <CustomDrop 
                    objKey='sigma' 
                    round={2}
                    parms={customParameters}
                    options={sigmaOptions}
                    toolTip="Volatility of diffusion"
                    label="Volatility"
                    onChange={updateCustom}
                />
            </Col>
        </Row>
    </Form>
)

const mapStateToPropsBS=state=>({
    customParameters:state.customParameters
})
const mapDispatchToPropsBS=dispatch=>({
    updateCustom:(key, value)=>{
        updateCustom('C', 0, dispatch)
        updateCustom('v0', 1.0, dispatch)
        updateCustom('adaV', 0.0, dispatch)
        updateCustom(key, value, dispatch)
    },
    submitOptions:vals=>getAllData(vals, dispatch)
})
export default connect(
    mapStateToPropsBS,
    mapDispatchToPropsBS
)(BSForm)
