import {
    keepMiddleElements, 
    createArray,
    handleForm,
    removeFirstAndLastElement,
    cartesian,
    createBounds
} from './utils'

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

it('correctly gets middle elements', ()=>{
    const arr=[1, 2, 3, 4]
    const m1=.3
    const m2=.3
    const expected=[2, 3]
    expect(keepMiddleElements(arr, m1, m2)).toEqual(expected)
})

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

it('correctly returns true for numeric and in bounds', ()=>{
    expect(createBounds(0, 1).fn(.5)).toEqual(.5)
    
})
it('correctly returns false for numeric and out of bounds', ()=>{
    expect(createBounds(0, 1).fn(1.5)).toEqual(false)
})
it('correctly returns false for non numeric', ()=>{
    expect(createBounds(0, 1).fn('hello')).toEqual(false)
})
