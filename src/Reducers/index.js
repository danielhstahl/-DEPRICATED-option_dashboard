import optionParameters from './optionParameters'
import formValidation from './formValidation'

import {
    VaR, density, 
    fangoost,
    carrmadan,
    fsts
} from './data'

/**this custom combiner provides the optionParameters to each reducer */
const customCombineReducers=obj=>(state={}, action)=>Object.keys(obj).reduce((aggr, curr)=>({...aggr, [curr]:obj[curr](state[curr], action, state.optionParameters)}), {})

/**Note that each import for the algorithms contains nested properties which must be unnested*/
export default customCombineReducers({
    optionParameters,
    formValidation,
    VaR, density, 
    ...fangoost,
    ...carrmadan,
    ...fsts
})