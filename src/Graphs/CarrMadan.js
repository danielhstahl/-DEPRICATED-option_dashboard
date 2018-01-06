import React from 'react'
import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'
import {Modal} from 'antd'

const mapStateToProps=state=>({
    callData:state.carrmadancall,
    putData:state.carrmadanput,
    label:'Strikes',
    title:'Carr-Madan'
})

export const CarrMadanHelp=({visible, onOk, onCancel})=>(
    <Modal title="Help" visible={visible} onOk={onOk} onCancel={onCancel}>
        Carr Madan is the standard for FFT based option pricing and is based off the seminal 1999 <a href="citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.348.4044&rep=rep1&type=pdf">paper</a> by Carr and Madan.  It prices in the strike for a given underlying price.  It does not have great accuracy and requires a fine mesh in the complex domain (and a corresponding large mesh in the real domain) to achieve required accuracy.
    </Modal>
)

export const IVCarrMadan=connect(
    mapStateToProps
)(IVCurves)

export const CarrMadan = connect(
    mapStateToProps,
)(OptionCurves)

