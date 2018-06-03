import React from 'react'
import { connect } from 'react-redux'
import { Col, Alert } from 'antd'
import { arrayValidator, validateAll } from '../helperValidators'
import actionParameters from '../../Actions/parameters' 
import {getOptions} from '../../Actions/lambda'
import {SplineCurves} from '../../Graphs/Graphs.js'
import {CustomDateDrop, CustomUpdateButton} from '../HelperComponents/FormHelper'
import { mapDispatchToProps } from '../reduxInjections'
import {PARAMETERS, VALIDATION} from '../../Utils/constants'

const { updateCalibration }=actionParameters 
const OptionPrices=({
    updateOptionForm,
    getOptions,
    generateUpdateParameters,
    model,
    spline,
    optionValues,
    progress,
    ...form
})=>[
<Col xs={24} key={'selectMaturity'}>
    <CustomDateDrop 
        objKey='maturity' 
        parms={form[model+PARAMETERS]}
        options={optionValues.maturityOptions}
        toolTip="Select the option maturity"
        label="Maturity"
        onChange={updateOptionForm}
    />
</Col>,
<Col xs={24} key={'getPrices'}>
    <CustomUpdateButton
        disabled={optionValues.prices.length===0}
        onClick={getOptions(optionValues.ticker, optionValues.maturity)}
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