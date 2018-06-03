import {Component} from 'react'
import { connect } from 'react-redux'
import { PARAMETERS } from './Utils/constants'
import { getCalculation, getRangeData } from './Actions/lambda'
import { generateConvertSpecificToAdvanced } from './Utils/conversionUtils'

class LoadData extends Component{
    componentDidMount() {
        this.props.onLoad( this.props.model, this.props.parameters)
    }
    render(){
        return null
    }
}

const mapStateToProps=({form}, props)=>({
    parameters:{...form[props.model.name+PARAMETERS], quantile:form.quantile}
})
const mapDispatchToProps =dispatch=>({
    onLoad:(model, parameters)=>{
        getCalculation(generateConvertSpecificToAdvanced(model)(parameters), dispatch)
        getRangeData(dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadData)

