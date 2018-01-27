import {
    sensitivities
} from '../appSkeleton'
const [priceName]=sensitivities

import { 
    hasAtLeastIndex, 
    getMarketDataFromStrikeAndPrice, 
    generateMarketData, 
    generateAlgorithmOptionPrices,
    FangOost,
    CarrMadan
} from './Algorithms'
describe('hasAtLeastIndex', ()=>{
    it('returns null when no elements in array', ()=>{
        expect(hasAtLeastIndex(0, [])).toEqual(null)
    })
    it('returns null when 1 elements in array and 1 index', ()=>{
        expect(hasAtLeastIndex(1, [4])).toEqual(null)
    })
    it('returns first element when one elements in array with index 0', ()=>{
        expect(hasAtLeastIndex(0, [5])).toEqual(5)
    })
    it('returns 3rd element when 6 elements in array with index 2', ()=>{
        expect(hasAtLeastIndex(2, [5, 4, 3, 5, 6, 7])).toEqual(3)
    })
})
describe('getMarketDataFromStrikeAndPrice', ()=>{
    it('returns array of strikes and nulls when no prices', ()=>{
        const expected=[{strike:4, price:null}]
        expect(getMarketDataFromStrikeAndPrice([4], [])).toEqual(expected)
    })
    it('returns array of strikes and prices when prices', ()=>{
        const expected=[{strike:4, price:5}]
        expect(getMarketDataFromStrikeAndPrice([4], [5])).toEqual(expected)
    })
    it('returns array of strikes and prices when prices has more', ()=>{
        const expected=[{strike:4, price:5}]
        expect(getMarketDataFromStrikeAndPrice([4], [5, 6])).toEqual(expected)
    })
    it('returns null when no strikes', ()=>{
        expect(getMarketDataFromStrikeAndPrice([], [5])).toEqual(null)
    })
})
describe('generateMarketData', ()=>{
    it('returns null if index is not 0', ()=>{
        expect(generateMarketData('theta', {})).toEqual(null)
    })
    it('returns market data if index is  0', ()=>{
        const expected=[{strike:4, price:5}]
        expect(generateMarketData('price', 
            {
                k:[4],
                prices:[5]
            }
        )).toEqual(expected)
    })
})
describe('generateAlgorithmOptionPrices', ()=>{
    const state={
        calibrateParameters:{
            k:[4],
            prices:[5]
        },
        algocallhello:'value1',
        algoputhello:'value2',
        algocallworld:'value3',
        algoputworld:'value4',
    }
    it('contains correct keys', ()=>{
        const keySkeleton={
            algo:[
                ['hello', 3],
                ['world', 3],
                ['world', 3],
            ]
        }
        const Component=(state)=>state
        const connect=(generateFn)=>{
            
            const newState=generateFn(state)
            return component=>component(newState)
        }
        const result=generateAlgorithmOptionPrices(keySkeleton, 'algo')(connect, Component, {})
        expect(Object.keys(result)).toEqual(['hello', 'world'])
    })
    it('correctly calls market data', ()=>{
        const keySkeleton={
            algo:[
                [priceName, 3],
                ['world', 3],
                ['world', 3],
            ]
        }
        const expected=[{strike:4, price:5}]
        const Component=(newState)=>newState;//expect(newState.marketData).toEqual(expected)
        const connect=(generateFn)=>{
            const newState=generateFn(state)
            return component=>component(newState)
        }
        const result=generateAlgorithmOptionPrices(keySkeleton, 'algo')(connect, Component, {})
        expect(result.price.marketData).toEqual(expected)
        expect(result.world.marketData).toEqual(null)
    })

})