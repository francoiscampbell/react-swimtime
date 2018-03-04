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

function getSublane(laneProps: LaneProps, sublaneData: SublaneData, key?: number) {
	const {
		start,
		end,
		...rest
	} = sublaneData
	const startPct = (start.getTime() - laneProps.startTime) / laneProps.timeInterval * 100
	const widthPct = (end.getTime() - laneProps.startTime) / laneProps.timeInterval * 100 - startPct

	const sublaneProps = {
		data: rest,
		key,
		renderBar: laneProps.renderBar,
		startPct,
		widthPct,
	}
	if (key === undefined) {
		delete sublaneProps.key
	}
	return (
		<Sublane
			{...sublaneProps}
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