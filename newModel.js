const cliArgs=process.argv
const fs=require('fs')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const modelFolder='./src/Models'

const defaultWrite=(name, label)=>({
    name,
    label,
    parameters:[
        {
            defVal:6,
            key:'numU',
            lBound:6,
            uBound:10,
            label:"Discrete Steps",
            toolTip:"This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take.",
            feature:'static'
        },
        {
            defVal:.03,
            key:'r',
            lBound:0,
            uBound:1,
            label:"Rate",
            toolTip:"Risk free interest rate",
            feature:'static'
        },
        {
            defVal:50,
            key:'S0',
            lBound:1,
            uBound:500,
            label:"S or K",
            toolTip:"For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike",
            feature:'static'
        },
        {
            defVal:1,
            key:'T',
            lBound:.25,
            uBound:5,
            label:"T",
            toolTip:"Time till maturity",
            feature:'static'
        },
        {
            defVal:.2,
            lBound:.05,
            key:'sigma',
            uBound:2,
            label:"Volatility",
            toolTip:"This is the volatility of the diffusion component of the (extended) CGMY process",
            feature:'variable'
        },
        {
            defVal:1.0,
            lBound:0,
            uBound:2,
            key:'C',
            label:"C",
            toolTip:"This is the C in CGMY",
            feature:'variable'
        },
        {
            defVal:1.4,
            lBound:.2,
            uBound:20,
            key:'G',
            label:"G",
            toolTip:"This is the G in CGMY",
            feature:'variable'
        },
        {
            defVal:2.5,
            key:'M',
            lBound:.2,
            uBound:20,
            label:"M",
            toolTip:"This is the M in CGMY",
            feature:'variable'
        },
        {
            defVal:.6,
            key:'Y',
            lBound:-100,
            uBound:1.99,
            label:"Y",
            toolTip:"This is the Y in CGMY",
            feature:'variable'
        },
        {
            defVal:.4,
            lBound:.01,
            uBound:1,
            key:'speed',
            label:"Speed",
            toolTip:"Speed of mean reversion of time change",
            feature:'variable'
        },
        {
            defVal:.95,
            key:'v0',
            lBound:.2,
            label:"V0",
            toolTip:"This is the current value of the variance process",
            uBound:1.8,
            feature:'variable'
        },
        {
            defVal:.2,
            key:'adaV',
            lBound:0,
            label:"Vol of Vol",
            toolTip:"This is the volatility of the variance process",
            uBound:2,
            feature:'variable'
        },
        {
            defVal:-.5,
            lBound:-.99,
            uBound:.99,
            key:'rho',
            label:"Rho",
            toolTip:"Correlation between asset and variance",
            feature:'variable'
        }
    ],
    [name+'ToAdvanced']:'put function that takes the parameters above and converts them to the CGMY parameters.  For an example, see ___',
    ['advancedTo'+name]:'put function that takes the CGMY parameters and converts them to the parameters above.  For an example, see ___'
})

const checkArgs=()=>{
    return new Promise((resolve, reject)=>{
        if(cliArgs.length===2){
            reject(new Error("Requires model name.  Try `node newModel [modelName]`"))
        }
        resolve(true)
    })
}

const getModelName=()=>{
    return cliArgs[2]
}
const getPath=(name)=>modelFolder+'/'+name+'.js'

const checkExistance=(name)=>{  
    return new Promise((resolve, reject)=>{
        fs.stat(getPath(name), (err, result)=>{
            err?resolve(false):resolve(true)
        })
    })
}
const overWrite=(fileName)=>{
    return new Promise((resolve, reject)=>{
        rl.question(`${fileName} already exists! Overwrite? (y/n)`, answer=>{
            answer==='y'?resolve(true):resolve(false)
        })
    })
}

const getLabel=()=>{
    return new Promise((resolve, reject)=>{
        rl.question('Enter a display name for the model: ', answer=>{
            resolve(answer)
        })
    })
}

const getCommentsTopLine=(bodyAsString)=>{
    const description=`/** This serves as a template for a model plugin. 
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
*/ \n
export const model=`
    return description+bodyAsString
}
const writeFile=(fileName, content)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(fileName, content, err=>{
            err?reject(err):resolve(true)
        })
    })
}
const writeToDoGenerator=(fileName)=>{
    const message=`Skeleton of model has been generated at ${fileName}.  You must edit this including putting custom variables and a converter back and forth from CGMY models`
    return console.log(message)
}

checkArgs().then(()=>{
    return checkExistance(getModelName())
}).then(exists=>{
    return exists?overWrite(getPath(getModelName())):true
}).then(shouldWrite=>{
    if(!shouldWrite){
        throw new Error('Require a new name!')
    }
    return getLabel()
}).then(label=>{
    return writeFile(getPath(getModelName()), getCommentsTopLine(JSON.stringify(defaultWrite(getModelName(), label), null, 2)))
}).then(()=>{
    rl.close()
    return writeToDoGenerator(getPath(getModelName()))
}).catch(err=>{
    console.log(err)
})