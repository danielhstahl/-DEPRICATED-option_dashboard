import {optionParameters, hestonParameters, bsParameters} from './optionParameters'
import {hestonValidation, optionValidation} from './formValidation'

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
    hestonParameters,
    hestonValidation,
    bsParameters,
    optionValidation,
    VaR, density, 
    ...fangoost,
    ...carrmadan,
    ...fsts
})