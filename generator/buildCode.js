const directoryOfModels='./src/Models'
const directoryOfModelSkeleton='./src/modelSkeleton.js'
const fs=require('fs')
const getModelName=file=>file.split('.')[0]
fs.readdir(directoryOfModels, (err, files) => {
    const imports=files.map(file=>`import {model as ${getModelName(file)}} from './Models/${file}'`).join('\n')
    const modelNames=files.map(file=>getModelName(file)).join("','")
    const txtToWrite=`${imports}
export const modelChoices=['${modelNames}']
export const modelMap=[${modelNames}]
export const defaultKey='defVal'//corresponds with default key in the Models folder
export const uBoundKey='uBound' 
export const lBoundKey='lBound'` //corresponds with default key in the Models folder
    fs.writeFile(directoryOfModelSkeleton, txtToWrite, err=>{
        if(err){
            console.log(err)
        }
    })
})