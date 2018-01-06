import React from 'react'
import {Modal} from 'antd'
import { connect } from 'react-redux'
import {OptionCurves, IVCurves} from './Graphs'

export const FSTSHelp=({visible, onOk, onCancel})=>(
    <Modal title="Help" visible={visible} onOk={onOk} onCancel={onCancel}>
       The Fourier Space Time Stepping algorithm was introduced by  <a href="https://tspace.library.utoronto.ca/bitstream/1807/19300/1/Surkov_Vladimir_200911_PhD_Thesis.pdf">Surkov</a>.  It prices in the asset for a given strike price.  It is far more general than either Fang-Oosterlee or Carr-Madan as it is agnostic to the payoff structure.  Since it prices in the stock price, it can also price American options.  However, this also makes it less valuable for calibrating portfolios of options on a single asset.
    </Modal>
)

const mapStateToProps=state=>({
    callData:state.fstscall,
    putData:state.fstsput,
    label:'Asset Prices',
    title:'FSTS'
})

export const IVFSTS=connect(
    mapStateToProps
)(IVCurves)

export const FSTS = connect(
    mapStateToProps
)(OptionCurves)
