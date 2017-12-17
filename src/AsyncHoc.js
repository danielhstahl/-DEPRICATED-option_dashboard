import {Component} from 'react'
import { connect } from 'react-redux'
import {getAllData} from './Actions/lambda'
class AsyncHoc extends Component{
    componentDidMount() {
        this.props.onLoad(this.props.optionParams)
    }
    render(){
        return null
    }
}

const mapStateToProps=state=>({
    optionParams:state.optionParameters
})
const mapDispatchToProps =dispatch=>({
    onLoad:(optionParams)=>{
        getAllData(optionParams, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncHoc)

