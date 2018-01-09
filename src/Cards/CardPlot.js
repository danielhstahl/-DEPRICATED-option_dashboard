import React from 'react'
import { connect } from 'react-redux'
import { Card, Alert } from 'antd'
import { rootParamName } from '../Routes/routeDefinitions'
import { Route, Link } from 'react-router-dom'
import {
    sensitivities
} from '../appSkeleton'

export const cardPlot = { margin: '20px' }

const [, , thetaName]=sensitivities
const switchTheta=(adaV, v0, sensitivity, Component)=>(sensitivity===thetaName&&(adaV>0||v0!==1))&&Component
const ThetaWarning=({adaV, v0})=>(
<Alert
	message="Warning"
	description={`Theta is inaccurate when adaV>0 (currently ${adaV}) or v0!=1 (currently ${v0})`}
	type="warning"
	showIcon
/>
)
const NoSensitivity=({sensitivity, title})=>(
	<p>Attribute {sensitivity} is not available for {title}!</p>
)
const CardPlot=({Algorithm, HelpComponent, url, match, location, title, adaV, v0, CardFooter})=>{
	const matchParam=match.params[rootParamName]
	const localUrl=`/${matchParam}${url}`
	const Component=Algorithm[matchParam]
	const IVComponent=Algorithm.IV
	return (
		<Card 
			title={title} 
			bordered={false} 
			extra={ <Link to={localUrl}>?</Link> }
			style={cardPlot}
		>
			{switchTheta(adaV, v0, matchParam, Component)?<ThetaWarning adaV={adaV} v0={v0}/>:null}
			{Component?<Component/> :<NoSensitivity sensitivity={matchParam} title={title}/>}
			<IVComponent />
			<Route path={localUrl} exact component={HelpComponent}/>
			{CardFooter ? <div className='cardFooter'><CardFooter /></div> : <div className='cardFooter'></div> }
		</Card>
	)
}

const mapStateToProps=({customParameters})=>({...customParameters})

export default connect(mapStateToProps)(CardPlot)