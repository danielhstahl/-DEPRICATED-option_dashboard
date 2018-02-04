import {CardPlot, switchTheta} from './CardPlot'
describe('switchTheta', ()=>{
    it('returns false with no component', ()=>{
        expect(switchTheta(-1, 1, 'theta', null)).toEqual(false)
    })
    it('returns false with component and not theta', ()=>{
        expect(switchTheta(1, 1.5, 'delta', "something")).toEqual(false)
    })
    it('returns true with component and theta and positive adav', ()=>{
        expect(switchTheta(1, 1, 'theta', "something")).toEqual("something")
    })
    it('returns true with component and theta and non-1 v0', ()=>{
        expect(switchTheta(-1, 1.5, 'theta', "something")).toEqual("something")
    })
})