/** This serves as a template for a model plugin. 
*  The parameters with feature 'static' will be used 
*  but won't be calibrated.  Feature 'variable' will
*  be calibrated.  Feature 'constant' wont' be used
*  or calibrated.  The 'lBound' and 'uBound' 
*  are the upper and lower limits of the variable. 
*  You must specify a function to convert to and 
*  from the baseline model (extended CGMY).  To 
*  convert from baseline to CGMY, you must have the
*  variable parameters in a "variable" sub-object.
*  As an example, see heston.js and 
*  https://github.com/phillyfan1138/CharacteristicFunctions/blob/master/ConversionHestonCF.pdf 
*/ 

export const model={
  "name": "advanced",
  "label": "Advanced",
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
      "toolTip": "This is the volatility of the diffusion component of the (extended) CGMY process",
      "feature": "variable"
    },
    {
      "defVal": -.05,
      "key": "muJ",
      "label": "Mean Jump Size",
      "toolTip": "This is the mean value of the jump component",
      "feature": "variable"
    },
    {
      "defVal": 0.3,
      "key": "sigJ",
      "label": "Volatility of Jump",
      "toolTip": "This is the volatility of the jump component",
      "feature": "variable"
    },
    {
      "defVal": 0.2,
      "key": "lambda",
      "label": "Lambda",
      "toolTip": "This is the frequency of jumps",
      "feature": "variable"
    },
    {
      "defVal": 0.4,
      "key": "speed",
      "label": "Speed",
      "toolTip": "Speed of mean reversion of time change",
      "feature": "variable"
    },
    {
      "defVal": 0.95,
      "key": "v0",
      "label": "V0",
      "toolTip": "This is the current value of the variance process",
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
  "advancedToAdvanced": parameters=>parameters,
  "advancedToadvanced": parameters=>parameters
}