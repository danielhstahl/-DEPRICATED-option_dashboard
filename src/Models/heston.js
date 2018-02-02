/** This serves as a template for a model plugin. 
*  The parameters with feature 'static' will be used 
*  but won't be calibrated.  Feature 'variable' will
*  be calibrated.  Feature 'constant' wont' be used
*  or calibrated.  The 'lBound' and 'uBound' 
*  are the upper and lower limits of the variable. 
*  You must specify a function to convert to and 
*  from the baseline model (extended CGMY).  As an 
*  example, see heston.js and 
*  https://github.com/phillyfan1138/CharacteristicFunctions/blob/master/ConversionHestonCF.pdf 
*/ 
export const convertHestonToCustomAda=(c, b)=>c/Math.sqrt(b) //c is vol, b is long run mean
export const convertHestonToCustomSig=b=>Math.sqrt(b) //b is long run mean
export const convertHestonToCustomV0=(v0, b)=>v0/b //v0 is initial value

export const convertCustomToHestonB=sig=>sig*sig
export const convertCustomToHestonC=(ada, sig)=>ada*sig
export const convertCustomToHestonV0=(v0, sig)=>sig*sig*v0
export const model={
  "name": "heston",
  "label": "Heston",
  "parameters": [
    {
      "defVal": 6,
      "key": "numU",
      "lBound": 6,
      "uBound": 10,
      "label": "Discrete Steps",
      "toolTip": "This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take.",
      "feature": "static"
    },
    {
      "defVal": 0.03,
      "key": "r",
      "lBound": 0,
      "uBound": 1,
      "label": "Rate",
      "toolTip": "Risk free interest rate",
      "feature": "static"
    },
    {
      "defVal": 50,
      "key": "S0",
      "lBound": 1,
      "uBound": 500,
      "label": "S or K",
      "toolTip": "For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike",
      "feature": "static"
    },
    {
      "defVal": 1,
      "key": "T",
      "lBound": 0.25,
      "uBound": 5,
      "label": "T",
      "toolTip": "Time till maturity",
      "feature": "static"
    },
    {
      "defVal": 0.2,
      "lBound": 0.05,
      "key": "sigma",
      "uBound": 2,
      "label": "Volatility",
      "toolTip": "This is the volatility of the diffusion component of the (extended) CGMY process",
      "feature": "constant"
    },
    {
      "defVal": 0,
      "lBound": 0,
      "uBound": 2,
      "key": "C",
      "label": "C",
      "toolTip": "This is the C in CGMY",
      "feature": "constant"
    },
    {
      "defVal": 1.4,
      "lBound": 0.2,
      "uBound": 20,
      "key": "G",
      "label": "G",
      "toolTip": "This is the G in CGMY",
      "feature": "constant"
    },
    {
      "defVal": 2.5,
      "key": "M",
      "lBound": 0.2,
      "uBound": 20,
      "label": "M",
      "toolTip": "This is the M in CGMY",
      "feature": "constant"
    },
    {
      "defVal": 0.6,
      "key": "Y",
      "lBound": -100,
      "uBound": 1.99,
      "label": "Y",
      "toolTip": "This is the Y in CGMY",
      "feature": "constant"
    },
    {
      "defVal": 0.4,
      "lBound": 0.01,
      "uBound": 1,
      "key": "speed",
      "label": "Speed",
      "toolTip": "Speed of mean reversion of time change",
      "feature": "variable"
    },
    {
      "defVal": 0.04,
      "key": "v0",
      "lBound": 0.01,
      "label": "V0",
      "toolTip": "This is the current value of the variance process",
      "uBound": 1,
      "feature": "variable"
    },
    {
      "defVal": 0.04,
      "key": "meanVol",
      "lBound": 0.01,
      "label": "Average Vol",
      "toolTip": "This is the average value of the variance process",
      "uBound": 1,
      "feature": "variable"
    },
    {
      "defVal": 0.2,
      "key": "adaV",
      "lBound": 0,
      "label": "Vol of Vol",
      "toolTip": "This is the volatility of the variance process",
      "uBound": 2,
      "feature": "variable"
    },
    {
      "defVal": -0.5,
      "lBound": -0.99,
      "uBound": 0.99,
      "key": "rho",
      "label": "Rho",
      "toolTip": "Correlation between asset and variance",
      "feature": "variable"
    }
  ],
  "hestonToAdvanced": hestonParams=>{
    const {adaV, meanVol, v0, rho, speed, ...rest}=hestonParams
    return {
        ...rest,
        variable:{
          adaV:convertHestonToCustomAda(adaV, meanVol),
          sigma:convertHestonToCustomSig(meanVol),
          v0:convertHestonToCustomV0(v0, meanVol),
          rho,
          speed
        }
    }
  },
  "advancedToheston": customParams=>{
    const {sigma, v0, adaV, ...rest}=customParams
    return {
        ...rest,
        meanVol:convertCustomToHestonB(sigma),
        adaV:convertCustomToHestonC(adaV, sigma),
        v0:convertCustomToHestonV0(v0, sigma)
    }
  }
}