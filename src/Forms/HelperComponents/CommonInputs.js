import React from 'react'
import { connect } from 'react-redux'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import {PARAMETERS, VALIDATION} from '../../Utils/constants'
import {getCalculationParameters} from '../../Utils/conversionUtils'
import { Col } from 'antd'
import PropTypes from 'prop-types'
import { flexObj } from '../globalOptions'
import {validateAll, getFormItems} from '../helperValidators'
import { mapStateToProps, mapDispatchToProps } from '../reduxInjections'

const CommonInputsD=({model, modelParameters, generateUpdateParameters, range, ...form})=>getFormItems(model, modelParameters, range.defaultRange).map(({key, validator, label, toolTip}, index)=>(
    <Col {...flexObj} key={index}>
        <CustomFormItemInput 
            label={label}
            objKey={key}
            parms={form[model.name+PARAMETERS]}
            validationResults={form[model.name+VALIDATION][key]}
            validator={validator}
            toolTip={toolTip}
            onChange={generateUpdateParameters(model)}
        />
    </Col>
))
CommonInputsD.propTypes={
    formItems:PropTypes.arrayOf(PropTypes.shape({
        key:PropTypes.string.isRequired,
        validator:PropTypes.shape({
            fn:PropTypes.func.isRequired,
            help:PropTypes.string.isRequired
        }),
        label:PropTypes.string.isRequired,
        toolTip:PropTypes.string.isRequired
    }))
}
export const CommonInputs=connect(mapStateToProps, mapDispatchToProps)(CommonInputsD)

const CommonCalculatorButtonD=({submitCalculator, model,  ...form})=>(
    <Col {...flexObj} >
        <CustomUpdateButton
            disabled={validateAll(form[model.name+VALIDATION])}
            onClick={submitCalculator(getCalculationParameters(form, model), model)}
            text='Calculate'
            loading={form.progress.isCalculationInProgress}
        />
    </Col>
)
export const CommonCalculatorButton=connect(mapStateToProps, mapDispatchToProps)(CommonCalculatorButtonD)

const CommonCalibratorButtonD=({submitCalibrator, model, progress, optionValues, range, ...form})=>(
    <Col {...flexObj} >
        <CustomUpdateButton
            disabled={optionValues.prices.length===0}
            onClick={submitCalibrator(form[model.name+PARAMETERS], optionValues, model, range.currentRange)}
            text='Calibrate'
            loading={progress.isCalibationInProgress}
        />
    </Col>
)
export const CommonCalibratorButton=connect(mapStateToProps, mapDispatchToProps)(CommonCalibratorButtonD)
