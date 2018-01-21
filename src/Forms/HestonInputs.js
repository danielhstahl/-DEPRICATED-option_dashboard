import React from 'react'
import { handleForm, validateAll, createBounds } from '../Utils/utils'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getAllData } from '../Actions/lambda'
import { connect } from 'react-redux'
import { updateAllCustom, updateHeston } from '../Actions/parameters'
import { Row, Col } from 'antd'
import ShowJson from './ShowJson'
import {
    rhoBounds, 
    speedBounds,
    flexObj,
    gutter
} from './globalOptions'

import {
    convertHestonToCustom
} from './parameterConversion'

const adaBounds=createBounds(0, 2)
const meanBounds=createBounds(.001, 1)
const v0Bounds=meanBounds

const HestonForm=({
    optionParameters, hestonParameters,
    submitOptions, updateHeston, formValidation
})=>{
    //const hestonParameters=convertCustomToHeston(optionParameters)
    return [
        <Row gutter={gutter} key={0}>
            <Col {...flexObj}>
                <CustomFormItemInput
                    label='Speed'
                    objKey='speed' 
                    parms={hestonParameters}
                    validator={speedBounds}
                    validationResults={formValidation}
                    toolTip="Speed of mean reversion of variance process"
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    objKey='meanVol' 
                    label="Average Vol"
                    validator={meanBounds}
                    validationResults={formValidation}
                    parms={hestonParameters}
                    toolTip="Long run average of the variance process"
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    objKey='adaV' 
                    validator={adaBounds}
                    validationResults={formValidation}
                    label="Vol of Vol"
                    parms={hestonParameters}
                    toolTip="This is the volatility of the variance process"
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    objKey='v0' 
                    label='V0'
                    parms={hestonParameters}
                    validationResults={formValidation}
                    validator={v0Bounds}
                    toolTip="This is the current value of the variance process."
                    onChange={updateHeston}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    objKey='rho'
                    label='Rho'
                    validator={rhoBounds}
                    validationResults={formValidation}
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

const mapStateToPropsHeston=({optionParameters, hestonValidation, hestonParameters})=>({optionParameters, formValidation:hestonValidation, hestonParameters})
const mapDispatchToPropsHeston=dispatch=>({
    updateHeston:(key, value, validateStatus)=>{
        updateHeston(key, value, validateStatus, dispatch)
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