import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'


const mapStateToProps=state=>({
    callData:state.fsts.call,
    putData:state.fsts.put,
    label:'Asset Prices'
})

export const IVFSTS=connect(
    mapStateToProps
)(IVCurves)

export const FSTS = connect(
    mapStateToProps
)(OptionCurves)
