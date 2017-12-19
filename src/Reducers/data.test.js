import {
    getFilteredOptions
} from './data'

it('correctly filters options', ()=>{
    const options1=[{
        price:60
    },{
        price:50
    },{
        price:40
    },{
        price:30
    },{
        price:20
    },{
        price:10
    }]
    const options2=[{
        price:10
    },{
        price:20
    },{
        price:30
    },{
        price:40
    },{
        price:50
    },{
        price:60
    }]
    const expected={
        putDisplay:[{
            price:40
        },{
            price:30
        }],
        callDisplay:[{
            price:30
        },{
            price:40
        }]
    }
    expect(getFilteredOptions(options1, options2, 50)).toEqual(expected)
})
