import React from 'react'
import './App.css'
import { sensitivities, modelChoices } from './appSkeleton'
import { FangOost, CarrMadan, FSTS, FangOostHelp, FSTSHelp, CarrMadanHelp } from './Graphs/Algorithms'
import { Density } from './Graphs/Density'
import AsyncHOC from './AsyncHoc'
import ModalInputs from './Forms/ModalInputs'
import QuantileInputs from './Forms/QuantileInputs'
import StrikeInputs from './Forms/StrikeInputs'
import CardPlot from './Cards/CardPlot'
import { Row, Col, Layout, Card, Menu } from 'antd'
import { BrowserRouter,Route, Link, Redirect, Switch } from 'react-router-dom'
import { upperFirstLetter } from './Utils/utils'
import { rootParamName } from './Routes/routeDefinitions'
const style = {
	background: 'whitesmoke',
	margin: 0,
	minHeight: 280
}
const inputsUrl='inputs'

const [HestonName]=modelChoices

const Content=Layout.Content
const paramUrl=`/:${rootParamName}`
const baseUrl='/'
const [priceName]=sensitivities
const redirectUrl=`/${priceName}`
const fangOostHelpUrl='/fangoost/help'
const carrMadanHelpUrl='/carrmadan/help'
const fstsHelpUrl='/fsts/help'

const floatRight={ float:'right' }
const colBreaks={ sm:24, md:12, xl:6 }
const MenuSensitivities=({match})=> (
	<Menu 
		theme="light" 
		mode="horizontal" 
		selectedKeys={ [match.params[rootParamName]] }
		style={{backgroundColor: 'whitesmoke'}}
	>
		{
			sensitivities.map(sensitivity=>(
				<Menu.Item key={sensitivity}>
					<Link to={`/${sensitivity}`}> {upperFirstLetter(sensitivity)} </Link>
				</Menu.Item>
			))
		}
		<Menu.Item style={floatRight}>
			<Link to={`/${match.params[rootParamName]}/${inputsUrl}/${HestonName.value}`}>Edit Inputs</Link>
		</Menu.Item>
	</Menu>
)

const WrapModalInputs=({match})=>(
	<Route path={`/${match.params[rootParamName]}/${inputsUrl}/:inputChoice`} component={ModalInputs}/>
)
const HoldCards=props=>[
	<WrapModalInputs {...props} key={0}/>,
	<MenuSensitivities {...props} key={1}/>,
	<Row gutter={16} type="flex" justify="space-between" key={2}>
		<Col {...colBreaks} >
			<CardPlot
				Algorithm={CarrMadan} 
				title="Carr-Madan" 
				HelpComponent={CarrMadanHelp}
				url={carrMadanHelpUrl}
				{...props}
			/>
		</Col>
		<Col {...colBreaks} >
			<CardPlot 
				Algorithm={FSTS} 
				title="Fourier Space Time Step" 
				HelpComponent={FSTSHelp}
				url={fstsHelpUrl}
				{...props}
			/>
		</Col>
		<Col {...colBreaks} >
			<CardPlot 
				Algorithm={FangOost} 
				title="Fang-Oosterlee" 
				HelpComponent={FangOostHelp}
				url={fangOostHelpUrl}
				{...props}
				CardFooter = {StrikeInputs}
			/>
		</Col>
		<Col {...colBreaks} >
			<Card title="Density" bordered={false} >
				<Density /> <div className='cardFooter'> <QuantileInputs /> </div>
			</Card>
		</Col>
	</Row>
]

const App =()=>(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<Layout>
			<AsyncHOC/>
			<Content style={style}>
				<div className='container'>
					<Switch>
						<Route path={paramUrl} component={HoldCards}/>
						<Redirect from={baseUrl} exact to={redirectUrl} />
					</Switch>
				</div>
			</Content>
		</Layout>
	</BrowserRouter>
)

export default App