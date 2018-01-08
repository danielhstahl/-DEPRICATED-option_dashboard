import { createArray } from '../utils'
export const rhoOptions=createArray(-.95, .95, .05)
export const uOptions=createArray(5, 10)
export const rOptions=createArray(0, .1, .001)
export const tOptions=createArray(.25, 5, .25)
export const sOptions=createArray(1, 100)
export const speedOptions=createArray(.1, 1, .1)
export const adaOptions=createArray(0, .8, .05)
export const sigmaOptions=createArray(.05, .8, .05)
export const gutter=16
export const flexObj={xs:24, md:12}
export const formItemLayoutLabel={
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
}
export const fullWidth={ width: '100%' }