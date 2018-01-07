import React from 'react'
import {createArray, handleForm} from '../utils'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import {getAllData} from '../Actions/lambda'
import {
    updateCustom
} from '../Actions/parameters'

import {
    rhoOptions,
    speedOptions,
    adaOptions,
    sigmaOptions
} from './globalOptions'

import { Row, Col, Form, Button } from 'antd'

const COptions=createArray(0, 2, .1)
const GMOptions=createArray(.2, 10, .1)
const YOptions=createArray(.2, 1.8, .2)
const v0Options=createArray(.7, 1.3, .05)

const CustomForm=({customParameters, submitOptions, updateCustom})=>(
<Form onSubmit={handleForm(submitOptions, customParameters)}>
    <Row gutter={16}>
        <Col span={12}>
            <CustomDrop 
                objKey='sigma' 
                round={2}
                parms={customParameters}
                options={sigmaOptions}
                toolTip="This is the volatility of the diffusion component of the (extended) CGMY process"
                label="Volatility"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='C' 
                round={1}
                parms={customParameters}
                options={COptions}
                toolTip="This is the C in CGMY"
                label="C"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='G'
                round={1} 
                parms={customParameters}
                options={GMOptions}
                toolTip="This is the G in CGMY"
                label="G"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='M' 
                round={1}
                parms={customParameters}
                options={GMOptions}
                toolTip="This is the M in CGMY"
                label="M"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='Y' 
                round={1}
                parms={customParameters}
                options={YOptions}
                toolTip="This is the Y in CGMY"
                label="Y"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='speed' 
                round={1}
                parms={customParameters}
                options={speedOptions}
                toolTip="Speed of mean reversion of time change"
                label="Speed"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='adaV' 
                round={2}
                parms={customParameters}
                options={adaOptions}
                toolTip="This is the volatility of the time change"
                label="Vol of Vol"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='v0' 
                round={2}
                parms={customParameters}
                options={v0Options}
                toolTip="This is the initial value of the time change process.  The long run mean is one"
                label="V0"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='rho' 
                round={2}
                parms={customParameters}
                options={rhoOptions}
                toolTip="Correlation between diffusion and time change"
                label="Rho"
                onChange={updateCustom}
            />
        </Col>
        <Col span={12}>
            <Button className='side-button submit-button' type="primary" htmlType="submit">Update</Button>
        </Col>
    </Row>
</Form>
)
const mapStateToPropsCustom=state=>({
    customParameters:state.customParameters
})
const mapDispatchToPropsCustom =dispatch=>({
    updateCustom:(key, value)=>updateCustom(key, value, dispatch),
    submitOptions:vals=>getAllData(vals, dispatch)
})

export default connect(
    mapStateToPropsCustom, mapDispatchToPropsCustom
)(CustomForm)

