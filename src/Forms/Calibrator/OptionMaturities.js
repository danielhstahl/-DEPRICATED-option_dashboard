import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'antd'
import {
    CustomFormItemTextInput, 
    CustomUpdateButton
} from '../HelperComponents/FormHelper'
import {mapStateToProps, mapDispatchToProps} from '../reduxInjections'

const OptionMaturities=({
    updateOptionForm,
    submitMaturities,
    optionValues,
    model,
    progress
})=>[
<Col xs={24} key={'ticker'}>
    <CustomFormItemTextInput 
        objKey='ticker' 
        parms={optionValues}
        toolTip="This is the ticker of the underlying. For example, AAPL"
        label="Ticker"
        onChange={updateOptionForm}
    />
</Col>,
<Col xs={24} key={'submitTicker'}>
    <CustomUpdateButton 
        disabled={optionValues.ticker.length===0}
        onClick={submitMaturities(optionValues.ticker, model)}
        text="Get Maturities"
        loading={progress.isMaturityInProgress}
    />
</Col>
]

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionMaturities)