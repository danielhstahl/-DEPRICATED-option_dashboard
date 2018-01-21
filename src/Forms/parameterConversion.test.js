import {
    convertHestonToCustomAda,
    convertHestonToCustomSig,
    convertHestonToCustomV0,
    convertCustomToHestonB,
    convertCustomToHestonC,
    convertCustomToHestonV0
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