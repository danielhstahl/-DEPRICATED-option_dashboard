import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'


const mapStateToProps=state=>({
    callData:state.carrmadan.call,
    putData:state.carrmadan.put,
    label:'Strikes',
    title:'Carr-Madan'
})


export const IVCarrMadan=connect(
    mapStateToProps
)(IVCurves)

export const CarrMadan = connect(
    mapStateToProps,
)(OptionCurves)

