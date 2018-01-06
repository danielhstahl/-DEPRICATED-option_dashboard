import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { FangOost, IVFangOost, FangOostHelp } from './Graphs/FangOost'
import { CarrMadan, IVCarrMadan, CarrMadanHelp} from './Graphs/CarrMadan'
import { FSTS, IVFSTS, FSTSHelp } from './Graphs/FSTS'
import { Density } from './Graphs/Density'
import AsyncHOC from './AsyncHoc'
import OptionInputs from './Forms/OptionInputs'
import QuantileInputs from './Forms/QuantileInputs'
import StrikeInputs from './Forms/StrikeInputs'
import { Row, Col, Layout, Card } from 'antd'
import HelpButton from './HelperComponents/HelpButton'
import {toggleCarrMadanHelp, toggleFangOostHelp, toggleFSTSHelp} from './Actions/help'

const style={ background: '#fff', padding: 24, margin: 0, minHeight: 280 }
const Content=Layout.Content

const App =({carrMadanHelp, fangOostHelp, fstsHelp, openCarrMadanHelp, closeCarrMadanHelp, openFSTSHelp, closeFSTSHelp, openFangOostHelp, closeFangOostHelp})=>(
	<Layout>
		<AsyncHOC/>
		<Content style={style}>
			<Row gutter={32}>
				<Col xs={6} className='left'>
					<OptionInputs/>
					<QuantileInputs/>
					<StrikeInputs/>
				</Col>
				<CarrMadanHelp visible={carrMadanHelp} onOk={closeCarrMadanHelp} onCancel={closeCarrMadanHelp}/>
				<FangOostHelp visible={fangOostHelp}  onOk={closeFangOostHelp} onCancel={closeFangOostHelp}/>
				<FSTSHelp visible={fstsHelp} onOk={closeFSTSHelp} onCancel={closeFSTSHelp}/>
				<Col xs={18} className='right'>
					<Row gutter={32} justify="center">
						<Col lg={8}>
							<Card title="Carr-Madan" bordered={false} extra={<HelpButton showModal={openCarrMadanHelp}/>}>
								<CarrMadan />
								<IVCarrMadan />
							</Card>
						</Col>
						<Col lg={8}>
							<Card title="FSTS" bordered={false} extra={<HelpButton showModal={openFSTSHelp}/>}>
								<FSTS />
								<IVFSTS />
							</Card>
						</Col>
						<Col lg={8}>
							<Card title="Fang-Oosterlee" bordered={false} extra={<HelpButton showModal={openFangOostHelp}/>}>
								<FangOost />
								<IVFangOost />
							</Card>
						</Col>
					</Row>
					<br /><br />
					<Row gutter={32} justify="center">
						<Col lg={8}>
							<Card title="Density" bordered={false}>
								<Density />
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</Content>
	</Layout>
)
/**TODO! need to make this into a router parameter.  This is hard to maintain and hard to link to. */
const mapStateToProps=state=>({
	carrMadanHelp:state.helpCarrMadan,
	fangOostHelp:state.helpFangOost,
	fstsHelp:state.helpFSTS,
})
const mapDispatchToProps=dispatch=>({
	openCarrMadanHelp:()=>toggleCarrMadanHelp(dispatch, true),
	closeCarrMadanHelp:()=>toggleCarrMadanHelp(dispatch, false),
	openFangOostHelp:()=>toggleFangOostHelp(dispatch, true),
	closeFangOostHelp:()=>toggleFangOostHelp(dispatch, false),
	openFSTSHelp:()=>toggleFSTSHelp(dispatch, true),
	closeFSTSHelp:()=>toggleFSTSHelp(dispatch, false),
	
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)