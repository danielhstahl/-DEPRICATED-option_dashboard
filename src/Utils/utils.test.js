import {
    keepMiddleElements, 
    createArray,
    removeFirstAndLastElement,
    cartesian,
    upperFirstLetter,
    extractDefaultValues
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

describe('upperFirstLetter', ()=>{
    it('makes first letter uppercase when first letter is lower case', ()=>{
        expect(upperFirstLetter('hello')).toEqual('Hello')
    })
    it('returns original string when first letter is already upper case', ()=>{
        expect(upperFirstLetter('Hello')).toEqual('Hello')
    })
})
describe('extractDefaultValues', ()=>{
    it('adds key with default value', ()=>{
        const parameters=[
            {key:'hello', something:'somethingelse1'},
            {key:'world', something:'somethingelse2'},
        ]
        const expected={hello:'somethingelse1', world:'somethingelse2'}
        const defaultKey='something'
        expect(extractDefaultValues(parameters, defaultKey)).toEqual(expected)
    })

})