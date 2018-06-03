import React from 'react'
import { connect } from 'react-redux'
import {getMaturities} from '../../Actions/lambda' 
import { Col, Alert } from 'antd'
import { arrayValidator, validateAll } from '../helperValidators'
import actionParameters from '../../Actions/parameters' 
import {CustomFormItemInput, CustomUpdateButton} from '../HelperComponents/FormHelper'
import {mapStateToProps, mapDispatchToProps} from '../reduxInjections'
const { updateCalibration }=actionParameters 

const OptionMaturities=({
    updateOptionForm,
    submitMaturities,
    optionValues,
    progress
})=>[
<Col xs={24} key={'ticker'}>
    <CustomFormItemInput 
        objKey='ticker' 
        parms={optionValues}
        toolTip="This is the ticker of the underlying. For example, AAPL"
        label="Ticker"
        onChange={updateOptionForm}
    />
</Col>,
<Col xs={24} key={'submitTicker'}>
    <CustomUpdateButton 
        onClick={submitMaturities(optionValues.ticker)}
        text="Get Maturities"
        loading={progress.isMaturityInProgress}
    />
</Col>
]

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionMaturities)