import React from 'react'
import { createArray } from '../Utils/utils'
import {getCalculationParameters} from '../Utils/conversionUtils'
import { CustomNumberDrop } from './HelperComponents/FormHelper'
import {mapStateToProps, mapDispatchToProps} from './reduxInjections'
import { connect } from 'react-redux'
import { Button, Row, Col} from 'antd'
import {    
    gutter
} from './globalOptions'

const quantileOptions=createArray(.001, .05, .001)

const QuantileInputs=({model, updateQuantile, submitDensity, ...form})=>(
    <Row gutter={gutter}>
        <Col xs={24} md={16}>
            <CustomNumberDrop 
                objKey='quantile' 
                parms={form}
                options={quantileOptions}
                round={3}
                toolTip="This is the quantile of the asset return distribution.  A .01 quantile translates to a 99% VaR"
                label="Quantile"
                onChange={updateQuantile}
            />
        </Col>
        <Col xs={24} md={8}>
            <Button 
                className='side-button submit-button' type="primary" 
                onClick={submitDensity(getCalculationParameters(form, model), model)}
            >Update</Button>
        </Col>
    </Row>
)



export default connect(mapStateToProps, mapDispatchToProps)(QuantileInputs)