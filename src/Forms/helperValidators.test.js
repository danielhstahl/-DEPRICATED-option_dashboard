import {
    createBounds,
    isNotComplete,
    rangeValidator
} from './helperValidators'
describe('createBounds', ()=>{
    it('correctly returns true for numeric and in bounds', ()=>{
        expect(createBounds(0, 1).fn(.5)).toEqual(.5)
        
    })
    it('correctly returns false for numeric and out of bounds', ()=>{
        expect(createBounds(0, 1).fn(1.5)).toEqual(false)
    })
    it('correctly returns false for non numeric', ()=>{
        expect(createBounds(0, 1).fn('hello')).toEqual(false)
    })
})
describe('isNotComplete', ()=>{
    it('returns false when no periods', ()=>{
        expect(isNotComplete('hello')).toEqual(false)
    })
    it('returns true with empty string', ()=>{
        expect(isNotComplete('')).toEqual(true)
    })
    it('returns false with period not at end', ()=>{
        expect(isNotComplete('4.4')).toEqual(false)
    })
    it('returns false with multiple periods', ()=>{
        expect(isNotComplete('4.4.')).toEqual(false)
    })
    it('returns true with string with single period at end', ()=>{
        expect(isNotComplete('5.')).toEqual(true)
    })
})
describe('rangeValidator', ()=>{
    it('returns false when x is a legit string', ()=>{
        expect(rangeValidator(0, 1)('hello')).toEqual(false)
    })
    it('returns false when x is a number that falls outside of range', ()=>{
        expect(rangeValidator(0, 1)('1.4')).toEqual(false)
    })
    it('returns x when x is a number that falls in the range', ()=>{
        expect(rangeValidator(0, 1)('.4')).toEqual(.4)
    })
})