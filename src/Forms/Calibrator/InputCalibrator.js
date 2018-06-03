import React from 'react'
import { connect } from 'react-redux'
import { Col, Alert } from 'antd'
import PropTypes from 'prop-types'

/**Components */
import {CommonCalibratorButton} from '../HelperComponents/CommonInputs'
import OptionMaturities from './OptionMaturities' 
import OptionPrices from './OptionPrices' 
import OptionMSE from './OptionMSE' 

const InputCalibrator=({
    model
})=>[
    <OptionMaturities key='maturities'/>,
    <OptionPrices key='optionprices' model={model}/>,
    <CommonCalibratorButton key='calibrate' model={model}/>,
    <OptionMSE key='displayconvergence' model={model}/>
]

InputCalibrator.propTypes={
    model:PropTypes.string.isRequired
}

export default InputCalibrator