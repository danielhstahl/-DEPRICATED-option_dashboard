import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'


const mapStateToProps=state=>({
    callData:state.fangoostcall,
    putData:state.fangoostput,
    label:'Strikes',
    title:'Fang-Oosterlee'
})

export const IVFangOost=connect(
    mapStateToProps
)(IVCurves)
export const FangOost = connect(
    mapStateToProps
)(OptionCurves)


