import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'


const mapStateToProps=state=>{
    console.log(state)
    return ({
    callData:state.carrmadan.callDisplay,
    putData:state.carrmadan.putDisplay,
    label:'Strikes',
    title:'Carr-Madan'
})
}


export const IVCarrMadan=connect(
    mapStateToProps
)(IVCurves)

export const CarrMadan = connect(
    mapStateToProps,
)(OptionCurves)

