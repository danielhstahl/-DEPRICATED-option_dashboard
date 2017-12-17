import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'


const mapStateToPropsCall=state=>({
    data:state.carrmadancall,
    label:'Strikes'
})
const mapStateToPropsPut=state=>({
    data:state.carrmadanput,
    label:'Strikes'
})


export const IVCarrMadan=connect(
    mapStateToPropsCall
)(IVCurves)

export const CarrMadanCall = connect(
    mapStateToPropsCall,
)(OptionCurves)




export const CarrMadanPut = connect(
    mapStateToPropsPut,
)(OptionCurves)