import { connect } from 'react-redux'
import {DensityCurves} from './Graphs'

const mapStateToProps =({graph})=>{
  console.log(graph)
  return ({
  ...graph.riskMetrics,
  density:graph.density
})
}
export const Density = connect(
  mapStateToProps,
)(DensityCurves)