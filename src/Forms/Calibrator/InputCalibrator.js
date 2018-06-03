import React from 'react'
import PropTypes from 'prop-types'

/**Components */
import {CommonCalibratorButton} from '../HelperComponents/CommonInputs'
import OptionMaturities from './OptionMaturities' 
import OptionPrices from './OptionPrices' 
import OptionMSE from './OptionMSE' 

const InputCalibrator=({
    model
})=>[
    <OptionMaturities key='maturities' model={model}/>,
    <OptionPrices key='optionprices' model={model}/>,
    <CommonCalibratorButton key='calibrate' model={model}/>,
    <OptionMSE key='displayconvergence' model={model}/>
]

InputCalibrator.propTypes={
    model:PropTypes.object.isRequired
}

export default InputCalibrator