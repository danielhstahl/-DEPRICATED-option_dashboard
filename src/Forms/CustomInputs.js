import React from 'react'
import { validateAll, handleForm } from '../Utils/utils'
import { connect } from 'react-redux'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getAllData } from '../Actions/lambda'
import { updateCustom, updateValidation } from '../Actions/parameters'

import ShowJson from './ShowJson'
import {
    rhoBounds,
    speedBounds,
    adaBounds,
    sigmaBounds,
    meanBounds, 
    v0Bounds,
    cBounds,
    gBounds,
    mBounds,
    yBounds,
    flexObj,
    gutter,
    formItemLayoutLabel,
    fullWidth
} from './globalOptions'

import { Row, Col, Form, Button } from 'antd'

const FormItem=Form.Item



const CustomForm=({optionParameters, submitOptions, updateCustom, formValidation})=>[
    <Row gutter={gutter} key={0}>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='sigma' 
                label="Volatility"
                parms={optionParameters}
                validator={sigmaBounds}
                toolTip="This is the volatility of the diffusion component of the (extended) CGMY process"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='C' 
                label='C'
                parms={optionParameters}
                validator={cBounds}
                toolTip="This is the C in CGMY"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='G'
                label='G'
                parms={optionParameters}
                validator={gBounds}
                toolTip="This is the G in CGMY"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='M' 
                label='M'
                parms={optionParameters}
                validator={mBounds}
                toolTip="This is the M in CGMY"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='Y' 
                label='Y'
                parms={optionParameters}
                validator={yBounds}
                toolTip="This is the Y in CGMY"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='speed' 
                label='Speed'
                parms={optionParameters}
                validator={speedBounds}
                toolTip="Speed of mean reversion of time change"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='adaV' 
                validator={adaBounds}
                label="Vol of Vol"
                parms={optionParameters}
                toolTip="This is the volatility of the variance process"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='v0' 
                label="V0"
                parms={optionParameters}
                validator={v0Bounds}
                toolTip="This is the current value of the variance process."
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='rho'
                label="Rho" 
                validator={rhoBounds}
                parms={optionParameters}
                toolTip="Correlation between asset and variance"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomUpdateButton
                disabled={validateAll(formValidation)}
                onClick={handleForm(submitOptions, optionParameters)}
            />
        </Col>
    </Row>,
    <Row key={1}>
        <ShowJson parameters={optionParameters}/>
    </Row>
]
const mapStateToPropsCustom=({optionParameters, formValidation})=>({optionParameters, formValidation})
const mapDispatchToPropsCustom =dispatch=>({
    updateCustom:(key, value, validateStatus)=>{
        updateCustom(key, value, validateStatus, dispatch)
        updateValidation(key, validateStatus, dispatch)
    },
    submitOptions:vals=>getAllData(vals, dispatch)
})

export default connect(
    mapStateToPropsCustom, mapDispatchToPropsCustom
)(CustomForm)

