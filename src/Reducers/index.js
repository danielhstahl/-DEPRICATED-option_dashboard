import {
    customParameters,
    hestonParameters
} from './optionParameters'

import {
    VaR, density, 
    fangoost,
    carrmadan,
    fsts
} from './data'

const customCombineReducers=obj=>(state={}, action)=>Object.keys(obj).reduce((aggr, curr)=>({...aggr, [curr]:obj[curr](state[curr], action, state)}), {})

/**Note that each import for the algorithms contains nested properties which must be unnested*/
export default customCombineReducers({
    customParameters,
    hestonParameters,
    VaR, density, 
    ...fangoost,
    ...carrmadan,
    ...fsts
})