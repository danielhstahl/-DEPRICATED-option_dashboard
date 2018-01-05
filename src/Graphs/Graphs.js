import React from 'react'
import PropTypes from 'prop-types'
import { 
    VictoryLine, 
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryLegend,
    VictoryVoronoiContainer
} from 'victory'

const callStyle={data:{stroke:"blue"}}
const putStyle={data:{stroke:"red"}}
const legendOption=[{
    name:"Call",
    symbol: { fill: "blue", type: "circle" }
},{
    name:"Put",
    symbol: { fill: "red", type: "circle" }
}]
const optionLabelFn=label=>d=>`Price ${d.y} at ${label} ${d.x}`
const ivLabelFn=label=>d=>`Volatility ${d.y} at ${label} ${d.x}`
const axisStyleOption={axisLabel: {padding: 30} }
const axisStyleIV={axisLabel: {padding: 40} }
const domainPadding=25
export const OptionCurves=({callData, putData, title, label})=>(
    <VictoryChart 
        domainPadding={domainPadding} 
        containerComponent={<VictoryVoronoiContainer labels={optionLabelFn(label)}/>}
    >
        <VictoryLegend x={50} y={50}
            orientation="vertical"
            gutter={20}
            data={legendOption}
        />
        
        <VictoryLabel x={120} y={50}
            text={title}
        />
        <VictoryLine
            style={callStyle}
            interpolation="natural"
            data={callData}
            x="atPoint"
            y="value"
        />
        <VictoryLine
            style={putStyle}
            interpolation="natural"
            data={putData}
            x="atPoint"
            y="value"
        />
        <VictoryAxis 
            dependentAxis
            style={axisStyleOption}
            label="Option Price"
        />
        <VictoryAxis
            label={label}
        />
    </VictoryChart>
)
OptionCurves.propTypes={
    callData:PropTypes.arrayOf(PropTypes.shape({
        value:PropTypes.number.isRequired,
        atPoint:PropTypes.number.isRequired
    })),
    putData:PropTypes.arrayOf(PropTypes.shape({
        value:PropTypes.number.isRequired,
        atPoint:PropTypes.number.isRequired
    })),
    label:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired
}
export const IVCurves=({callData, label, title})=>(
    <VictoryChart 
        domainPadding={domainPadding}
        containerComponent={<VictoryVoronoiContainer labels={ivLabelFn(label)}/>}
    >
        <VictoryLabel x={120} y={50}
            text={title}
        />
        <VictoryLine
            interpolation="natural"
            data={callData}
            x="atPoint"
            y="iv"
        />
        <VictoryAxis 
            dependentAxis
            style={axisStyleIV}
            label="Implied Volatility"
        />
        <VictoryAxis
            label={label}
        />
    </VictoryChart>
)
IVCurves.propTypes={
    callData:PropTypes.arrayOf(PropTypes.shape({
        iv:PropTypes.number.isRequired,
        atPoint:PropTypes.number.isRequired
    })),
    title:PropTypes.string.isRequired,
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
    <VictoryChart domainPadding={domainPadding}>
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