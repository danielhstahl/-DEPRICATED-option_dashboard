import React from 'react'
import { CustomFormItemInput } from './FormHelper'
import { Col } from 'antd'
import { uBounds, rBounds, tBounds, sBounds, flexObj } from './globalOptions'
export default ({parameters, validation, update})=>[
    <Col {...flexObj} key={0}>
        <CustomFormItemInput 
            label="Discrete Steps" 
            objKey='numU' 
            parms={parameters}
            validationResults={validation}
            validator={uBounds}
            toolTip="This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take."
            onChange={update}
        />
    </Col>,
    <Col {...flexObj} key={1}>
        <CustomFormItemInput 
            label='Rate'
            objKey='r' 
            parms={parameters}
            validationResults={validation}
            validator={rBounds}
            toolTip="Risk free interest rate"
            onChange={update}
        />
    </Col>,
    <Col {...flexObj} key={2}>
        <CustomFormItemInput
            label='T'
            objKey='T' 
            parms={parameters}
            validationResults={validation}
            validator={tBounds}
            toolTip="Time till maturity"
            onChange={update}
            />            
    </Col>,
    <Col {...flexObj} key={3}>
        <CustomFormItemInput 
            label='S or K'
            objKey='S0' 
            parms={parameters}
            validationResults={validation}
            validator={sBounds}
            toolTip="For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike"
            onChange={update}
        />
    </Col>
]