import * as React from 'react'
import styled from 'styled-components'

import Sublane from '../Sublane'
import { 
	LaneData,
	SublaneData
} from '../../types/LaneData'

const LaneContainer = styled.div`
	border-bottom: 1px solid;

	&:last-child {
		border-bottom: none;		
	}    
`

function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max)
}

function getSublane(laneProps: LaneProps, sublaneData: SublaneData, key?: number) {
	const {
		start,
		end,
		...rest
	} = sublaneData
	const startRatio = (start.getTime() - laneProps.startTime) / laneProps.timeInterval
	const startPct = clamp(startRatio * 100, 0, 100)
	const widthRatio = (end.getTime() - laneProps.startTime) / laneProps.timeInterval - startRatio
	const widthPct = clamp(widthRatio * 100, 0, 100 - startPct)

	return (
		<Sublane
			data={rest}
			key={key}
			renderBar={laneProps.renderBar}
			startPct={startPct}
			widthPct={widthPct}
		/>
	)
}

export interface LaneProps {
	laneData: LaneData,
	renderBar: (SublaneData) => new() => React.Component,
	startTime: number,
	timeInterval: number,
}

const Lane: React.SFC<LaneProps> = props => {
	const laneData = props.laneData
	const sublanes = Array.isArray(laneData) ?
		laneData.map((sublaneData, i) => getSublane(props, sublaneData, i)) : 
		getSublane(props, laneData)	
	return (
		<LaneContainer>
			{sublanes}
		</LaneContainer>
	)
}

export default Lane