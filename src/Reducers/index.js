import { combineReducers } from 'redux'

import form from '../Forms/formReducer'
import graph from '../Graphs/graphReducer' /*{
    VaR, density, 
    fangoost,
    carrmadan,
    fsts, spline, 
}*/
/**Note that each import for the algorithms contains nested properties which must be unnested*/
export default combineReducers({
    form,
    graph
})