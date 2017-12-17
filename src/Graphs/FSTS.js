import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'

const mapStateToPropsCall=state=>({
    data:state.fstscall,
    label:'Asset Prices'
})
const mapStateToPropsPut=state=>({
    data:state.fstsput,
    label:'Asset Prices'
})


export const IVFSTS=connect(
    mapStateToPropsCall
)(IVCurves)

export const FSTSCall = connect(
    mapStateToPropsCall
)(OptionCurves)

export const FSTSPut = connect(
    mapStateToPropsPut
)(OptionCurves)