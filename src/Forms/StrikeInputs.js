import React from 'react'
import { createArray, handleForm } from '../Utils/utils'
import { updateCustom } from '../Actions/parameters'
import { getFangOostCall, getFangOostPut } from '../Actions/lambda'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import { Form, Button, Row, Col } from 'antd'
import {
    flexObj,
    gutter
} from './globalOptions'
const FormItem=Form.Item

const strikeOptions=createArray(1, 100)
const StrikeInputs=({strikeParameters, updateOptions, submitOptions})=>(
<Row gutter={gutter}>
    <Col {...flexObj}>
        <CustomDrop 
            options={strikeOptions}
            objKey='k'
            parms={strikeParameters}
            label="Strikes"
            toolTip="Select any number of strikes to see the price at each strike"
            onChange={updateOptions}
            round={0}
            multiSelect={true}
        />
    </Col>
    <Col {...flexObj}>
        <FormItem>
            <Button className='side-button submit-button' type="primary" onClick={handleForm(submitOptions, strikeParameters)}>Update</Button>
        </FormItem>
    </Col>
</Row>
)
StrikeInputs.propTypes={
    strikeParameters:PropTypes.shape({
        k:PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
    }),
    updateOptions:PropTypes.func.isRequired,
    submitOptions:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    strikeParameters:state.customParameters
})
const mapDispatchToProps =dispatch=>({
    updateOptions:(key, value)=>updateCustom(key, value, dispatch),
    submitOptions:vals=>{
        getFangOostCall(vals, dispatch)
        getFangOostPut(vals, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StrikeInputs)