import { connect } from 'react-redux'
import {DensityCurves} from './Graphs'

const mapStateToProps = state=>({
    data:state.density,
    VaR:state.VaR.VaR,
    ES:state.VaR.ES
})

export const Density = connect(
  mapStateToProps,
)(DensityCurves)