import React from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateCustom } from '../Actions/parameters'
import HestonForm from './HestonInputs'
import CustomForm from './CustomInputs'
import BSForm from './BSInputs'
import { Modal, Menu } from 'antd'
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