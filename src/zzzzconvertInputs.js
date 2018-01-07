const convertCustomToHestonB=sigma=>sigma*sigma
const convertCustomToHestonC=(ada, sigma)=>ada*sigma*sigma
const convertCustomToHestonV0=(V0, sigma)=>V0*sigma*sigma

const convertHestonToCustomAda=(c, b)=>c/Math.sqrt(b)
const convertHestonToCustomSig=b=>Math.sqrt(b)
const convertHestonToCustomV0=(v0, b)=>v0/b

export const convertHestonToCustom=(hestonParams, customParams)=>{
    const {adaV, meanVol, v0}=hestonParams
    return {
        ...customParams,
        C:0,
        adaV:convertHestonToCustomAda(adaV, meanVol),
        sigma:convertHestonToCustomSig(meanVol),
        v0:convertHestonToCustomV0(v0, meanVol)
    }
}

export const convertBSToCustom=(customParams)=>({
    ...customParams,
    C:0.0,
    v0:1.0,
    adaV:0.0
})