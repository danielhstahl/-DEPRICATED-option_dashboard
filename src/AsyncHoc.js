import {Component} from 'react'
import { connect } from 'react-redux'
import { parameters } from './Actions/actionDefinitions'
import { getAllData, getRangeData } from './Actions/lambda'
import { generateSubmitOptions, getCGMYFunction } from './Utils/utils'

class AsyncHoc extends Component{
    componentDidMount() {
        this.props.onLoad( this.props.model, this.props.parameters)
    }
    render(){
        return null
    }
}

const mapStateToProps=(state, props)=>({
    parameters:{...state[props.model.name+parameters], quantile:state.quantile}
})
const mapDispatchToProps =dispatch=>({
    onLoad:(model, parameters)=>{
        generateSubmitOptions(dispatch, getCGMYFunction(model), getAllData)(parameters)()
        getRangeData(dispatch)()
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncHoc)

