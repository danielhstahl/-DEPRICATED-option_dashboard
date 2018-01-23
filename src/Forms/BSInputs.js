import React from 'react'
import { handleForm, validateAll } from '../Utils/utils'
import { connect } from 'react-redux'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getAllData } from '../Actions/lambda'
import {
    sigmaBounds,
    flexObj,
    gutter
} from './globalOptions'
import { Row, Col } from 'antd'
import {
    updateBS
} from '../Actions/parameters'
import ShowJson from './ShowJson'
import CommonInputs from './CommonInputs'
const BSForm=({bsParameters, submitOptions, updateBS, formValidation, type})=>[
    <Row gutter={gutter} key={0}>
        <CommonInputs parameters={bsParameters} validation={formValidation} update={updateBS} />
        <Col {...flexObj}>
            <CustomFormItemInput 
                objKey='sigma' 
                validationResults={formValidation}
                label="Volatility"
                parms={bsParameters}
                validator={sigmaBounds}
                toolTip="This is the volatility of the diffusion component of the (extended) CGMY process"
                onChange={updateBS}
            />
        </Col>
        <Col {...flexObj}>
            <CustomUpdateButton
                disabled={validateAll(formValidation)}
                onClick={handleForm(submitOptions, bsParameters)}
            />
        </Col>
    </Row>,
    <Row key={1}>
        <ShowJson parameters={bsParameters}/>
    </Row>
]
const mapStateToPropsBS=({bsParameters, bsValidation})=>({bsParameters, formValidation:bsValidation})
const mapDispatchToPropsBS=dispatch=>({
    updateBS:(key, value, validateStatus)=>{
        updateBS(key, value, validateStatus, dispatch)
    },
    submitOptions:parameters=>{
        getAllData(parameters, dispatch)
    }
})
export default connect(
    mapStateToPropsBS,
    mapDispatchToPropsBS
)(BSForm)