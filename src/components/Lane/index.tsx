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

export interface LaneProps {
	laneData: LaneData,
	renderBar: (SublaneData) => new() => React.Component,
	startTime: number
}

const Lane: React.SFC<LaneProps> = props => {
	const laneData = props.laneData
	const sublanes = Array.isArray(laneData) ?
		laneData.map((sublaneData, i) => {
			return (
				<Sublane
					data={sublaneData}
					key={i}
					renderBar={props.renderBar}
					startTime={props.startTime}
				/>
			)	
		}) : (
			<Sublane
				data={laneData}
				renderBar={props.renderBar}
				startTime={props.startTime}
			/>
		)	
	return (
		<LaneContainer>
			{sublanes}
		</LaneContainer>
	)
}

export default Lane