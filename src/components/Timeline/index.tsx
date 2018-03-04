import * as React from 'react'
import styled from 'styled-components'

import Lane from '../Lane'
import { 
	LaneData, 
	SublaneData
} from '../../types/LaneData'

const TimelineContainer = styled.div`
	overflow: auto;
`

const DateContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

export interface TimelineProps {
	data: LaneData[],
	renderBar: (SublaneData) => new() => React.Component
}

const Timeline: React.SFC<TimelineProps> = props => {
	const currentDate = new Date()
	const currentTime = currentDate.getTime()
	return (
		<React.Fragment>
			<TimelineContainer>
				{props.data.map((laneData, i) => (
					<Lane
						key={i}
						laneData={laneData}
						renderBar={props.renderBar}
						startTime={currentTime}
					/>
				))}
			</TimelineContainer>
			<DateContainer>
				<span>{currentDate.toLocaleString()}</span>
				<span>{new Date(currentTime + 5000000).toLocaleString()}</span>
			</DateContainer>
		</React.Fragment>
	)
}

export default Timeline