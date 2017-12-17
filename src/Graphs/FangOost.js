import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'

/*const mapStateToPropsCall=state=>({
    data:state.fangoostcall,
    label:'Strikes'
})
const mapStateToPropsPut=state=>({
    data:state.fangoostput,
    label:'Strikes'
})*/

const mapStateToProps=state=>({
    callData:state.fangoostcall,
    putData:state.fangoostput,
    label:'Strikes'
})
/*const mapStateToPropsPut=state=>({
    data:state.carrmadanput,
    label:'Strikes'
})*/



export const IVFangOost=connect(
    mapStateToProps
)(IVCurves)
export const FangOost = connect(
    mapStateToProps
)(OptionCurves)
/*export const FangOostPut = connect(
    mapStateToPropsPut
)(OptionCurves)*/

