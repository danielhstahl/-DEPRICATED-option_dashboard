import React from 'react'
import { connect } from 'react-redux'
import { validateAll } from '../helperValidators'
import { CommonInputs, CommonCalculatorButton } from '../HelperComponents/CommonInputs'
import {modelObj} from '../../modelSkeleton'
import {getParametersByFeature} from '../../Utils/conversionUtils'
export default ({model})=>[
    <CommonInputs 
        key='variableparameters'
        model={model}
        modelParameters={getParametersByFeature(modelObj[model].parameters, 'variable')}
    />,
    <CommonCalculatorButton
        key='updatebutton'
        model={model}
    />
]
