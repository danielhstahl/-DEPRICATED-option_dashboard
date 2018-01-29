import React from 'react'
import { modalInputsIndex } from '../Routes/routeDefinitions'
import GenerateForm from './GenerateForm'
import { Modal, Menu } from 'antd'
import { Link } from 'react-router-dom'
const getBaseUrl=path=>path.split("/:")[0]

const MenuTypes=({match, baseUrl})=>{
    const baseAndPathUrl=getBaseUrl(match.path)
    return (
    <Menu theme="light" mode="horizontal" selectedKeys={[match.params[modalInputsIndex]]}>
        <Menu.Item key="manual">
            <Link to={`${baseAndPathUrl}/manual`}>Manual</Link>
        </Menu.Item>
        <Menu.Item key="calibration">
            <Link to={`${baseAndPathUrl}/calibration`}>Calibration</Link>
        </Menu.Item>
    </Menu>
    ) 
}

const ModalInputs=({history, match, model, baseUrl})=>{
    const closeModal=()=>history.push(baseUrl)
    const ModelComponent=GenerateForm[model]
    return (
    <Modal 
        title="Attributes" 
        visible={true} 
        onOk={closeModal} 
        onCancel={closeModal} 
        width={900}
        footer={null}
    >
        <MenuTypes match={match} baseUrl={baseUrl}/>
        <ModelComponent type={match.params[modalInputsIndex]}/>
    </Modal>
    )
}
export default ModalInputs