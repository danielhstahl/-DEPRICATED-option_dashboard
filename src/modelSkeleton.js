import {model as advanced} from './Models/advanced.js'
import {model as bs} from './Models/bs.js'
import {model as heston} from './Models/heston.js'
export const modelMap=[advanced,bs,heston]
export const modelObj=modelMap.reduce((aggr, curr)=>({...aggr, [curr.name]:curr}))
export const defaultKey='defVal'//corresponds with default key in the Models folder
export const uBoundKey='uBound' 
export const lBoundKey='lBound'