import {Component} from 'react'
import { connect } from 'react-redux'

import { getCalculation, getRangeData } from './Actions/lambda'
import { generateConvertSpecificToAdvanced, getCalculationParameters } from './Utils/conversionUtils'

class LoadData extends Component{
    componentDidMount() {
        this.props.onLoad( this.props.model, this.props.parameters)
    }
    render(){
        return null
    }
}

const mapStateToProps=({form})=>({
    parameters:form
})
const mapDispatchToProps =dispatch=>({
    onLoad:(model, form)=>{
        getCalculation(
            generateConvertSpecificToAdvanced(model)(
                getCalculationParameters(form, model)
            ), 
            dispatch
        )
        getRangeData(dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadData)

