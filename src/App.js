import React from 'react'
import './App.css'
import {sensitivities} from './appSkeleton'
//import { connect } from 'react-redux'
/*import { FangOost, IVFangOost, FangOostHelp } from './Graphs/FangOost'
import { CarrMadan, IVCarrMadan, CarrMadanHelp} from './Graphs/CarrMadan'
import { FSTS, IVFSTS, FSTSHelp } from './Graphs/FSTS'*/
import {
	FangOost, 
	CarrMadan, 
	FSTS,
	FangOostHelp,
	FSTSHelp,
	CarrMadanHelp
} from './Graphs/Algorithms'
import { Density } from './Graphs/Density'
import AsyncHOC from './AsyncHoc'
import OptionInputs from './Forms/OptionInputs'
import QuantileInputs from './Forms/QuantileInputs'
import StrikeInputs from './Forms/StrikeInputs'
import { Row, Col, Layout, Card, Menu} from 'antd'

//import HelpButton from './HelperComponents/HelpButton'
//import {toggleCarrMadanHelp, toggleFangOostHelp, toggleFSTSHelp} from './Actions/help'
import { 
	BrowserRouter,Route,
	Link, Redirect,
	Switch
} from 'react-router-dom'

const style={ background: '#fff', padding: 24, margin: 0, minHeight: 280 }
const Content=Layout.Content

const paramKey='sensitivity'
const paramUrl=`/:${paramKey}`

const fangOostHelpUrl='/fangoost/help'
const carrMadanHelpUrl='/carrmadan/help'
const fstsHelpUrl='/fsts/help'

//const generateHelpUrl=url=>location=>`${location.pathname}${url}`
const NoSensitivity=({sensitivity, title})=>(
	<p>Attribute {sensitivity} is not available for {title}!</p>
)



const CardPlot=({Algorithm, HelpComponent, url, match, location, title})=>{
	const matchParam=match.params[paramKey]
	const localUrl=`/${matchParam}${url}`
	const Component=Algorithm[matchParam]
	const IVComponent=Algorithm.IV
	return (
	<Card title={title} bordered={false} extra={<Link to={localUrl}>?</Link>}>
		{Component?<Component/>:<NoSensitivity sensitivity={matchParam} title={title}/>}
		<IVComponent />
		<Route path={localUrl} exact component={HelpComponent}/>
	</Card>

	)
}
const HoldCards=props=>(
<Row gutter={32} justify="center">
	<Col lg={8}>
		<CardPlot
			Algorithm={CarrMadan} 
			title="Carr-Madan" 
			HelpComponent={CarrMadanHelp}
			url={carrMadanHelpUrl}
			{...props}
		/>
	</Col>
	<Col lg={8}>
		<CardPlot 
			Algorithm={FSTS} 
			title="Fourier Space Time Step" 
			HelpComponent={FSTSHelp}
			url={fstsHelpUrl}
			{...props}
		/>
	</Col>
	<Col lg={8}>
		<CardPlot 
			Algorithm={FangOost} 
			title="Fang-Oosterlee" 
			HelpComponent={FangOostHelp}
			url={fangOostHelpUrl}
			{...props}
		/>
	</Col>
</Row>
)

const App =()=>(
	<Layout>
		<AsyncHOC/>
		<Content style={style}>
			<Row gutter={32}>
				<Col xs={6} className='left'>
					<OptionInputs/>
					<QuantileInputs/>
					<StrikeInputs/>
				</Col>
				<BrowserRouter>
					<Col xs={18} className='right'>
						<Menu theme="light" mode="horizontal" defaultSelectedKeys={[sensitivities[0]]}>
							{sensitivities.map(sensitivity=>(
								<Menu.Item key={sensitivity}>
									<Link key={sensitivity} to={`/${sensitivity}`}>{sensitivity}</Link>
								</Menu.Item>
							))}
						</Menu>
						<Switch>
							<Route path={paramUrl} component={HoldCards}/>
							<Redirect from="/" exact to="/price" />
						</Switch>
						<br /><br />
						<Row gutter={32} justify="center">
							<Col lg={8}>
								<Card title="Density" bordered={false}>
									<Density />
								</Card>
							</Col>
						</Row>
					</Col>
				</BrowserRouter>
			</Row>
		</Content>
	</Layout>
)
/**TODO! need to make this into a router parameter.  This is hard to maintain and hard to link to. */
/*const mapStateToProps=state=>({
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
	
})*/
export default App