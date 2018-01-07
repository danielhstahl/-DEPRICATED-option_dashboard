import React from 'react'
import { connect } from 'react-redux'
import { OptionCurves, IVCurves } from './Graphs'
import { upperFirstLetter } from '../utils'
import {
    keySkeleton, optionTypes, 
    sensitivities, algorithms
} from '../appSkeleton'
import { Modal } from 'antd'
import { getUniqueArray } from 'array_utils'
const sensitivityIndex=0
const generateAlgorithmOptionPrices=(keySkeleton, algorithm, Component, initState)=>getUniqueArray(
    keySkeleton[algorithm], 
    sensitivityIndex
).reduce((aggr, [sensitivity])=>({
    ...aggr,
    [sensitivity]:connect(
        state=>optionTypes.reduce((aggrState, optionType)=>({
            ...aggrState,
            [optionType]:state[algorithm+optionType+sensitivity],
            yLabel:upperFirstLetter(sensitivity)
        }), initState)
    )(Component)
}), {})

const [fangOostName, carrMadanName, fstsName]=algorithms
const [callName]=optionTypes
const [priceName]=sensitivities

const generateIVState=(algorithm, Component, initState)=>connect(
    state=>({call:state[algorithm+callName+priceName], ...initState})
)(Component)

const fangOostInitState={
    xLabel:'Strikes',
    title:'Fang-Oosterlee'
}
const carrMadanInitState={
    xLabel:'Strikes',
    title:'Carr-Madan'
}
const fstsInitState={
    xLabel:'Asset Prices',
    title:'Fourier Space Time Step'
}

export const FangOost={
    ...generateAlgorithmOptionPrices(keySkeleton, fangOostName, OptionCurves, fangOostInitState),
    IV:generateIVState(fangOostName, IVCurves, fangOostInitState)
}

export const CarrMadan={
    ...generateAlgorithmOptionPrices(keySkeleton, carrMadanName, OptionCurves, carrMadanInitState),
    IV:generateIVState(carrMadanName, IVCurves, carrMadanInitState)
}

export const FSTS={
    ...generateAlgorithmOptionPrices(keySkeleton, fstsName, OptionCurves, fstsInitState),
    IV:generateIVState(fstsName, IVCurves, fstsInitState)
}


const generateHelp=text=>({history})=>(
    <Modal title="Help" visible={true} onOk={history.goBack} onCancel={history.goBack}>
       {text}
    </Modal>
)
const fangOostHelp=(
    <p>
        Fang and Oosterlee developed an algorithm to price options in their 2007 <a target="_blank" rel="noopener noreferrer" href="http://ta.twi.tudelft.nl/mf/users/oosterle/oosterlee/COS.pdf">paper</a>.  It prices in discrete strikes for a given underlying price.  It has great accuracy and splits the complex and real domain so that only a set number of strikes may be chosen.
    </p>
)
const carrMadanHelp=(
    <p>
        Carr Madan is the standard for FFT based option pricing and is based off the seminal 1999 <a target="_blank" rel="noopener noreferrer" href="https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.348.4044&rep=rep1&type=pdf">paper</a> by Carr and Madan.  It prices in the strike for a given underlying price.  It does not have great accuracy and requires a fine mesh in the complex domain (and a corresponding large mesh in the real domain) to achieve required accuracy.
    </p>
)
const fstsHelp=(
    <p>
        The Fourier Space Time Stepping algorithm was introduced by  <a target="_blank" rel="noopener noreferrer" href="https://tspace.library.utoronto.ca/bitstream/1807/19300/1/Surkov_Vladimir_200911_PhD_Thesis.pdf">Surkov</a>.  It prices in the asset for a given strike price.  It is far more general than either Fang-Oosterlee or Carr-Madan as it is agnostic to the payoff structure.  Since it prices in the stock price, it can also price American options.  However, this also makes it less valuable for calibrating portfolios of options on a single asset.
    </p>
)
export const FangOostHelp=generateHelp(fangOostHelp)
export const CarrMadanHelp=generateHelp(carrMadanHelp)
export const FSTSHelp=generateHelp(fstsHelp)








