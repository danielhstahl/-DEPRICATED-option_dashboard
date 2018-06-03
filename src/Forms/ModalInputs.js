import React from 'react'
import { modalInputsIndex } from '../Routes/routeDefinitions'
import ModelForm from './ModelForm'
import { Modal, Menu } from 'antd'
import { Link } from 'react-router-dom'
const getBaseUrl=path=>path.split("/:")[0]

const MenuTypes=({match, basePath})=>(
    <Menu theme="light" mode="horizontal" selectedKeys={[match.params[modalInputsIndex]]}>
        <Menu.Item key="manual">
            <Link to={`${basePath}/manual`}>Manual</Link>
        </Menu.Item>
        <Menu.Item key="calibration">
            <Link to={`${basePath}/calibration`}>Calibration</Link>
        </Menu.Item>
        <Menu.Item key="settings">
            <Link to={`${basePath}/settings`}>Settings</Link>
        </Menu.Item>
    </Menu>
) 


const ModalInputs=({history, match, model, baseUrl})=>{
    const closeModal=()=>history.push(baseUrl)
    const baseAndPathUrl=getBaseUrl(match.path)
    return (
    <Modal 
        title="Attributes" 
        visible={true} 
        onOk={closeModal} 
        onCancel={closeModal} 
        width={900}
        footer={null}
    >
        <MenuTypes match={match} basePath={baseAndPathUrl}/>
        <ModelForm basePath={baseAndPathUrl} model={model}/>
    </Modal>
    )
}
export default ModalInputs