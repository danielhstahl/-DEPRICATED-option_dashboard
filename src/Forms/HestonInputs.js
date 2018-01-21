import React from 'react'
import { handleForm, validateAll } from '../Utils/utils'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getAllData } from '../Actions/lambda'
import { connect } from 'react-redux'
import { updateCustom, updateAllCustom, updateValidation } from '../Actions/parameters'
import { Row, Col, Button } from 'antd'
import ShowJson from './ShowJson'
import {
    rhoBounds, meanBounds, 
    speedBounds,
    adaBounds,
    v0Bounds,
    flexObj,
    gutter,
    formItemLayoutLabel,
    fullWidth
} from './globalOptions'

import {
    convertHestonToCustom,
    convertCustomToHeston
} from './parameterConversion'

const HestonForm=({
    optionParameters, 
    submitOptions, updateHeston, formValidation
})=>{
    const hestonParameters=convertCustomToHeston(optionParameters)
    return [
        <Row gutter={gutter} key={0}>
            <Col {...flexObj}>
                <CustomFormItemInput
                    label='Speed'
                    objKey='speed' 
                    parms={hestonParameters}
                    validator={speedBounds}
                    toolTip="Speed of mean reversion of variance process"
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    objKey='meanVol' 
                    label="Average Vol"
                    validator={meanBounds}
                    parms={hestonParameters}
                    toolTip="Long run average of the variance process"
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    objKey='adaV' 
                    validator={adaBounds}
                    label="Vol of Vol"
                    parms={hestonParameters}
                    toolTip="This is the volatility of the variance process"
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    objKey='v0' 
                    label="V0"
                    parms={hestonParameters}
                    validator={v0Bounds}
                    toolTip="This is the current value of the variance process."
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    objKey='rho'
                    label="Rho" 
                    validator={rhoBounds}
                    parms={hestonParameters}
                    toolTip="Correlation between asset and variance"
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj} >
                <CustomUpdateButton
                    disabled={validateAll(formValidation)}
                    onClick={handleForm(
                        submitOptions, hestonParameters, optionParameters
                    )}
                />
            </Col>
            
        </Row>,
        <Row key={1}>
            <ShowJson parameters={convertHestonToCustom(hestonParameters, optionParameters)}/>
        </Row>
    ]
}

const mapStateToPropsHeston=({optionParameters, formValidation})=>({optionParameters, formValidation})
const mapDispatchToPropsHeston=dispatch=>({
    updateHeston:(key, value, validateStatus, hestonParameters)=>{
        const customValue=convertHestonToCustom(hestonParameters, optionParameters)[key]
        updateCustom(key, customValue||value, validateStatus, dispatch)
        updateValidation(key, validateStatus, dispatch)
    },
    submitOptions:(hestonParameters, optionParameters)=>{
        const updatedCustom=convertHestonToCustom(hestonParameters, optionParameters)
        getAllData(updatedCustom, dispatch)
        updateAllCustom(updatedCustom, dispatch)
    }
})
export default connect(
    mapStateToPropsHeston, 
    mapDispatchToPropsHeston
)(HestonForm)