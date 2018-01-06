import {
    resetOptions
} from './lambda'

it('correctly returns only non fangoost', ()=>{
    let myDispatchResults=[]
    resetOptions(res=>myDispatchResults.push(res))
    expect(myDispatchResults.filter(val=>val.type==='UPDATE_CALL_PRICE_FANGOOST')).toEqual([])
})
it('correctly returns call for FSTS', ()=>{
    let myDispatchResults=[]
    resetOptions(res=>myDispatchResults.push(res))
    expect(myDispatchResults.find(val=>val.type==='UPDATE_CALL_PRICE_FSTS')).toEqual({
        type:'UPDATE_CALL_PRICE_FSTS',
        data:[]
    })
})