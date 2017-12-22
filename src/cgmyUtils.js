import gamma from 'gamma'

const divAndY=(x, Y)=>1/Math.pow(x, 2-Y)
const vol=(T, sigma, C, G, M, Y)=>{
    return Math.sqrt(T*(sigma*sigma+C*gamma(2-Y)*(divAndY(G, Y)+divAndY(M, Y))))
}
const upperScalar=1.2
const lowerScalar=2.5
export const getDomain=(params)=>{
    const {T, sigma, C, G, M, Y, S0}=params
    const cgmyVol=vol(T, sigma, C, G, M, Y)
    return {
        upper:S0*Math.exp(cgmyVol*upperScalar),
        lower:S0*Math.exp(-cgmyVol*lowerScalar)
    }
}