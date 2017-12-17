import React from 'react'

import './App.css'
import {
  FangOostCall, FangOostPut, IVFangOost
} from './Graphs/FangOost'
import {
  CarrMadanCall, CarrMadanPut, IVCarrMadan
} from './Graphs/CarrMadan'
import {
  FSTSCall, FSTSPut, IVFSTS
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
      <Col span={8}>
          <CarrMadanCall/>
      </Col>
      <Col span={8}>
          <CarrMadanPut/>
      </Col>
      <Col span={8}>
          <IVCarrMadan/>
      </Col>
    </Row>
      
    <Row gutter={16} justify="center">
      <Col span={8}>
          <FSTSCall/>
      </Col>
      <Col span={8}>
          <FSTSPut/>
      </Col>
      <Col span={8}>
          <IVFSTS/>
      </Col>
    </Row>
    <Row gutter={16} justify="center">
      <Col span={8}>
        <StrikeInputs/>
      </Col>
    </Row>
    <Row gutter={16} justify="center">
      <Col span={8}>
        <FangOostCall/>
      </Col>

      <Col span={8}>
        <FangOostPut/>
      </Col>
      <Col span={8}>
        <IVFangOost/>
      </Col>
    </Row>
    </Content>
    </Layout>
)
}

export default App
