import * as React from 'react'
import styled from 'styled-components'

import Lane from '../Lane'
import { 
	LaneData, 
	SublaneData
} from '../../types/LaneData'


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
		<ZoomDiv>
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
		</ZoomDiv>
	)
}

export default Timeline


const AppContainer = styled.div`
	width: ${(props: AppContainerProps) => props.widthPx}px;
`

interface ZoomDivState {
	widthPx: number
}

class ZoomDiv extends React.PureComponent<{}, ZoomDivState> {
	state = {
		widthPx: 1000
	}

	render() {
		return (
			<AppContainer 
				onWheel={this.onMouseWheel}
				widthPx={this.state.widthPx}
			>
				{this.props.children}
			</AppContainer>
		)
	}

	onMouseWheel = e => {
		const scaleIncrement = -e.deltaY
		console.log(e.deltaY)
		console.log(scaleIncrement)
		this.setState({
			widthPx: this.state.widthPx + scaleIncrement
		})
	}


}