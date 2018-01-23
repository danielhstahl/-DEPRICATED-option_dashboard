import { createBounds } from '../Utils/utils'
/*export const rhoOptions=createArray(-.95, .95, .05)
export const uOptions=createArray(5, 10)
export const rOptions=createArray(0, .1, .001)
export const tOptions=createArray(.25, 5, .25)
export const sOptions=createArray(1, 100)
export const speedOptions=createArray(.1, 1, .1)
export const adaOptions=createArray(0, .8, .05)
export const sigmaOptions=createArray(.05, .8, .05)*/
export const rhoBounds=createBounds(-.99, .99)
export const uBounds=createBounds(5, 10)
export const rBounds=createBounds(0, .2)
export const tBounds=createBounds(.25, 5)
export const sBounds=createBounds(1, 200)
export const speedBounds=createBounds(.01, 1)
export const sigmaBounds=createBounds(.05, 2)
export const cBounds=createBounds(0, 2)
export const gBounds=createBounds(.2, 20)
export const mBounds=gBounds
export const yBounds=createBounds(-100, 1.99)

export const gutter=16
export const flexObj={xs:24, md:12}
export const formItemLayoutLabel={
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
}
export const fullWidth={ width: '100%' }