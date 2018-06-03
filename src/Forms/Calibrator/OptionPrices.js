import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'antd'
import {SplineCurves} from '../../Graphs/Graphs.js'
import {CustomDateDrop, CustomUpdateButton} from '../HelperComponents/FormHelper'
import { mapDispatchToProps } from '../reduxInjections'

const OptionPrices=({
    updateOptionForm,
    getOptions,
    generateUpdateParameters,
    model,
    spline,
    optionValues,
    progress
})=>[
<Col xs={24} key={'selectMaturity'}>
    <CustomDateDrop 
        objKey='maturity' 
        parms={optionValues}
        options={optionValues.maturityOptions}
        toolTip="Select the option maturity"
        label="Maturity"
        onChange={updateOptionForm}
    />
</Col>,
<Col xs={24} key={'getPrices'}>
    <CustomUpdateButton
        disabled={!optionValues.maturity}
        onClick={getOptions(optionValues.ticker, optionValues.maturity, model)}
        text="Get Option Prices"
        loading={progress.isGetOptionsInProgress}
    />  
</Col>,
<SplineCurves key='spline' spline={spline} title='Fit' xLabel='Log Strikes' yLabel='Transformed Option Prices'/>

]
const mapStateToProps=({graph, form})=>({...graph, ...form})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionPrices)