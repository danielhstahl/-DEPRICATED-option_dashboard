import {
    convertHestonToCustomAda,
    convertHestonToCustomSig,
    convertHestonToCustomV0,
    convertCustomToHestonB,
    convertCustomToHestonC,
    convertCustomToHestonV0,
    convertCustomToHeston,
    convertHestonToCustom
} from './parameterConversion'

it('correctly inverts back and forth for sigma and b', ()=>{
    const sig=.3
    expect(convertHestonToCustomSig(convertCustomToHestonB(sig))).toEqual(sig)
})
it('correctly inverts back and form for Ada and C', ()=>{
    const sig=.3
    const ada=.04
    expect(convertHestonToCustomAda(
        convertCustomToHestonC(ada, sig), 
        convertCustomToHestonB(sig)
    )).toEqual(ada)
})
it('correctly inverts back and form for V0', ()=>{
    const sig=.3
    const v0=1.05
    expect(convertHestonToCustomV0(
        convertCustomToHestonV0(v0, sig), 
        convertCustomToHestonB(sig)
    )).toEqual(v0)
})
/*
it('correctly inverts back and forth for entire parameters', ()=>{
    const defaultState={
        numU:6,//gets raised to power of 2: 2^numU
        r:.03,
        T:.25,
        S0:50,
        sigma:.2,
        C:1.0,
        G:1.4,
        M:2.5,
        Y:.6,
        speed:.4,
        v0:1.05,
        adaV:.2,
        rho:-.5,
        k:[],
        quantile:.01
    }
    const heston=convertCustomToHeston(defaultState)
    const backToPrevious=convertHestonToCustom(heston, defaultState)
    expect({...defaultState, C:0.0}).toEqual(backToPrevious)
})*/