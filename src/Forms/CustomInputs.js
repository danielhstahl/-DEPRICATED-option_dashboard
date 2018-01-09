import React from 'react'
import { createArray, handleForm } from '../Utils/utils'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import { getAllData } from '../Actions/lambda'
import { updateCustom } from '../Actions/parameters'

import ShowJson from './ShowJson'
import {
    rhoOptions,
    speedOptions,
    adaOptions,
    sigmaOptions,
    flexObj,
    gutter,
    formItemLayoutLabel,
    fullWidth
} from './globalOptions'

import { Row, Col, Form, Button } from 'antd'

const FormItem=Form.Item

const COptions=createArray(0, 2, .1)
const GMOptions=createArray(.2, 10, .1)
const YOptions=createArray(.2, 1.8, .2)
const v0Options=createArray(.7, 1.3, .05)

const CustomForm=({customParameters, submitOptions, updateCustom})=>[
    <Row gutter={gutter} key={0}>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Volatility">
                <CustomDrop 
                    objKey='sigma' 
                    round={2}
                    parms={customParameters}
                    options={sigmaOptions}
                    toolTip="This is the volatility of the diffusion component of the (extended) CGMY process"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="C">
                <CustomDrop 
                    objKey='C' 
                    round={1}
                    parms={customParameters}
                    options={COptions}
                    toolTip="This is the C in CGMY"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="G">
                <CustomDrop 
                    objKey='G'
                    round={1} 
                    parms={customParameters}
                    options={GMOptions}
                    toolTip="This is the G in CGMY"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="M">
                <CustomDrop 
                    objKey='M' 
                    round={1}
                    parms={customParameters}
                    options={GMOptions}
                    toolTip="This is the M in CGMY"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Y">
                <CustomDrop 
                    objKey='Y' 
                    round={1}
                    parms={customParameters}
                    options={YOptions}
                    toolTip="This is the Y in CGMY"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Speed">
                <CustomDrop 
                    objKey='speed' 
                    round={1}
                    parms={customParameters}
                    options={speedOptions}
                    toolTip="Speed of mean reversion of time change"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Vol of Vol">
                <CustomDrop 
                    objKey='adaV' 
                    round={2}
                    parms={customParameters}
                    options={adaOptions}
                    toolTip="This is the volatility of the time change"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="V0">
                <CustomDrop 
                    objKey='v0' 
                    round={2}
                    parms={customParameters}
                    options={v0Options}
                    toolTip="This is the initial value of the time change process.  The long run mean is one"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Rho">
                <CustomDrop 
                    objKey='rho' 
                    round={2}
                    parms={customParameters}
                    options={rhoOptions}
                    toolTip="Correlation between diffusion and time change"
                    onChange={updateCustom}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} colon={false} label=" ">
                <Button 
                    style={fullWidth}
                    className='side-button submit-button' 
                    type="primary" 
                    onClick={handleForm(submitOptions, customParameters)}
                >Update</Button>
            </FormItem>
        </Col>
    </Row>,
    <Row key={1}>
        <ShowJson parameters={customParameters}/>
    </Row>
]
const mapStateToPropsCustom=({customParameters})=>({customParameters})
const mapDispatchToPropsCustom =dispatch=>({
    updateCustom:(key, value)=>updateCustom(key, value, dispatch),
    submitOptions:vals=>getAllData(vals, dispatch)
})

export default connect(
    mapStateToPropsCustom, mapDispatchToPropsCustom
)(CustomForm)

