import React from 'react'
import { uOptions, rOptions, tOptions, sOptions, gutter, flexObj, formItemLayoutLabel } from './globalOptions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomDrop from './FormHelper'
import { updateCustom } from '../Actions/parameters'
import HestonForm from './HestonInputs'
import CustomForm from './CustomInputs'
import BSForm from './BSInputs'
import { Row, Col, Modal, Menu, Form } from 'antd'
import { Route, Link } from 'react-router-dom'
const FormItem=Form.Item
const getBaseUrl=path=>path.split("/:")[0]
const generateUrl=(path, choice)=>`${getBaseUrl(path)}/${choice}`

export const inputChoices=[
    'Heston',
    'Black Scholes',
    'Advanced',
]

const [HestonName, BSName, CustomName]=inputChoices

const MenuTypes=({match})=>(
<Menu theme="light" mode="horizontal" selectedKeys={[match.params.inputChoice]}>
    {inputChoices.map(choice=>(
        <Menu.Item key={choice}>
            <Link to={generateUrl(match.path, choice)}>{choice}</Link>
        </Menu.Item>
    ))}
</Menu>
) 

const ModalInputs=({customParameters, updateCustom, history, match})=>{
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
                <FormItem {...formItemLayoutLabel} label="Discrete Steps">
                    <CustomDrop 
                        objKey='numU' 
                        parms={customParameters}
                        options={uOptions}
                        round={0}
                        toolTip="This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take."
                        onChange={updateCustom}
                    />
                </FormItem>
            </Col>
            <Col {...flexObj}>
                <FormItem {...formItemLayoutLabel} label="Rate">
                    <CustomDrop 
                        objKey='r' 
                        parms={customParameters}
                        round={3}
                        options={rOptions}
                        toolTip="Risk free interest rate"
                        onChange={updateCustom}
                    />
                </FormItem>
            </Col>
            <Col {...flexObj}>
                <FormItem {...formItemLayoutLabel} label="T">
                    <CustomDrop 
                        objKey='T' 
                        round={2}
                        parms={customParameters}
                        options={tOptions}
                        toolTip="Time till maturity"
                        onChange={updateCustom}
                    />
                </FormItem>
            </Col>
            <Col {...flexObj}>
                <FormItem {...formItemLayoutLabel} label="S or K">
                    <CustomDrop 
                        objKey='S0' 
                        round={0}
                        parms={customParameters}
                        options={sOptions}
                        toolTip="For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike"
                        onChange={updateCustom}
                    />
                </FormItem>
            </Col>
        </Row>
        <Route path={generateUrl(match.path, HestonName)} component={HestonForm}/>
        <Route path={generateUrl(match.path, CustomName)} component={CustomForm}/>
        <Route path={generateUrl(match.path, BSName)} component={BSForm}/>
    </Modal>
    )
}
ModalInputs.propTypes={
    customParameters:PropTypes.shape({
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
const mapStateToProps=({customParameters})=>({customParameters})
const mapDispatchToProps=dispatch=>({
    updateCustom:(key, value)=>updateCustom(key, value, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ModalInputs)