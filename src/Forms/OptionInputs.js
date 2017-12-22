import React from 'react'
import {createArray, handleForm} from '../utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import {getAllData} from '../Actions/lambda'
import {updateOptions} from '../Actions/parameters'
import { Row, Col, Form, Button} from 'antd'
const uOptions=createArray(5, 10)
const rOptions=createArray(.001, .1, .001)
const tOptions=createArray(.25, 5, .25)
const sOptions=createArray(1, 100)
const sigmaOptions=createArray(.05, .8, .05)
const CGMOptions=createArray(.2, 10, .1)
const YOptions=createArray(.2, 1.8, .2)
const speedOptions=createArray(.1, 1, .1)
const v0Options=createArray(.7, 1.3, .05)
const adaOptions=createArray(.05, .8, .05)
const rhoOptions=createArray(-.95, .95, .05)

const OptionInputs=({optionParameters, updateOptions, submitOptions})=>(
<Form onSubmit={handleForm(optionParameters, submitOptions)}>
    <Row gutter={16}>
        <Col span={24}>
            <CustomDrop 
                objKey='numU' 
                parms={optionParameters}
                options={uOptions}
                round={0}
                toolTip="This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take."
                label="Discrete Steps"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='r' 
                parms={optionParameters}
                round={3}
                options={rOptions}
                toolTip="Risk free interest rate"
                label="Rate"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='T' 
                round={2}
                parms={optionParameters}
                options={tOptions}
                label="T"
                toolTip="Time till maturity"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='S0' 
                round={0}
                parms={optionParameters}
                options={sOptions}
                toolTip="For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike"
                label="S or K"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='sigma' 
                round={2}
                parms={optionParameters}
                options={sigmaOptions}
                toolTip="This is the volatility of the diffusion component of the (extended) CGMY process"
                label="Volatility"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='C' 
                round={1}
                parms={optionParameters}
                options={CGMOptions}
                toolTip="This is the C in CGMY"
                label="C"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='G'
                round={1} 
                parms={optionParameters}
                options={CGMOptions}
                toolTip="This is the G in CGMY"
                label="G"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='M' 
                round={1}
                parms={optionParameters}
                options={CGMOptions}
                toolTip="This is the M in CGMY"
                label="M"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='Y' 
                round={1}
                parms={optionParameters}
                options={YOptions}
                toolTip="This is the Y in CGMY"
                label="Y"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='speed' 
                round={1}
                parms={optionParameters}
                options={speedOptions}
                toolTip="Speed of mean reversion of time change"
                label="Speed"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='adaV' 
                round={2}
                parms={optionParameters}
                options={adaOptions}
                toolTip="This is the volatility of the time change"
                label="Vol of Vol"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='v0' 
                round={2}
                parms={optionParameters}
                options={v0Options}
                toolTip="This is the initial value of the time change process.  The long run mean is one"
                label="V0"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <CustomDrop 
                objKey='rho' 
                round={2}
                parms={optionParameters}
                options={rhoOptions}
                toolTip="Correlation between diffusion and time change"
                label="Rho"
                onChange={updateOptions}
            />
        </Col>
        <Col span={24}>
            <Button type="primary" htmlType="submit">Update</Button>
        </Col>
    </Row>
</Form>
)
OptionInputs.propTypes={
    optionParameters:PropTypes.shape({
       numU:PropTypes.number.isRequired, 
       r:PropTypes.number.isRequired, 
       T:PropTypes.number.isRequired, 
       S0:PropTypes.number.isRequired, 
       sigma:PropTypes.number.isRequired, 
       C:PropTypes.number.isRequired, 
       G:PropTypes.number.isRequired, 
       M:PropTypes.number.isRequired, 
       Y:PropTypes.number.isRequired, 
       speed:PropTypes.number.isRequired, 
       v0:PropTypes.number.isRequired, 
       adaV:PropTypes.number.isRequired, 
       rho:PropTypes.number.isRequired
    }),
    updateOptions:PropTypes.func.isRequired,
    submitOptions:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    optionParameters:state.optionParameters
})
const mapDispatchToProps =dispatch=>({
    updateOptions:(key, value)=>updateOptions(key, value, dispatch),
    submitOptions:vals=>getAllData(vals, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionInputs)