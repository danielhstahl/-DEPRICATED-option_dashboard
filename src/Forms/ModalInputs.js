import React from 'react'
import { modalInputsIndex } from '../Routes/routeDefinitions'
import HestonForm from './HestonInputs'
import CustomForm from './CustomInputs'
import BSForm from './BSInputs'
import { Modal, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { modelChoices } from '../appSkeleton'
const getBaseUrl=path=>path.split("/:")[0]

const [HestonName, BSName, CustomName]=modelChoices

const MenuTypes=({match, baseUrl})=>{
    const baseAndPathUrl=getBaseUrl(match.path)
    return (
    <Menu theme="light" mode="horizontal" selectedKeys={[match.params[modalInputsIndex]]}>
        <Menu.Item key={"manual"}>
            <Link to={`${baseAndPathUrl}/manual`}>Manual</Link>
        </Menu.Item>
        <Menu.Item key={"calibration"}>
            <Link to={`${baseAndPathUrl}/calibration`}>Calibration</Link>
        </Menu.Item>
    </Menu>
    ) 
}
const switchComponent=(model, type)=>{
    switch(model){
        case HestonName.value:
            return <HestonForm type={type}/>
        case BSName.value:
            return <BSForm type={type}/>
        case CustomName.value:
            return <CustomForm type={type}/>
        default:
            return <div>Should have a model!</div>
    }
}

const ModalInputs=({history, match, model, baseUrl})=>{
    const closeModal=()=>history.push(baseUrl)
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
        {switchComponent(model, match.params[modalInputsIndex])}
    </Modal>
    )
}
export default ModalInputs