import {Component} from 'react'
import { connect } from 'react-redux'
import { PARAMETERS } from './Utils/constants'
import { getAllData, getRangeData } from './Actions/lambda'
import { generateSubmitOptions, convertSpecificToAdvanced } from './Utils/conversionUtils'

class LoadData extends Component{
    componentDidMount() {
        this.props.onLoad( this.props.model, this.props.parameters)
    }
    render(){
        return null
    }
}

const mapStateToProps=(state, props)=>({
    parameters:{...state[props.model.name+PARAMETERS], quantile:state.quantile}
})
const mapDispatchToProps =dispatch=>({
    onLoad:(model, parameters)=>{
        generateSubmitOptions(dispatch, convertSpecificToAdvanced(model), getAllData)(parameters)()
        getRangeData(dispatch)()
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadData)

