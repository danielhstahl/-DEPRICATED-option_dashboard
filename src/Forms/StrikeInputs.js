import React from 'react'
import {createArray, handleForm} from '../utils'
import {updateOptions} from '../Actions/parameters'
import {getFangOostCall, getFangOostPut} from '../Actions/lambda'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import {Form, Button} from 'antd'

const strikeOptions=createArray(1, 100)
const StrikeInputs=({strikeParameters, updateOptions, submitOptions})=>(
<Form onSubmit={handleForm(strikeParameters, submitOptions)}>
    <CustomDrop 
        options={strikeOptions}
        objKey='k'
        parms={strikeParameters}
        label=""
        toolTip="Select any number of strikes to see the price at each strike"
        onChange={updateOptions}
        round={0}
        multiSelect={true}
    />
    <Button className='side-button submit-button' type="primary" htmlType="submit">Update</Button>
</Form>
)
StrikeInputs.propTypes={
    strikeParameters:PropTypes.shape({
        k:PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
    }),
    updateOptions:PropTypes.func.isRequired,
    submitOptions:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    strikeParameters:state.optionParameters
})
const mapDispatchToProps =dispatch=>({
    updateOptions:(key, value)=>updateOptions(key, value, dispatch),
    submitOptions:vals=>{
        getFangOostCall(vals, dispatch)
        getFangOostPut(vals, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StrikeInputs)