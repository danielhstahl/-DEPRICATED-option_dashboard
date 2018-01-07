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
import OptionInputs from './Forms/OptionInputs'
import QuantileInputs from './Forms/QuantileInputs'
import StrikeInputs from './Forms/StrikeInputs'
import { Row, Col, Layout, Card, Menu} from 'antd'


import { 
	BrowserRouter,Route,
	Link, Redirect,
	Switch
} from 'react-router-dom'

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
const MenuSensitivities=({match})=> (
	<Menu theme="light" mode="horizontal" selectedKeys={[match.params[paramKey]]}>
		{sensitivities.map(sensitivity=>(
			<Menu.Item key={sensitivity}>
				<Link to={`/${sensitivity}`}>{sensitivity}</Link>
			</Menu.Item>
		))}
	</Menu>
)
const HoldCards=props=>[
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
/**<Col xs={6} className='left'>
					<OptionInputs/>
					
					
				</Col> */
const App =()=>(
	<Layout>
		<AsyncHOC/>
		<Content style={style}>
			<Row gutter={32}>
				<BrowserRouter basename={process.env.PUBLIC_URL}>
					<Link to='/inputs' />
					<Route path='/inputs' component={OptionInputs}/>
					<Switch>
						<Route path={paramUrl} component={HoldCards}/>
						<Redirect from={baseUrl} exact to={redirectUrl} />
					</Switch>
				</BrowserRouter>
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
)

export default App