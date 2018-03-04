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
	endDate: Date,
	renderBar: (SublaneData) => new() => React.Component
	startDate: Date
}

const Timeline: React.SFC<TimelineProps> = props => {
	const startTime = props.startDate.getTime()
	const timeInterval = props.endDate.getTime() - startTime
	return (
		<React.Fragment>
			<TimelineContainer>
				{props.data.map((laneData, i) => (
					<Lane
						key={i}
						laneData={laneData}
						renderBar={props.renderBar}
						startTime={startTime}
						timeInterval={timeInterval}
					/>
				))}
			</TimelineContainer>
			<DateContainer>
				<span>{props.startDate.toLocaleString()}</span>
				<span>{props.endDate.toLocaleString()}</span>
			</DateContainer>
		</React.Fragment>
	)
}

export default Timeline