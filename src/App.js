import React from 'react'
import './App.css'
import {
	sensitivities
} from './appSkeleton'
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
import ModalInputs from './Forms/ModalInputs'
import QuantileInputs from './Forms/QuantileInputs'
import StrikeInputs from './Forms/StrikeInputs'
import { Row, Col, Layout, Card, Menu} from 'antd'
import { 
	BrowserRouter,Route,
	Link, Redirect,
	Switch
} from 'react-router-dom'

import { urlName, inputChoices } from './Forms/ModalInputs'
const [HestonName]=inputChoices

const style={ background: '#fff', padding: 24, margin: 0, minHeight: 280 }
const Content=Layout.Content
const paramKey='sensitivity'
const paramUrl=`/:${paramKey}`
const baseUrl='/'
const [priceName]=sensitivities
const redirectUrl=`/${priceName}`
const fangOostHelpUrl='/fangoost/help'
const carrMadanHelpUrl='/carrmadan/help'
const fstsHelpUrl='/fsts/help'

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
const floatRight={float:'right'}
const MenuSensitivities=({match})=> (
	<Menu theme="light" mode="horizontal" selectedKeys={[match.params[paramKey]]}>
		{sensitivities.map(sensitivity=>(
			<Menu.Item key={sensitivity}>
				<Link to={`/${sensitivity}`}>{sensitivity}</Link>
			</Menu.Item>
		))}
		<Menu.Item style={floatRight}>
			<Link to={`/${match.params[paramKey]}/${urlName}/${HestonName}`}>Edit Inputs</Link>
		</Menu.Item>
	</Menu>
)

const WrapModalInputs=({match})=>(
	<Route path={`/${match.params[paramKey]}/${urlName}/:inputChoice`} component={ModalInputs}/>
)
const HoldCards=props=>[
<WrapModalInputs {...props} key={-1}/>,
<MenuSensitivities key={0} {...props}/>,
<Col lg={8} key={1}>
	<CardPlot
		Algorithm={CarrMadan} 
		title="Carr-Madan" 
		HelpComponent={CarrMadanHelp}
		url={carrMadanHelpUrl}
		{...props}
	/>
</Col>,
<Col lg={8} key={2}>
	<CardPlot 
		Algorithm={FSTS} 
		title="Fourier Space Time Step" 
		HelpComponent={FSTSHelp}
		url={fstsHelpUrl}
		{...props}
	/>
</Col>,
<Col lg={8} key={3}>
	<CardPlot 
		Algorithm={FangOost} 
		title="Fang-Oosterlee" 
		HelpComponent={FangOostHelp}
		url={fangOostHelpUrl}
		{...props}
	/>
	<StrikeInputs/>
</Col>
]

const App =()=>(
<BrowserRouter basename={process.env.PUBLIC_URL}>
	<Layout>
		<AsyncHOC/>
		<Content style={style}>
			<Row gutter={32}>
				<Switch>
					<Route path={paramUrl} component={HoldCards}/>
					<Redirect from={baseUrl} exact to={redirectUrl} />
				</Switch>
				
			</Row>
			<Row gutter={32} justify="center">
				<Col lg={8}>
					<Card title="Density" bordered={false}>
						<Density />
						<QuantileInputs/>
					</Card>
				</Col>
			</Row>
		</Content>
	</Layout>
</BrowserRouter>
)

export default App