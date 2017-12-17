import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'

const mapStateToPropsCall=state=>({
    data:state.fangoostcall,
    label:'Strikes'
})
const mapStateToPropsPut=state=>({
    data:state.fangoostput,
    label:'Strikes'
})

export const IVFangOost=connect(
    mapStateToPropsCall
)(IVCurves)
export const FangOostCall = connect(
    mapStateToPropsCall
)(OptionCurves)
export const FangOostPut = connect(
    mapStateToPropsPut
)(OptionCurves)

