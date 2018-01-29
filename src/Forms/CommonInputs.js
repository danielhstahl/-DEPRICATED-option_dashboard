import React from 'react'
import { CustomFormItemInput } from './FormHelper'
import { Col } from 'antd'
import { flexObj } from './globalOptions'
export default ({parameters, validation, update, formItems})=>formItems.map(({key, validator, label, toolTip}, index)=>(
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
