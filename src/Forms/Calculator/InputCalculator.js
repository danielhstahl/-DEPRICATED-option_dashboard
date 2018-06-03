import React from 'react'
import { CommonInputs, CommonCalculatorButton } from '../HelperComponents/CommonInputs'
import {getParametersByFeature} from '../../Utils/conversionUtils'
export default ({model})=>[
    <CommonInputs 
        key='variableparameters'
        model={model}
        modelParameters={getParametersByFeature(model.parameters, 'variable')}
    />,
    <CommonCalculatorButton
        key='updatebutton'
        model={model}
    />
]
