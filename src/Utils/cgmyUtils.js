import gamma from 'gamma'

const divAndY=(x, Y)=>1/Math.pow(x, 2-Y)
const vol=(T, sigma, C, G, M, Y)=>{
    return Math.sqrt(T*(sigma*sigma+C*gamma(2-Y)*(divAndY(G, Y)+divAndY(M, Y))))
}
const upperScalar=1.2
const lowerScalar=2.0
export const getDomain=params=>{
    const {T, sigma, C, G, M, Y, S0, r}=params
    
    const cgmyVol=vol(T, sigma, C, G, M, Y)
    const expReturn=r*T
    return {
        upper:S0*Math.exp(expReturn+cgmyVol*upperScalar),
        lower:S0*Math.exp(expReturn-cgmyVol*lowerScalar)
    }
}