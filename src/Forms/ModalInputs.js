import React from 'react'
import { uBounds, rBounds, tBounds, sBounds, gutter, flexObj } from './globalOptions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CustomFormItemInput } from './FormHelper'
import { updateCustom } from '../Actions/parameters'
import HestonForm from './HestonInputs'
import CustomForm from './CustomInputs'
import BSForm from './BSInputs'
import { Row, Col, Modal, Menu } from 'antd'
import { Route, Link } from 'react-router-dom'
import { modelChoices } from '../appSkeleton'
const getBaseUrl=path=>path.split("/:")[0]
const generateUrl=(path, choice)=>`${getBaseUrl(path)}/${choice}`



const [HestonName, BSName, CustomName]=modelChoices

const MenuTypes=({match})=>(
<Menu theme="light" mode="horizontal" selectedKeys={[match.params.inputChoice]}>
    {modelChoices.map(({value, label})=>(
        <Menu.Item key={value}>
            <Link to={generateUrl(match.path, value)}>{label}</Link>
        </Menu.Item>
    ))}
</Menu>
) 

const ModalInputs=({optionParameters, updateCustom, history, match, formValidation})=>{
    const closeModal=()=>history.push(getBaseUrl(match.path))
    return (
    <Modal 
        title="Attributes" 
        visible={true} 
        onOk={closeModal} 
        onCancel={closeModal} 
        width={900}
        footer={null}
    >
        <MenuTypes match={match}/>
        <Row gutter={gutter}>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    label="Discrete Steps" 
                    objKey='numU' 
                    parms={optionParameters}
                    validationResults={formValidation}
                    validator={uBounds}
                    toolTip="This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take."
                    onChange={updateCustom}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    label='Rate'
                    objKey='r' 
                    parms={optionParameters}
                    validationResults={formValidation}
                    validator={rBounds}
                    toolTip="Risk free interest rate"
                    onChange={updateCustom}
                />
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput
                    label='T'
                    objKey='T' 
                    parms={optionParameters}
                    validationResults={formValidation}
                    validator={tBounds}
                    toolTip="Time till maturity"
                    onChange={updateCustom}
                    />            
            </Col>
            <Col {...flexObj}>
                <CustomFormItemInput 
                    label='S or K'
                    objKey='S0' 
                    parms={optionParameters}
                    validationResults={formValidation}
                    validator={sBounds}
                    toolTip="For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike"
                    onChange={updateCustom}
                />
            </Col>
        </Row>
        <Route path={generateUrl(match.path, HestonName.value)} component={HestonForm}/>
        <Route path={generateUrl(match.path, CustomName.value)} component={CustomForm}/>
        <Route path={generateUrl(match.path, BSName.value)} component={BSForm}/>
    </Modal>
    )
}
ModalInputs.propTypes={
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
    })
}
const mapStateToProps=({optionParameters, optionValidation})=>({optionParameters, formValidation:optionValidation})
const mapDispatchToProps=dispatch=>({
    updateCustom:(key, value, validationStatus)=>{
        updateCustom(key, value, validationStatus, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ModalInputs)