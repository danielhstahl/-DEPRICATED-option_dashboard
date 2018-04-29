const vol=(T, sigma, lambda, muJ, sigJ)=>{
    return Math.sqrt(T*(sigma*sigma+lambda*(muJ*muJ+sigJ*sigJ)))
}
const upperScalar=1.2
const lowerScalar=2.0
export const getDomain=({T, sigma, lambda, muJ, sigJ, S0, r})=>{
    const mertonVol=vol(T, sigma, lambda, muJ, sigJ)
    const expReturn=r*T
    return {
        upper:S0*Math.exp(expReturn+mertonVol*upperScalar),
        lower:S0*Math.exp(expReturn-mertonVol*lowerScalar)
    }
}