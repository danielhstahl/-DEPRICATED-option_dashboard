import React from 'react'
import PropTypes from 'prop-types'
import { 
    VictoryLine, 
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryScatter,
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
const splineLabelFn=label=>d=>`Transformed Option Price ${d.y} at ${label} ${d.x}`
const ivLabelFn=label=>d=>`Volatility ${d.y} at ${label} ${d.x}`
const axisStyleOption={ axisLabel: { padding: 30} }
const axisStyleIV={ axisLabel: { padding: 40} }
const domainPadding=25
export const OptionCurves=({call, put, title, xLabel, yLabel, marketData})=>(
    <VictoryChart 
        domainPadding={domainPadding} 
        containerComponent={<VictoryVoronoiContainer labels={optionLabelFn(xLabel)}/>}
    >
        <VictoryLegend x={50} y={50}
            orientation="vertical"
            gutter={20}
            data={legendOption}
        />
        
        <VictoryLabel x={120} y={50}
            text={title}
        />
        {marketData?<VictoryScatter data={marketData} x="strike" y="price"/>:null}
        <VictoryLine
            style={callStyle}
            interpolation="natural"
            data={call}
            x="atPoint"
            y="value"
        />
        <VictoryLine
            style={putStyle}
            interpolation="natural"
            data={put}
            x="atPoint"
            y="value"
        />
        <VictoryAxis 
            dependentAxis
            style={axisStyleOption}
            label={yLabel}
        />
        <VictoryAxis
            label={xLabel}
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
    xLabel:PropTypes.string.isRequired,
    yLabel:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired
}
export const IVCurves=({put, xLabel, title})=>(
    <VictoryChart 
        domainPadding={domainPadding}
        containerComponent={<VictoryVoronoiContainer labels={ivLabelFn(xLabel)}/>}
    >
        <VictoryLabel x={120} y={50}
            text={title}
        />
        <VictoryLine
            interpolation="natural"
            data={put}
            x="atPoint"
            y="iv"
        />
        <VictoryAxis 
            dependentAxis
            style={axisStyleIV}
            label="Implied Volatility"
        />
        <VictoryAxis
            label={xLabel}
        />
    </VictoryChart>
)
IVCurves.propTypes={
    put:PropTypes.arrayOf(PropTypes.shape({
        iv:PropTypes.number.isRequired,
        atPoint:PropTypes.number.isRequired
    })),
    title:PropTypes.string.isRequired,
    xLabel:PropTypes.string.isRequired
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


export const SplineCurves=({spline, title, xLabel, yLabel})=>(
    <VictoryChart 
        domainPadding={domainPadding} 
        containerComponent={<VictoryVoronoiContainer labels={splineLabelFn(xLabel)}/>}
    >
        <VictoryLegend x={50} y={50}
            orientation="vertical"
            gutter={20}
            data={legendOption}
        />
        <VictoryLabel x={120} y={50}
            text={title}
        />
        <VictoryScatter data={spline.points} x="logStrike" y="transformedOption"/>
        <VictoryLine
            style={callStyle}
            interpolation="natural"
            data={spline.curve}
            x="logStrike"
            y="transformedOption"
        />
        <VictoryAxis 
            dependentAxis
            style={axisStyleOption}
            label={yLabel}
        />
        <VictoryAxis
            label={xLabel}
        />
    </VictoryChart>
)
SplineCurves.propTypes={
    spline:PropTypes.shape({
        curve:PropTypes.arrayOf(PropTypes.shape({
            logStrike:PropTypes.number.isRequired,
            transformedOption:PropTypes.number.isRequired
        })),
        points:PropTypes.arrayOf(PropTypes.shape({
            logStrike:PropTypes.number.isRequired,
            transformedOption:PropTypes.number.isRequired
        }))
    }),
    title:PropTypes.string.isRequired,
    xLabel:PropTypes.string.isRequired,
    yLabel:PropTypes.string.isRequired,
}