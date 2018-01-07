import React from 'react'
import { handleForm } from '../utils'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import { getAllData } from '../Actions/lambda'
import {
    sigmaOptions,
    flexObj,
    gutter
} from './globalOptions'
import { Row, Col, Form, Button } from 'antd'
import {
    updateCustom,
    updateAllCustom
} from '../Actions/parameters'
import ShowJson from './ShowJson'
import {
    convertBSToCustom
} from './parameterConversion'

const FormItem=Form.Item

const BSForm=({customParameters, submitOptions, updateCustom})=>(
    <Form onSubmit={handleForm(submitOptions, customParameters)}>
        <Row gutter={gutter}>
            <Col {...flexObj}>
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
            <Col {...flexObj}>
                <FormItem>
                    <Button 
                        className='side-button submit-button' 
                        type="primary" htmlType="submit"
                    >Update</Button>
                </FormItem>
            </Col>
        </Row>
        <ShowJson parameters={convertBSToCustom(customParameters)}/>
    </Form>
)

const mapStateToPropsBS=state=>({
    customParameters:state.customParameters
})
const mapDispatchToPropsBS=dispatch=>({
    updateCustom:(key, value)=>{
        /*updateCustom('C', 0, dispatch)
        updateCustom('v0', 1.0, dispatch)
        updateCustom('adaV', 0.0, dispatch)*/
        updateCustom(key, value, dispatch)
    },
    submitOptions:vals=>{
        const updatedCustom=convertBSToCustom(vals)
        getAllData(updatedCustom, dispatch)
        updateAllCustom(updatedCustom, dispatch)
    }
})
export default connect(
    mapStateToPropsBS,
    mapDispatchToPropsBS
)(BSForm)
