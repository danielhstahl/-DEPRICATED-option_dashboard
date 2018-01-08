import React from 'react'
import { createArray, handleForm } from '../utils'
import CustomDrop from './FormHelper'
import { getAllData } from '../Actions/lambda'
import { connect } from 'react-redux'
import { updateHeston, updateAllCustom } from '../Actions/parameters'
import { Row, Col, Form, Button } from 'antd'
import ShowJson from './ShowJson'
import { rhoOptions, speedOptions, adaOptions, flexObj, gutter } from './globalOptions'
import { convertHestonToCustom } from './parameterConversion'

const FormItem=Form.Item
const v0Options=createArray(.01, .25, .01)
const HestonForm=({customParameters, hestonParameters, submitOptions, updateHeston})=>(
    <Form onSubmit={handleForm(submitOptions, hestonParameters, customParameters)} layout='vertical'>
        <Row gutter={gutter}>
            <Col {...flexObj}>
                <CustomDrop 
                    objKey='speed' 
                    round={1}
                    parms={hestonParameters}
                    options={speedOptions}
                    toolTip="Speed of mean reversion of variance process"
                    label="Speed"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col {...flexObj}>
                <CustomDrop 
                    objKey='meanVol' 
                    round={2}
                    parms={hestonParameters}
                    options={v0Options}
                    toolTip="Long run average of the variance process"
                    label="Average Vol"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col {...flexObj}>
                <CustomDrop 
                    objKey='adaV' 
                    round={2}
                    parms={hestonParameters}
                    options={adaOptions}
                    toolTip="This is the volatility of the variance process"
                    label="Vol of Vol"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col {...flexObj}>
                <CustomDrop 
                    objKey='v0' 
                    round={2}
                    parms={hestonParameters}
                    options={v0Options}
                    toolTip="This is the current value of the variance process."
                    label="V0"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </Col>
            <Col {...flexObj}>
                <CustomDrop 
                    objKey='rho' 
                    round={2}
                    parms={hestonParameters}
                    options={rhoOptions}
                    toolTip="Correlation between asset and variance"
                    label="Rho"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
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
        <ShowJson parameters={convertHestonToCustom(hestonParameters, customParameters)}/>
    </Form>
)

const mapStateToPropsHeston=state=>({
    hestonParameters:state.hestonParameters,
    customParameters:state.customParameters
})
const mapDispatchToPropsHeston=dispatch=>({
    updateHeston:(key, value, hestonParameters)=>{
        updateHeston(key, value, dispatch)
    },
    submitOptions:(hestonParams, customParams)=>{
        const updatedCustom=convertHestonToCustom(hestonParams, customParams)
        getAllData(updatedCustom, dispatch)
        updateAllCustom(updatedCustom, dispatch)
    }
})
export default connect(
    mapStateToPropsHeston, 
    mapDispatchToPropsHeston
)(HestonForm)