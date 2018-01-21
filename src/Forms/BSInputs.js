import React from 'react'
import { handleForm } from '../Utils/utils'
import { connect } from 'react-redux'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getAllData } from '../Actions/lambda'
import {
    sigmaBounds,
    flexObj,
    gutter,
    formItemLayoutLabel,
    fullWidth
} from './globalOptions'
import { Row, Col, Button } from 'antd'
import {
    updateCustom,
    updateAllCustom,
    updateValidation
} from '../Actions/parameters'
import ShowJson from './ShowJson'
import {
    convertBSToCustom
} from './parameterConversion'

const BSForm=({optionParameters, submitOptions, updateCustom, formValidation})=>[
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
            <CustomUpdateButton
                disabled={validateAll(formValidation)}
                onClick={handleForm(submitOptions, optionParameters)}
            />
        </Col>
    </Row>,
    <Row key={1}>
        <ShowJson parameters={convertBSToCustom(customParameters)}/>
    </Row>
]

const mapStateToPropsBS=({optionParameters, formValidation})=>({customParameters, formValidation})
const mapDispatchToPropsBS=dispatch=>({
    updateCustom:(key, value, validateStatus)=>{
        updateCustom(key, value, dispatch)
        updateValidation(key, validateStatus, dispatch)
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