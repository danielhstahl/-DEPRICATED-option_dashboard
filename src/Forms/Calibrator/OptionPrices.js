import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'antd'
import {SplineCurves} from '../../Graphs/Graphs.js'
import {CustomFormItemDateDrop, CustomUpdateButton} from '../HelperComponents/FormHelper'
import { mapDispatchToProps } from '../reduxInjections'
import { flexObj } from '../globalOptions'

const OptionPrices=({
    updateOptionForm,
    getOptions,
    generateUpdateParameters,
    model,
    spline,
    optionValues,
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
<Col {...flexObj} key='getPrices'>
    <CustomUpdateButton
        disabled={!optionValues.maturity}
        onClick={getOptions(optionValues.ticker, optionValues.maturity, model)}
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