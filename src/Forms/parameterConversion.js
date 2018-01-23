//see https://github.com/phillyfan1138/CharacteristicFunctions/blob/master/ConversionHestonCF.pdf
export const convertHestonToCustomAda=(c, b)=>c/Math.sqrt(b) //c is vol, b is long run mean
export const convertHestonToCustomSig=b=>Math.sqrt(b) //b is long run mean
export const convertHestonToCustomV0=(v0, b)=>v0/b //v0 is initial value

export const convertCustomToHestonB=sig=>sig*sig
export const convertCustomToHestonC=(ada, sig)=>ada*sig
export const convertCustomToHestonV0=(v0, sig)=>sig*sig*v0


export const convertHestonToCustom=hestonParams=>{
    const {adaV, meanVol, v0}=hestonParams
    return {
        ...hestonParams,
        adaV:convertHestonToCustomAda(adaV, meanVol),
        sigma:convertHestonToCustomSig(meanVol),
        v0:convertHestonToCustomV0(v0, meanVol)
    }
}

export const convertCustomToHeston=customParams=>{
    const {sigma, v0, adaV}=customParams
    return {
        ...customParams,
        meanVol:convertCustomToHestonB(sigma),
        adaV:convertCustomToHestonC(adaV, sigma),
        v0:convertCustomToHestonV0(v0, sigma)
    }
}
/*
export const convertBSToCustom=customParams=>({
    ...customParams,
    C:0.0,
    v0:1.0,
    adaV:0.0
})*/