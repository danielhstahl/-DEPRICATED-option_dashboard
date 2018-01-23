import React from 'react'
import { validateAll, handleForm, createBounds } from '../Utils/utils'
import { connect } from 'react-redux'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getAllData } from '../Actions/lambda'
import { updateCustom } from '../Actions/parameters'
import { setModels } from '../Actions/setModel'
import { modelChoices } from '../appSkeleton'
import ShowJson from './ShowJson'
import {
    rhoBounds,
    speedBounds,
    sigmaBounds,
    cBounds,
    gBounds,
    mBounds,
    yBounds,
    flexObj,
    gutter
} from './globalOptions'

import { Row, Col } from 'antd'

const adaBounds=createBounds(0, 2)
const meanBounds=createBounds(.2, 1.8)
const v0Bounds=meanBounds

const CustomForm=({optionParameters, submitOptions, updateCustom, formValidation})=>[
    <Row gutter={gutter} key={0}>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='sigma' 
                label="Volatility"
                parms={optionParameters}
                validator={sigmaBounds}
                validationResults={formValidation}
                toolTip="This is the volatility of the diffusion component of the (extended) CGMY process"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='C' 
                label='C'
                parms={optionParameters}
                validationResults={formValidation}
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
                validationResults={formValidation}
                toolTip="This is the G in CGMY"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='M' 
                label='M'
                parms={optionParameters}
                validationResults={formValidation}
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
                validationResults={formValidation}
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
                validationResults={formValidation}
                toolTip="Speed of mean reversion of time change"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='adaV' 
                validator={adaBounds}
                label="Vol of Vol"
                validationResults={formValidation}
                parms={optionParameters}
                toolTip="This is the volatility of the variance process"
                onChange={updateCustom}
            />
        </Col>
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='v0' 
                validationResults={formValidation}
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
                validationResults={formValidation}
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

const mapStateToPropsCustom=({optionParameters, optionValidation})=>({optionParameters, formValidation:optionValidation})

const mapDispatchToPropsCustom =dispatch=>({
    updateCustom:(key, value, validateStatus)=>{
        updateCustom(key, value, validateStatus, dispatch)
    },
    submitOptions:parameters=>{
        getAllData(parameters, dispatch)
    }
})

export default connect(
    mapStateToPropsCustom, mapDispatchToPropsCustom
)(CustomForm)

