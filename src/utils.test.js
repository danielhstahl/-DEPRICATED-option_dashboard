import {
    keepMiddleElements, 
    createArray,
    handleForm,
    removeFirstAndLastElement,
    filterBasedOffAnotherArray,
    filterTwoArraysSameFn
} from './utils'

it('correctly filters array', ()=>{
    const arr1=[1, 10, 3, 4]
    const arr2=[2, 3, 4, 10]
    const cb=val=>val<10
    const expected1=[1, 3]
    const expected2=[2, 4]
    expect(filterTwoArraysSameFn(arr1, arr2, cb)).toEqual(expected1)
    expect(filterTwoArraysSameFn(arr2, arr1, cb)).toEqual(expected2)
})

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

it('correctly filters based off another array', ()=>{
    const arr2=[5, 2, 3, 4]
    const arr1=[4, 5, 6, 7]
    const cb=val=>val>3
    const expected=[4, 7]
    expect(filterBasedOffAnotherArray(arr1, arr2, cb)).toEqual(expected)
})
