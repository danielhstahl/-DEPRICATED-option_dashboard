import {
    keepMiddleElements, 
    createArray,
    handleForm,
    removeFirstAndLastElement,
    cartesian,
    createBounds,
    isNotComplete,
    rangeValidator,
    upperFirstLetter
} from './utils'
describe('createArray', ()=>{
    it('correctly creates array with non-exact parameter', ()=>{
        const init=.001
        const last=.2
        const by=.1
        const expected=[.001, .101]
        expect(createArray(init, last, by).map(val=>val.toFixed(3))).toEqual(expected.map(val=>val.toFixed(3)))
    })

    it('correctly creates array with exact parameters', ()=>{
        const init=.05
        const last=.35
        const by=.1
        const expected=[.05, .15, .25, .35]
        expect(createArray(init, last, by).map(val=>val.toFixed(2))).toEqual(expected.map(val=>val.toFixed(2)))
    })
})
describe('keepMiddleElements', ()=>{
    it('correctly gets middle elements', ()=>{
        const arr=[1, 2, 3, 4]
        const m1=.3
        const m2=.3
        const expected=[2, 3]
        expect(keepMiddleElements(arr, m1, m2)).toEqual(expected)
    })
})
describe('cartesian', ()=>{
    it('correctly joins two arrays', ()=>{
        const arr1=[1, 2, 3]
        const arr2=[4, 5]
        const expected=[[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
        expect(cartesian(arr1, arr2)).toEqual(expected)
    })
    it('correctly joins three arrays', ()=>{
        const arr1=[1, 2]
        const arr2=[3, 4]
        const arr3=[5, 6]
        const expected=[[1, 3, 5], [1, 3, 6], [1, 4, 5], [1, 4, 6], [2, 3, 5], [2, 3, 6], [2, 4, 5], [2, 4, 6]]
        expect(cartesian(arr1, arr2, arr3)).toEqual(expected)
    })
})
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
describe('upperFirstLetter', ()=>{
    it('makes first letter uppercase when first letter is lower case', ()=>{
        expect(upperFirstLetter('hello')).toEqual('Hello')
    })
    it('returns original string when first letter is already upper case', ()=>{
        expect(upperFirstLetter('Hello')).toEqual('Hello')
    })
})