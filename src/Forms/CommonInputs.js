import React from 'react'
import { CustomFormItemInput, CustomUpdateButton } from './FormHelper'
import { Col } from 'antd'
import PropTypes from 'prop-types'
import { flexObj } from './globalOptions'
export const CommonInputs=({parameters, validation, update, formItems})=>formItems.map(({key, validator, label, toolTip}, index)=>(
    <Col {...flexObj} key={index}>
        <CustomFormItemInput 
            label={label}
            objKey={key}
            parms={parameters}
            validationResults={validation}
            validator={validator}
            toolTip={toolTip}
            onChange={update}
        />
    </Col>
))
CommonInputs.propTypes={
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

export const CommonUpdateButton=({submitOptions, validateAll, validation, calibrateParameters, parameters})=>(
    <Col {...flexObj} >
        <CustomUpdateButton
            disabled={validateAll(validation)}
            onClick={submitOptions({...parameters, ...calibrateParameters})}
        />
    </Col>
)
