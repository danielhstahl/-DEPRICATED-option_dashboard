import { connect } from 'react-redux'
import {DensityCurves} from './Graphs'

const mapStateToProps =({graph})=>({
  ...graph.riskMetrics,
  density:graph.density
})
export const Density = connect(
  mapStateToProps,
)(DensityCurves)