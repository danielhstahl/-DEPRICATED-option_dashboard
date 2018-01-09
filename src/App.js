import React from 'react'
import './App.css'
import { sensitivities } from './appSkeleton'
import { FangOost, CarrMadan, FSTS, FangOostHelp, FSTSHelp, CarrMadanHelp } from './Graphs/Algorithms'
import { Density } from './Graphs/Density'
import AsyncHOC from './AsyncHoc'
import ModalInputs from './Forms/ModalInputs'
import QuantileInputs from './Forms/QuantileInputs'
import StrikeInputs from './Forms/StrikeInputs'
import CardPlot, {cardPlot} from './Cards/CardPlot'
import { Row, Col, Layout, Card, Menu } from 'antd'
import { BrowserRouter,Route, Link, Redirect, Switch } from 'react-router-dom'
import { inputChoices } from './Forms/ModalInputs'
import { upperFirstLetter } from './Utils/utils'
import { rootParamName } from './Routes/routeDefinitions'
const style = {
	background: 'whitesmoke',
	margin: 0,
	minHeight: 280
}
const inputsUrl='inputs'


const [HestonName]=inputChoices

const Content=Layout.Content
const paramUrl=`/:${rootParamName}`
const baseUrl='/'
const [priceName]=sensitivities
const redirectUrl=`/${priceName}`
const fangOostHelpUrl='/fangoost/help'
const carrMadanHelpUrl='/carrmadan/help'
const fstsHelpUrl='/fsts/help'

const floatRight={float:'right'}
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
			<Link to={`/${match.params[rootParamName]}/${inputsUrl}/${HestonName}`}>Edit Inputs</Link>
		</Menu.Item>
	</Menu>
)

const WrapModalInputs=({match})=>(
	<Route path={`/${match.params[rootParamName]}/${inputsUrl}/:inputChoice`} component={ModalInputs}/>
)
const HoldCards=props=>[
	<WrapModalInputs {...props} key={-1}/>,

	<MenuSensitivities key={0} {...props}/>,

	<Col lg={6} key={1}>
		<CardPlot
			Algorithm={CarrMadan} 
			title="Carr-Madan" 
			HelpComponent={CarrMadanHelp}
			url={carrMadanHelpUrl}
			{...props}
		/>
	</Col>,

	<Col lg={6} key={2}>
		<CardPlot 
			Algorithm={FSTS} 
			title="Fourier Space Time Step" 
			HelpComponent={FSTSHelp}
			url={fstsHelpUrl}
			{...props}
		/>
	</Col>,

	<Col lg={6} key={3}>
		<CardPlot 
			Algorithm={FangOost} 
			title="Fang-Oosterlee" 
			HelpComponent={FangOostHelp}
			url={fangOostHelpUrl}
			{...props}
			CardFooter = {StrikeInputs}
		/>
	</Col>
]

const App =()=>(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<Layout>
			<AsyncHOC/>
			<Content style={style}>
				<div className='container'>
					<Row gutter={8}>
						<Switch>
							<Route path={paramUrl} component={HoldCards}/>
							<Redirect from={baseUrl} exact to={redirectUrl} />
						</Switch>
						<Col lg={6}>
							<Card title="Density" bordered={false} style={cardPlot}>
								<Density /> <div className='cardFooter'> <QuantileInputs /> </div>
							</Card>
						</Col>
					</Row>
				</div>
			</Content>
		</Layout>
	</BrowserRouter>
)

export default App