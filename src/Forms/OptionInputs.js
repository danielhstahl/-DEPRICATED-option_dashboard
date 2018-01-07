import React from 'react'
import {createArray, handleForm} from '../utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CustomDrop from './FormHelper'
import {getAllData} from '../Actions/lambda'
import {
    updateOptions, showOptionModal
} from '../Actions/parameters'
import { Row, Col, Form, Button, Modal} from 'antd'
const uOptions=createArray(5, 10)
const rOptions=createArray(0, .1, .001)
const tOptions=createArray(.25, 5, .25)
const sOptions=createArray(1, 100)
const sigmaOptions=createArray(.05, .8, .05)
const COptions=createArray(0, 2, .1)
const GMOptions=createArray(.2, 10, .1)
const YOptions=createArray(.2, 1.8, .2)
const speedOptions=createArray(.1, 1, .1)
const v0Options=createArray(.7, 1.3, .05)
const adaOptions=createArray(0, .8, .05)
const rhoOptions=createArray(-.95, .95, .05)

const ShowInputs=connect(
    state=>({
        visible:state.optionModal
    }),
    dispatch=>({
        close:()=>showOptionModal(false, dispatch)
    })
)(({inputs, visible, close})=>(
    <Modal title="Attributes" visible={visible} onOk={close} onCancel={close}>
       <pre><code>{inputs}</code></pre>
    </Modal>
))

/**<Col span={24}>
            <Button className='side-button' type="default" onClick={viewOptionsModal}>View Json</Button>
        </Col> */

/**<ShowInputs inputs={JSON.stringify(optionParameters, null, 2)}/> */
const InputChoices=[
    'Heston',
    'Black Scholes',
    'Custom',
    'JSON'
]
const MenuTypes=({match})=>(
	<Menu theme="light" mode="horizontal" selectedKeys={[match.params[paramKey]]}>
		{InputChoices.map(choice=>(
			<Menu.Item key={choice}>
				<Link to={`/inputs/${choice}`}>{choice}</Link>
			</Menu.Item>
		))}
	</Menu>
)
const CustomForm=({optionParameters, submitOptions, updateOptions})=>(
<Form onSubmit={handleForm(optionParameters, submitOptions)}>
    <Row gutter={16}>
        
        <Col span={12}>
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
        <Col span={12}>
            <CustomDrop 
                objKey='C' 
                round={1}
                parms={optionParameters}
                options={COptions}
                toolTip="This is the C in CGMY"
                label="C"
                onChange={updateOptions}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='G'
                round={1} 
                parms={optionParameters}
                options={GMOptions}
                toolTip="This is the G in CGMY"
                label="G"
                onChange={updateOptions}
            />
        </Col>
        <Col span={12}>
            <CustomDrop 
                objKey='M' 
                round={1}
                parms={optionParameters}
                options={GMOptions}
                toolTip="This is the M in CGMY"
                label="M"
                onChange={updateOptions}
            />
        </Col>
        <Col span={12}>
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
        <Col span={12}>
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
        <Col span={12}>
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
        <Col span={12}>
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
        <Col span={12}>
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
        <Col span={12}>
            <Button className='side-button submit-button' type="primary" htmlType="submit">Update</Button>
        </Col>
    </Row>
</Form>
)
const mapStateToPropsCustom=state=>({
    optionParameters:state.optionParameters
})
const mapDispatchToPropsCustom =dispatch=>({
    updateOptions:(key, value)=>updateOptions(key, value, dispatch),
    submitOptions:vals=>getAllData(vals, dispatch)
})

const EnhanceCustomForm=connect(
    mapStateToPropsCustom, mapDispatchToPropsCustom
)(CustomForm)


