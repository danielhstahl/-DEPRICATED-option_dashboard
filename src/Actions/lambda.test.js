import {
    createUrl,
    baseUrl
} from './lambda'

it('returns correct url with one parameter', ()=>{
    const myParam='myparam'
    const expected=baseUrl+myParam
    expect(createUrl([myParam])).toEqual(expected)
})
it('returns correct url with two parameter', ()=>{
    const myParam1='myparam1'
    const myParam2='myparam2'
    const expected=baseUrl+myParam1+'/'+myParam2
    expect(createUrl([myParam1, myParam2])).toEqual(expected)
})