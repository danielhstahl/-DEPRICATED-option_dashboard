import React from 'react'
import { handleForm, validateAll, createBounds } from '../Utils/utils'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getAllData, getCalibration } from '../Actions/lambda'
import { connect } from 'react-redux'
import InputCalibrator, {switchComponent} from './InputCalibrator'
import { updateHeston } from '../Actions/parameters'
import { Row, Col } from 'antd'
import ShowJson from './ShowJson'
import {
    rhoBounds, 
    speedBounds,
    flexObj,
    gutter
} from './globalOptions'
import CommonInputs from './CommonInputs'

import {
    convertHestonToCustom,
    convertCustomToHeston
} from './parameterConversion'

const adaBounds=createBounds(0, 2)
const meanBounds=createBounds(.001, 1)
const v0Bounds=meanBounds


const Manual=({formValidation, hestonParameters, updateHeston, submitOptions})=>[
<Col {...flexObj} key={0}>
    <CustomFormItemInput
        label='Speed'
        objKey='speed' 
        parms={hestonParameters}
        validator={speedBounds}
        validationResults={formValidation}
        toolTip="Speed of mean reversion of variance process"
        onChange={updateHeston}
    />
</Col>,
<Col {...flexObj} key={1}>
    <CustomFormItemInput 
        objKey='meanVol' 
        label="Average Vol"
        validator={meanBounds}
        validationResults={formValidation}
        parms={hestonParameters}
        toolTip="Long run average of the variance process"
        onChange={updateHeston}
    />
</Col>,
<Col {...flexObj} key={2}>
    <CustomFormItemInput 
        objKey='adaV' 
        validator={adaBounds}
        validationResults={formValidation}
        label="Vol of Vol"
        parms={hestonParameters}
        toolTip="This is the volatility of the variance process"
        onChange={updateHeston}
    />
</Col>,
<Col {...flexObj} key={3}>
    <CustomFormItemInput 
        objKey='v0' 
        label='V0'
        parms={hestonParameters}
        validationResults={formValidation}
        validator={v0Bounds}
        toolTip="This is the current value of the variance process."
        onChange={updateHeston}
    />
</Col>,
<Col {...flexObj} key={4}>
    <CustomFormItemInput 
        objKey='rho'
        label='Rho'
        validator={rhoBounds}
        validationResults={formValidation}
        parms={hestonParameters}
        toolTip="Correlation between asset and variance"
        onChange={updateHeston}
    />
</Col>,
<Col {...flexObj} key={5}>
    <CustomUpdateButton
        disabled={validateAll(formValidation)}
        onClick={handleForm(
            submitOptions, hestonParameters
        )}
    />
</Col>
]

const HestonForm=({
    hestonParameters, submitOptions, type,
    updateHeston, formValidation, submitCalibration,
    hestonNotify
})=>[
    <Row gutter={gutter} key={0}>
        <CommonInputs parameters={hestonParameters} validation={formValidation} update={updateHeston} />
        {switchComponent(type==='manual', 
        <Manual 
            formValidation={formValidation} 
            hestonParameters={hestonParameters} 
            updateHeston={updateHeston} 
            submitOptions={submitOptions}
        />, 
        <InputCalibrator 
            parameters={hestonParameters} 
            validation={formValidation}
            submitOptions={submitCalibration}
            isInProgress={hestonNotify}
            onChange={updateHeston}
        />)}
    </Row>,
    <Row key={1}>
        <ShowJson parameters={convertHestonToCustom(hestonParameters)}/>
    </Row>
]

const hestonCalibration=getCalibration('heston', convertCustomToHeston)

const mapStateToPropsHeston=({hestonParameters, hestonValidation, hestonNotify})=>({hestonParameters, formValidation:hestonValidation, hestonNotify})

const mapDispatchToPropsHeston=dispatch=>({
    updateHeston:(key, value, validateStatus)=>{
        updateHeston(key, value, validateStatus, dispatch)
    },
    submitCalibration:parameters=>{
        hestonCalibration(parameters, dispatch)
    },
    submitOptions:(hestonParameters)=>{
        const updatedCustom=convertHestonToCustom(hestonParameters)
        getAllData(updatedCustom, dispatch)
    }
})
export default connect(
    mapStateToPropsHeston, 
    mapDispatchToPropsHeston
)(HestonForm)