import React from 'react'
import { handleForm, validateAll } from '../Utils/utils'
import { connect } from 'react-redux'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { getAllData } from '../Actions/lambda'
import { setBS } from '../Actions/setModel'
import { setModels } from '../Actions/setModel'
import { modelChoices } from '../appSkeleton'
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
import {
    convertBSToCustom
} from './parameterConversion'
const BSForm=({bsParameters, submitOptions, updateBS, formValidation})=>[
    <Row gutter={gutter} key={0}>
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
        <ShowJson parameters={convertBSToCustom(bsParameters)}/>
    </Row>
]
const [, bs]=modelChoices
const mapStateToPropsBS=state=>({bsParameters:state[bs.value], formValidation:state.bsValidation})
const mapDispatchToPropsBS=dispatch=>({
    updateBS:(key, value, validateStatus)=>{
        updateBS(key, value, validateStatus, dispatch)
    },
    submitOptions:vals=>{
        const updatedCustom=convertBSToCustom(vals)
        getAllData(updatedCustom, dispatch)
        
        setModels[bs.value](dispatch)
    }
})
export default connect(
    mapStateToPropsBS,
    mapDispatchToPropsBS
)(BSForm)