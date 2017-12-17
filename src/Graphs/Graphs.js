import React from 'react'
import PropTypes from 'prop-types'
import { 
    VictoryLine, 
    VictoryChart,
    VictoryAxis,
    VictoryLabel
} from 'victory'


export const OptionCurves=({data, label})=>(
    <VictoryChart domainPadding={20}>
        <VictoryLine
            interpolation="natural"
            data={data}
            x="atPoint"
            y="value"
        />
        <VictoryAxis 
            dependentAxis
            label="Option Price"
        />
        <VictoryAxis
            label={label}
        />
    </VictoryChart>
)
OptionCurves.propTypes={
    data:PropTypes.arrayOf(PropTypes.shape({
        value:PropTypes.number.isRequired,
        atPoint:PropTypes.number.isRequired
    })),
    label:PropTypes.string.isRequired
}
export const IVCurves=({data, label})=>{
    console.log("IVCurves")
    return (
    <VictoryChart domainPadding={20}>
        <VictoryLine
            interpolation="natural"
            data={data}
            x="atPoint"
            y="iv"
        />
        <VictoryAxis 
            dependentAxis
            label="Implied Volatility"
        />
        <VictoryAxis
            label={label}
        />
    </VictoryChart>
)
}
IVCurves.propTypes={
    data:PropTypes.arrayOf(PropTypes.shape({
        iv:PropTypes.number.isRequired,
        atPoint:PropTypes.number.isRequired
    })),
    label:PropTypes.string.isRequired
}
const getMax=(data, key)=>data.reduce((aggr, cur)=>{
    return cur[key]>aggr?cur[key]:aggr
}, 0)
const getVar=(VaR, data)=>[
    {
        x:-VaR,
        y:0
    },
    {
        x:-VaR,
        y:getMax(data, "value")
    }
]
export const DensityCurves=({data, VaR, ES})=>(
    <VictoryChart domainPadding={20}>
        <VictoryLabel x={25} y={24}
            text={`Value at Risk: ${VaR}`}
        />
        <VictoryLabel x={25} y={48}
            text={`Expected Shortfall: ${ES}`}
        />
        <VictoryLine
            interpolation="natural"
            data={data}
            x="atPoint"
            y="value"
        />
        <VictoryLine
            data={getVar(VaR, data)}
        />
        <VictoryAxis 
            label="Log Asset Price"
        />
    </VictoryChart>
)
DensityCurves.propTypes={
    data:PropTypes.arrayOf(PropTypes.shape({
        value:PropTypes.number.isRequired,
        atPoint:PropTypes.number.isRequired
    })),
    VaR:PropTypes.number,
    ES:PropTypes.number
}