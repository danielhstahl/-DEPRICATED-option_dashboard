import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row } from 'antd'

/**Helpers and constants */
import { createBounds } from './helperValidators'
import { 
    generateSubmitOptions, 
    generateConvertSpecificToAdvanced, 
    generateCalibrationOptions
} from '../Utils/conversionUtils'
import { modelObj } from '../modelSkeleton'
import { gutter } from './globalOptions'
import {PARAMETERS, NOTIFY, VALIDATION} from '../Utils/constants'
import {getParametersByFeature} from '../Utils/conversionUtils'

/**Actions */
import { getCalibration, getAllData } from '../Actions/lambda'
import updateParameters from '../Actions/parameters'

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
            modelParameters={getParametersByFeature(modelObj[model].parameters, 'static')}
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