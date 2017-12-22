import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'


const mapStateToProps=state=>({
    callData:state.carrmadancall,
    putData:state.carrmadanput,
    label:'Strikes',
    title:'Carr-Madan'
})


export const IVCarrMadan=connect(
    mapStateToProps
)(IVCurves)

export const CarrMadan = connect(
    mapStateToProps,
)(OptionCurves)

