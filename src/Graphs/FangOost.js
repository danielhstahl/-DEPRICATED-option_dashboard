import React from 'react'
import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'
import {Modal} from 'antd'

const mapStateToProps=state=>({
    callData:state.fangoostcall,
    putData:state.fangoostput,
    label:'Strikes',
    title:'Fang-Oosterlee'
})

export const FangOostHelp=({visible, onOk, onCancel})=>(
    <Modal title="Help" visible={visible} onOk={onOk} onCancel={onCancel}>
       Fang and Oosterlee developed an algorithm to price options in their 2007 <a href="http://ta.twi.tudelft.nl/mf/users/oosterle/oosterlee/COS.pdf">paper</a>.  It prices in discrete strikes for a given underlying price.  It has great accuracy and splits the complex and real domain so that only a set number of strikes may be chosen.
    </Modal>
)

export const IVFangOost=connect(
    mapStateToProps
)(IVCurves)
export const FangOost = connect(
    mapStateToProps
)(OptionCurves)


