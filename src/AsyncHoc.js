import {Component} from 'react'
import { connect } from 'react-redux'
import {getAllData} from './Actions/lambda'
class AsyncHoc extends Component{
    componentDidMount() {
        this.props.onLoad(this.props.optionParameters)
    }
    render(){
        return null
    }
}

const mapStateToProps=({optionParameters})=>({optionParameters})
const mapDispatchToProps =dispatch=>({
    onLoad:(optionParameters)=>{
        getAllData(optionParameters, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncHoc)

