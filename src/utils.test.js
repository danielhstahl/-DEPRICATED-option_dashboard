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