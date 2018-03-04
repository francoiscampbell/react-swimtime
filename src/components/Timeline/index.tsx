import * as React from 'react'
import styled from 'styled-components'

import Lane from '../Lane'
import { 
	LaneData, 
	SublaneData
} from '../../types/LaneData'
import WithZoom from '../WithZoom'


interface AppContainerProps {
	widthPx: number
}

const TimelineContainer = styled.div`
	overflow: auto;
	border: 1px solid;
`

const DateContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 8px 0;
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
		<WithZoom>
			{scaleFactor => {
				const halfInterval = timeInterval / 2
				const scaledStartTime = startTime + halfInterval * (1 - scaleFactor)
				const scaledTimeInterval = timeInterval * scaleFactor
				return (
					<React.Fragment>
						<TimelineContainer>
							{props.data.map((laneData, i) => (
								<Lane
									key={i}
									laneData={laneData}
									renderBar={props.renderBar}
									startTime={scaledStartTime}
									timeInterval={scaledTimeInterval}
								/>
							))}
						</TimelineContainer>
						<DateContainer>
							<span>{new Date(scaledStartTime).toLocaleString()}</span>
							<span>{new Date(scaledStartTime + scaledTimeInterval).toLocaleString()}</span>
						</DateContainer>
					</React.Fragment>
				)
			}}
		</WithZoom>
	)
}

export default Timeline