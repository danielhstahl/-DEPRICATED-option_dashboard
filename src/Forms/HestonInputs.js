import React from 'react'
import { createArray, handleForm } from '../Utils/utils'
import CustomDrop from './FormHelper'
import { getAllData } from '../Actions/lambda'
import { connect } from 'react-redux'
import { updateHeston, updateAllCustom } from '../Actions/parameters'
import { Row, Col, Form, Button } from 'antd'
import ShowJson from './ShowJson'
import {
    rhoOptions,
    speedOptions,
    adaOptions,
    flexObj,
    gutter,
    formItemLayoutLabel,
    fullWidth
} from './globalOptions'

import {
    convertHestonToCustom
} from './parameterConversion'

const FormItem=Form.Item
const v0Options=createArray(.01, .25, .01)
const HestonForm=({
    customParameters, hestonParameters, 
    submitOptions, updateHeston
})=>[
    <Row gutter={gutter} key={0}>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Speed">
                <CustomDrop 
                    objKey='speed' 
                    round={1}
                    parms={hestonParameters}
                    options={speedOptions}
                    toolTip="Speed of mean reversion of variance process"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Average Vol">
                <CustomDrop 
                    objKey='meanVol' 
                    round={2}
                    parms={hestonParameters}
                    options={v0Options}
                    toolTip="Long run average of the variance process"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Vol of Vol">
                <CustomDrop 
                    objKey='adaV' 
                    round={2}
                    parms={hestonParameters}
                    options={adaOptions}
                    toolTip="This is the volatility of the variance process"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="V0">
                <CustomDrop 
                    objKey='v0' 
                    round={2}
                    parms={hestonParameters}
                    options={v0Options}
                    toolTip="This is the current value of the variance process."
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </FormItem>
        </Col>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Rho">
                <CustomDrop 
                    objKey='rho' 
                    round={2}
                    parms={hestonParameters}
                    options={rhoOptions}
                    toolTip="Correlation between asset and variance"
                    onChange={(key, value)=>updateHeston(key, value, hestonParameters)}
                />
            </FormItem>
        </Col>
        <Col {...flexObj} >
            <FormItem {...formItemLayoutLabel} colon={false} label=" ">
                <Button 
                    style={fullWidth}
                    className='side-button submit-button' 
                    type="primary" 
                    onClick={handleForm(
                        submitOptions, hestonParameters, customParameters
                    )}
                >Update</Button>
            </FormItem>
        </Col>
        
    </Row>,
    <Row key={1}>
        <ShowJson parameters={convertHestonToCustom(hestonParameters, customParameters)}/>
    </Row>
]

const mapStateToPropsHeston=({hestonParameters, customParameters})=>({
    hestonParameters,
    customParameters
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