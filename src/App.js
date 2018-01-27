import React from 'react'
import './App.css'
import { sensitivities, modelChoices } from './appSkeleton'
import { FangOost, CarrMadan, FSTS, FangOostHelp, FSTSHelp, CarrMadanHelp } from './Graphs/Algorithms'
import { Density } from './Graphs/Density'
import AsyncHOC from './AsyncHoc'
import ModalInputs from './Forms/ModalInputs'
import QuantileInputs from './Forms/QuantileInputs'
import CardPlot from './Cards/CardPlot'
import { Row, Col, Dropdown, Layout, Card, Menu } from 'antd'
import { HashRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import { upperFirstLetter } from './Utils/utils'
import { rootModel, rootSensitivity, modalInputsIndex, inputsUrl } from './Routes/routeDefinitions'
const style = {
	background: 'whitesmoke',
	margin: 0,
	minHeight: 280
}

const [priceName]=sensitivities
const [, , CustomName]=modelChoices
const Content=Layout.Content
const paramUrl=`/:${rootModel}/:${rootSensitivity}`
const baseUrl='/'
const redirectUrl=`${CustomName.value}/${priceName}`
const fangOostHelpUrl='/fangoost/help'
const carrMadanHelpUrl='/carrmadan/help'
const fstsHelpUrl='/fsts/help'

const floatRight={ float:'right',  }
const colBreaks={ sm:24, md:12, xl:6 }
const modelChoiceGenerator = handleMenuClick=>(
	<Menu onClick={e=>handleMenuClick(e.key)}>
	{modelChoices.map(({value, label})=>(
		<Menu.Item key={value}>{label}</Menu.Item>
	))}
	</Menu>
)
const colorStyle={backgroundColor: 'whitesmoke'}
const MenuSensitivities=({history, sensitivity, model})=>{
	const goToInputModal=model=>{
		history.push(`/${model}/${sensitivity}/${inputsUrl}/manual`)
	}
	return (
		<Menu 
			theme="light" 
			mode="horizontal" 
			selectedKeys={ [sensitivity] }
			style={colorStyle}
		>
			{
				sensitivities.map(sensitivity=>(
					<Menu.Item key={sensitivity}>
						<Link to={`/${model}/${sensitivity}`}> {upperFirstLetter(sensitivity)} </Link>
					</Menu.Item>
				))
			}
			<div>
				<Dropdown.Button 
					key={1}
					style={floatRight}
					onClick={()=>{
						goToInputModal(model)
					}}
					overlay={modelChoiceGenerator(goToInputModal)}
				>
					{modelChoices.find(({value})=>model===value).label}: Inputs
				</Dropdown.Button>
			</div>
		</Menu>
	)	
}

const WrapModalInputs=({model, sensitivity})=>{
	const baseUrl=`/${model}/${sensitivity}`
	return (
	<Route 
		path={`${baseUrl}/${inputsUrl}/:${modalInputsIndex}`} 
		render={({match, history})=>(
			<ModalInputs 
				model={model}
				baseUrl={baseUrl}
				match={match}
				history={history}
			/> 
		)}
	/>
	)
}
const HoldCards=({match, ...rest})=>{
	const rootModelLink=match.params[rootModel]
	const rootSensitivityLink=match.params[rootSensitivity]
	return [
	<WrapModalInputs 
		sensitivity={rootSensitivityLink}
		model={rootModelLink}
		key={0}
	/>,
	<MenuSensitivities 
		sensitivity={rootSensitivityLink}
		model={rootModelLink}
		{...rest} key={1}
	/>,
	<Row gutter={16} type="flex" justify="space-between" key={2}>
		<Col {...colBreaks} >
			<CardPlot
				Algorithm={CarrMadan} 
				title="Carr-Madan" 
				HelpComponent={CarrMadanHelp}
				url={carrMadanHelpUrl}
				match={match}
				{...rest}
			/>
		</Col>
		<Col {...colBreaks} >
			<CardPlot 
				Algorithm={FSTS} 
				title="Fourier Space Time Step" 
				HelpComponent={FSTSHelp}
				url={fstsHelpUrl}
				match={match}
				{...rest}
			/>
		</Col>
		<Col {...colBreaks} >
			<CardPlot 
				Algorithm={FangOost} 
				title="Fang-Oosterlee" 
				HelpComponent={FangOostHelp}
				url={fangOostHelpUrl}
				match={match}
				{...rest}
				//CardFooter = {StrikeInputs}
			/>
		</Col>
		<Col {...colBreaks} >
			<Card title="Density" bordered={false} >
				<Density /> <div className='cardFooter'> <QuantileInputs /> </div>
			</Card>
		</Col>
	</Row>
	]
}

const App =()=>(
	<HashRouter basename={process.env.PUBLIC_URL}>
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
	</HashRouter>
)

export default App