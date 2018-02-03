import React from 'react'
import { connect } from 'react-redux'
import { Card, Alert } from 'antd'
import { rootSensitivity, rootModel } from '../Routes/routeDefinitions'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { parameters } from '../Actions/actionDefinitions'
import { getCGMYFunction, getAllCGMY } from '../Utils/utils'
import {
    sensitivities
} from '../appSkeleton'

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
const CardPlot=({Algorithm, HelpComponent, url, match, title, parameters, model, modelAttr})=>{
	const rootModelLink=match.params[rootModel]
	const rootSensitivityLink=match.params[rootSensitivity]
	console.log(getAllCGMY(parameters, getCGMYFunction(modelAttr)))
	const {adaV, v0}=getAllCGMY(parameters, getCGMYFunction(modelAttr))
	const localUrl=`/${rootModelLink}/${rootSensitivityLink}${url}`
	const Component=Algorithm[rootSensitivityLink]
	const IVComponent=Algorithm.IV
	return (
		<Card 
			title={title} 
			bordered={false} 
			extra={ <Link to={localUrl}>?</Link> }
		>
			{switchTheta(adaV, v0, rootSensitivityLink, Component)?<ThetaWarning adaV={adaV} v0={v0}/>:null}
			{Component?<Component/> :<NoSensitivity sensitivity={rootSensitivityLink} title={title}/>}
			<IVComponent />
			<Route path={localUrl} exact component={HelpComponent}/>
		</Card>
	)
}
CardPlot.propTypes={
    Algorithm:PropTypes.shape({
        IV:PropTypes.func.isRequired //React component
    }).isRequired,
    HelpComponent:PropTypes.func.isRequired,
    url:PropTypes.string.isRequired,
    match:PropTypes.shape({
        params:PropTypes.object
    }),
    title:PropTypes.string.isRequired
}

const mapStateToProps=(state, {model})=>({
	parameters:state[model+parameters]
})

export default connect(mapStateToProps)(CardPlot)