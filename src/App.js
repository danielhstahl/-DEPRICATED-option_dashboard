import React from 'react'

import './App.css'
import {
   FangOost, IVFangOost
} from './Graphs/FangOost'
import {
  CarrMadan, IVCarrMadan
} from './Graphs/CarrMadan'
import {
  FSTS, IVFSTS
} from './Graphs/FSTS'
import {Density} from './Graphs/Density'
import AsyncHOC from './AsyncHoc'
import OptionInputs from './Forms/OptionInputs'
import QuantileInputs from './Forms/QuantileInputs'
import StrikeInputs from './Forms/StrikeInputs'

import { Row, Col, Layout} from 'antd'
const Content=Layout.Content
const style={ background: '#fff', padding: 24, margin: 0, minHeight: 280 }

const App =()=>{
  console.log("got here")
  return (
    <Layout>
    <AsyncHOC/>
    <Content style={style}>
    <Row gutter={16} justify="center">
      <Col span={8}>
        <QuantileInputs/>
        <Density/>
      </Col>

      <Col span={16}>
        <OptionInputs/>
      </Col>
    </Row>
    <Row gutter={16} justify="center">
      <Col span={12}>
          <CarrMadan/>
      </Col>
      
      <Col span={12}>
          <IVCarrMadan/>
      </Col>
    </Row>
      
    <Row gutter={16} justify="center">
      <Col span={12}>
          <FSTS/>
      </Col>
      <Col span={12}>
          <IVFSTS/>
      </Col>
    </Row>
    <Row gutter={16} justify="center">
      <Col span={8}>
        <StrikeInputs/>
      </Col>
    </Row>
    <Row gutter={16} justify="center">
      <Col span={12}>
        <FangOost/>
      </Col>
      <Col span={12}>
        <IVFangOost/>
      </Col>
    </Row>
    </Content>
    </Layout>
)
}

export default App