const HestonForm=({optionParameters, submitOptions, updateOptions})=>(
    <Form onSubmit={handleForm(optionParameters, submitOptions)}>
        <Row gutter={16}>
            <Col span={12}>
                <CustomDrop 
                    objKey='speed' 
                    round={1}
                    parms={optionParameters}
                    options={speedOptions}
                    toolTip="Speed of mean reversion of time change"
                    label="Speed"
                    onChange={(key, value)=>updateOptions(key, value, optionParameters)}
                />
            </Col>
            <Col span={12}>
                <CustomDrop 
                    objKey='meanVol' 
                    round={2}
                    parms={optionParameters}
                    options={speedOptions}
                    toolTip="Long run average of the volatility"
                    label="Average Vol"
                    onChange={(key, value)=>updateOptions(key, value, optionParameters)}
                />
            </Col>
            <Col span={12}>
                <CustomDrop 
                    objKey='adaV' 
                    round={2}
                    parms={optionParameters}
                    options={adaOptions}
                    toolTip="This is the volatility of the volatility process"
                    label="Vol of Vol"
                    onChange={(key, value)=>updateOptions(key, value, optionParameters)}
                />
            </Col>
            <Col span={12}>
                <CustomDrop 
                    objKey='v0' 
                    round={2}
                    parms={optionParameters}
                    options={v0Options}
                    toolTip="This is the current value of the volatility process."
                    label="V0"
                    onChange={(key, value)=>updateOptions(key, value, optionParameters)}
                />
            </Col>
            <Col span={12}>
                <CustomDrop 
                    objKey='rho' 
                    round={2}
                    parms={optionParameters}
                    options={rhoOptions}
                    toolTip="Correlation between diffusion and time change"
                    label="Rho"
                    onChange={(key, value)=>updateOptions(key, value, optionParameters)}
                />
            </Col>
            <Col span={12}>
                <Button className='side-button submit-button' type="primary" htmlType="submit">Update</Button>
            </Col>
        </Row>
    </Form>
)
const BSForm=({optionParameters, submitOptions, updateOptions})=>(
    <Form onSubmit={handleForm(optionParameters, submitOptions)}>
        <Row gutter={16}>
            <Col span={12}>
                <CustomDrop 
                    objKey='sigma' 
                    round={2}
                    parms={optionParameters}
                    options={sigmaOptions}
                    toolTip="Volatility of diffusion"
                    label="Volatility"
                    onChange={updateOptions}
                />
            </Col>
        </Row>
    </Form>
)

const convertCustomToHestonB=sigma=>sigma*sigma
const convertCustomToHestonC=(ada, sigma)=>ada*sigma*sigma
const convertCustomtoHestonV0=(V0, sigma)=>V0*sigma*sigma

const convertHestonToCustomAda=(c, b)=>c/sqrt(b)
const convertHestonToCustomSig=b=>sqrt(b)
const convertHestonToCustomV0=(v0, b)=>v0/b

const mapStateToPropsHeston=state=>{
    const {sigma, adaV, v0}=state.optionParameters
    return {
        optionParameters:{
            ...state.optionParameters,
            meanVol:convertCustomToHestonB(sigma),
            adaV:convertCustomToHestonC(adaV, sigma),
            v0:convertCustomToHestonV0(v0, sigma)
        }
    }
})
const mapDispatchToPropsHeston =dispatch=>({
    updateOptions:(key, value, optionParameters)=>{
        const {sigma, adaV, v0}=optionParameters
        updateOptions('C', 0, dispatch)
        switch(key){
            case 'meanVol':{
                const c=convertCustomToHestonC(adaV, sigma)
                const hestV0=convertCustomToHestonV0(V0, sigma)
                updateOptions(key, convertHestonToCustomAda(c, value), dispatch)
                updateOptions(key, convertHestonToCustomSig(value), dispatch)
                updateOptions(key, convertHestonToCustomV0(hestV0, value), dispatch)
                break
            }
            case 'adaV':{
                const b=convertCustomToHestonB(sigma)
                updateOptions(key, convertHestonToCustomAda(value, b), dispatch)
                break
            }
            case 'V0':{
                const b=convertCustomToHestonB(sigma)
                updateOptions(key, convertCustomtoHestonV0(value, b), dispatch)
                break
            }
            default:{
                return updateOptions(key, value, dispatch)
            }
        }
    },
    submitOptions:vals=>getAllData(vals, dispatch),
    viewOptionsModal:()=>showOptionModal(true, dispatch)
})

const EnhHestonForm=connect(
    mapStateToPropsHeston,
    mapDispatchToPropsHeston
)(HestonForm)

const mapStateToPropsBS=state=>({
    optionParameters:state.optionParameters
})
const mapDispatchToPropsBS=dispatch=>{
    updateOptions:(key, value)=>{
        updateOptions('C', 0, dispatch)
        updateOptions('V0', 1.0, dispatch)
        updateOptions('adaV', 0.0, dispatch)
        updateOptions(key, value, dispatch)
    },
    submitOptions:vals=>getAllData(vals, dispatch)
}
const EnhBSForm=connect(
    mapStateTopPropsBS,
    mapDispatchToPropsBS
)(BSForm)

const OptionInputs=({optionParameters, updateOptions, submitOptions})=>(
<Modal title="Attributes" visible={visible} onOk={close} onCancel={close}>
    <MenuTypes/>
    <Row>
        <Col span={12}>
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
        <Col span={12}>
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
        <Col span={12}>
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
        <Col span={12}>
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
    </Row>
    <Route path={'/inputs/custom'} component={EnhCustomForm}/>
    <Route path={'/inputs/heston'} component={EnhHestonForm}/>
    <Route path={'/inputs/bs'} component={EnhBSForm}/>
    <Route path={'/inputs/JSON'} render={props=><pre><code>{JSON.stringify(optionParameters, null, 2)}</code></pre>}/>
</Modal>
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
const mapDispatchToProps=dispatch=>({
    updateOptions:(key, value)=>updateOptions(key, value, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionInputs)