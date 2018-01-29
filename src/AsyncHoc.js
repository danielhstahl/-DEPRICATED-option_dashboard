import {Component} from 'react'
import { connect } from 'react-redux'
import { modelMap } from './modelSkeleton'
import { parameters } from './Actions/actionDefinitions'
import { generateSubmitOptions } from './Utils/utils'

const initModel=modelMap[0]
class AsyncHoc extends Component{
    componentDidMount() {
        this.props.onLoad(this.props.parameters)
    }
    render(){
        return null
    }
}

const mapStateToProps=state=>({
    parameters:state[initModel.name+parameters]
})
const mapDispatchToProps =dispatch=>({
    onLoad:generateSubmitOptions(dispatch, initModel)
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncHoc)

