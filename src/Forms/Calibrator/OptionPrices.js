import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'antd'
import {SplineCurves} from '../../Graphs/Graphs.js'
import {CustomFormItemDateDrop, CustomUpdateButton, CustomFormItemInput} from '../HelperComponents/FormHelper'
import { mapDispatchToProps } from '../reduxInjections'
import { flexObj } from '../globalOptions'
import {createBounds} from '../helperValidators'
const validatorBidAsk=createBounds(0, 1)
const validatorOpenInterest=createBounds(0, 1000000)
const openInterestKey='minOpenInterest'
const bidAskKey='minRelativeBidAskSpread'
const OptionPrices=({
    updateOptionForm,
    getOptions,
    model,
    spline,
    optionValues,
    optionValuesValidation,
    progress
})=>[
<Col {...flexObj} key='selectMaturity'>
    <CustomFormItemDateDrop 
        objKey='maturity' 
        parms={optionValues}
        options={optionValues.maturityOptions}
        toolTip="Select the option maturity"
        label="Maturity"
        onChange={updateOptionForm}
    />
</Col>,
<Col {...flexObj} key='openInterest'>
    <CustomFormItemInput 
        objKey={openInterestKey} 
        parms={optionValues}
        validationResults={optionValuesValidation[openInterestKey]}
        validator={validatorOpenInterest}
        toolTip="Select the minimum open interest"
        label="Open Interest"
        onChange={updateOptionForm}
    />
</Col>,
<Col {...flexObj} key='bidAsk'>
    <CustomFormItemInput 
        objKey={bidAskKey} 
        validator={validatorBidAsk}
        parms={optionValues}
        validationResults={optionValuesValidation[bidAskKey]}
        options={optionValues.maturityOptions}
        toolTip="Select the minimum relative bid-ask spread"
        label="Bid-Ask Spread"
        onChange={updateOptionForm}
    />
</Col>,
<Col {...flexObj} key='getPrices'>
    <CustomUpdateButton
        disabled={!optionValues.maturity}
        onClick={getOptions({
            ticker:optionValues.ticker, 
            maturity:optionValues.maturity,
            [openInterestKey]:optionValues[openInterestKey],
            [bidAskKey]:optionValues[bidAskKey]}, model)}
        text="Get Option Prices"
        loading={progress.isGetOptionsInProgress}
    />  
</Col>,
<Col offset={4} xs={16} key='spline'>
    <SplineCurves  spline={spline} title='Fit' xLabel='Log Strikes' yLabel='Transformed Option Prices'/>
</Col>

]
const mapStateToProps=({graph, form})=>({...graph, ...form})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionPrices)