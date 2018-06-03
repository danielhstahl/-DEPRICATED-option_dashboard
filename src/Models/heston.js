/** This serves as a template for a model plugin. 
*  The parameters with feature 'static' will be used 
*  but won't be calibrated.  Feature 'variable' will
*  be calibrated.  Feature 'constant' wont' be used
*  or calibrated.  
*  You must specify a function to convert to and 
*  from the baseline model (extended Merton Jump 
*  Diffusion).  To convert from baseline to Merton 
*  Jump Diffusion, you must have the variable
*  parameters in a "variable" sub-object.
*  As an example, see heston.js and 
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
      "defVal": 8,
      "key": "numU",
      "label": "Discrete Steps",
      "toolTip": "This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take.",
      "feature": "static"
    },
    {
      "defVal": 0.03,
      "key": "r",
      "label": "Rate",
      "toolTip": "Risk free interest rate",
      "feature": "static"
    },
    {
      "defVal": 50,
      "key": "S0",
      "label": "S or K",
      "toolTip": "For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike",
      "feature": "static"
    },
    {
      "defVal": 1,
      "key": "T",
      "label": "T",
      "toolTip": "Time till maturity",
      "feature": "static"
    },
    {
      "defVal": 0.2,
      "key": "sigma",
      "label": "Volatility",
      "toolTip": "This is the volatility of the diffusion component of the (extended) Jump Diffusion process",
      "feature": "constant"
    },
    {
      "defVal": 0.2,
      "key": "muJ",
      "label": "Mean Jump Size",
      "toolTip": "This is the mean value of the jump component",
      "feature": "constant"
    },
    {
      "defVal": 0.3,
      "key": "sigJ",
      "label": "Volatility of Jump",
      "toolTip": "This is the volatility of the jump component",
      "feature": "constant"
    },
    {
      "defVal": 1,
      "key": "lambda",
      "label": "Lambda",
      "toolTip": "This is the frequency of jumps",
      "feature": "constant"
    },
    {
      "defVal": 0.4,
      "key": "speed",
      "label": "Speed",
      "toolTip": "Speed of mean reversion of time change",
      "feature": "variable"
    },
    {
      "defVal": 0.04,
      "key": "v0",
      "label": "V0",
      "toolTip": "This is the current value of the variance process",
      "feature": "variable"
    },
    {
      "defVal": 0.04,
      "key": "meanVol",
      "label": "Average Vol",
      "toolTip": "This is the average value of the variance process",
      "feature": "variable"
    },
    {
      "defVal": 0.2,
      "key": "adaV",
      "label": "Vol of Vol",
      "toolTip": "This is the volatility of the variance process",
      "feature": "variable"
    },
    {
      "defVal": -0.5,
      "key": "rho",
      "label": "Rho",
      "toolTip": "Correlation between asset and variance",
      "feature": "variable"
    }
  ],
  "hestonToAdvanced": ({adaV, meanVol, v0, ...rest})=>({
      ...rest,
      adaV:convertHestonToCustomAda(adaV, meanVol),
      sigma:convertHestonToCustomSig(meanVol),
      v0:convertHestonToCustomV0(v0, meanVol)      
  }),
  "advancedToheston": ({sigma, v0, adaV, ...rest})=>({
    ...rest,
    meanVol:convertCustomToHestonB(sigma),
    adaV:convertCustomToHestonC(adaV, sigma),
    v0:convertCustomToHestonV0(v0, sigma)
  })
}