/** This serves as a template for a model plugin. 
*  The parameters with key "constant" will not be 
*  calibrated.  The parameters with key "variable"
*  will be calibrated.  The 'lBound' and 'uBound' 
*  are the upper and lower limits of the variable. 
*  You must specify a function to convert to and 
*  from the baseline model (extended CGMY).  As an 
*  example, see heston.js and 
*  https://github.com/phillyfan1138/CharacteristicFunctions/blob/master/ConversionHestonCF.pdf 
*/ 

export const model={
  "name": "heston",
  "parameters": {
    "numU": {
      "defVal": 6,
      "lBound": 6,
      "uBound": 10,
      "constant": true
    },
    "r": {
      "defVal": 0.03,
      "lBound": 0,
      "uBound": 1,
      "constant": true
    },
    "S0": {
      "defVal": 50,
      "lBound": 1,
      "uBound": 500,
      "constant": true
    },
    "T": {
      "defVal": 1,
      "lBound": 0.25,
      "uBound": 5,
      "constant": true
    },
    "sigma": {
      "defVal": 0.2,
      "lBound": 0.05,
      "uBound": 2,
      "constant": false
    },
    "C": {
      "defVal": 1,
      "lBound": 0,
      "uBound": 2,
      "constant": false
    },
    "G": {
      "defVal": 1.4,
      "lBound": 0.2,
      "uBound": 20,
      "constant": false
    },
    "M": {
      "defVal": 2.5,
      "lBound": 0.2,
      "uBound": 20,
      "constant": false
    },
    "Y": {
      "defVal": 0.6,
      "lBound": -100,
      "uBound": 1.99,
      "constant": false
    },
    "speed": {
      "defVal": 0.4,
      "lBound": 0.01,
      "uBound": 1,
      "constant": false
    },
    "v0": {
      "defVal": 0.95,
      "lBound": 0.2,
      "uBound": 1.8,
      "constant": false
    },
    "adaV": {
      "defVal": 0.2,
      "lBound": 0,
      "uBound": 2,
      "constant": false
    },
    "rho": {
      "defVal": -0.5,
      "lBound": -0.99,
      "uBound": 0.99,
      "constant": false
    }
  },
  "hestonToAdvanced": "put function that takes the parameters above and converts them to the CGMY parameters.  For an example, see ___",
  "advancedToheston": "put function that takes the CGMY parameters and converts them to the parameters above.  For an example, see ___"
}