const cliArgs=process.argv
const fs=require('fs')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const modelFolder='./src/Models'

const defaultWrite=name=>({
    name,
    parameters:{
        numU:{
            defVal:6,
            lBound:6,
            uBound:10,
            constant:true
        },
        r:{
            defVal:.03,
            lBound:0,
            uBound:1,
            constant:true
        },
        S0:{
            defVal:50,
            lBound:1,
            uBound:500,
            constant:true
        },
        T:{
            defVal:1,
            lBound:.25,
            uBound:5,
            constant:true
        },
        sigma:{
            defVal:.2,
            lBound:.05,
            uBound:2,
            constant:false
        },
        C:{
            defVal:1.0,
            lBound:0,
            uBound:2,
            constant:false
        },
        G:{
            defVal:1.4,
            lBound:.2,
            uBound:20,
            constant:false
        },
        M:{
            defVal:2.5,
            lBound:.2,
            uBound:20,
            constant:false
        },
        Y:{
            defVal:.6,
            lBound:-100,
            uBound:1.99,
            constant:false
        },
        speed:{
            defVal:.4,
            lBound:.01,
            uBound:1,
            constant:false
        },
        v0:{
            defVal:.95,
            lBound:.2,
            uBound:1.8,
            constant:false
        },
        adaV:{
            defVal:.2,
            lBound:0,
            uBound:2,
            constant:false
        },
        rho:{
            defVal:-.5,
            lBound:-.99,
            uBound:.99,
            constant:false
        }
    },
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
            rl.close()
            answer==='y'?resolve(true):resolve(false)
        })
    })
}
const getCommentsTopLine=(bodyAsString)=>{
    const description=`/** This serves as a template for a model plugin. 
*  The parameters with key "constant" will not be 
*  calibrated.  The parameters with key "variable"
*  will be calibrated.  The 'lBound' and 'uBound' 
*  are the upper and lower limits of the variable. 
*  You must specify a function to convert to and 
*  from the baseline model (extended CGMY).  As an 
*  example, see heston.js and 
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
    return writeFile(getPath(getModelName()), getCommentsTopLine(JSON.stringify(defaultWrite(getModelName()), null, 2)))
}).then(()=>{
    return writeToDoGenerator(getPath(getModelName()))
}).catch(err=>{
    console.log(err)
})