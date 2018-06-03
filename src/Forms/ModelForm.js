import React from 'react'
import { Route } from 'react-router-dom'
import { Row } from 'antd'

/**Helpers and constants */
import { gutter } from './globalOptions'
import {getParametersByFeature} from '../Utils/conversionUtils'

/**Components */
import InputSettings from  './Settings/InputSettings'
import InputCalculator from  './Calculator/InputCalculator'
import InputCalibrator from './Calibrator/InputCalibrator'
import { CommonInputs } from './HelperComponents/CommonInputs'

import ShowJson from './ShowJSON/ShowJson'


export default ({model, basePath})=>[
    <Row gutter={gutter} key='inputrow'>
        <CommonInputs 
            model={model}
            modelParameters={getParametersByFeature(model.parameters, 'static')}
        />
        <Route 
            path={`${basePath}/manual`} exact 
            render={()=>(<InputCalculator model={model}/>)}
        />
        <Route 
            path={`${basePath}/calibration`} exact 
            render={()=>(<InputCalibrator model={model}/>)}
        />
        <Route 
            path={`${basePath}/settings`} exact 
            render={()=>(<InputSettings model={model}/>)}
        />
    </Row>,
    <Row key='jsonrow'>
        <ShowJson model={model}/>
    </Row>
]