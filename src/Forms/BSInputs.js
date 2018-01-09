import React from 'react'
import { handleForm } from '../Utils/utils'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import { getAllData } from '../Actions/lambda'
import {
    sigmaOptions,
    flexObj,
    gutter,
    formItemLayoutLabel,
    fullWidth
} from './globalOptions'
import { Row, Col, Form, Button } from 'antd'
import {
    updateCustom,
    updateAllCustom
} from '../Actions/parameters'
import ShowJson from './ShowJson'
import {
    convertBSToCustom
} from './parameterConversion'

const FormItem=Form.Item

const BSForm=({customParameters, submitOptions, updateCustom})=>[
    <Row gutter={gutter} key={0}>
        <Col {...flexObj}>
            <FormItem {...formItemLayoutLabel} label="Volatility">
                <CustomDrop 
                    objKey='sigma' 
                    round={2}
                    parms={customParameters}
                    options={sigmaOptions}
                    toolTip="Volatility of diffusion"
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
        <ShowJson parameters={convertBSToCustom(customParameters)}/>
    </Row>
]

const mapStateToPropsBS=({customParameters})=>({customParameters})
const mapDispatchToPropsBS=dispatch=>({
    updateCustom:(key, value)=>{
        updateCustom(key, value, dispatch)
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