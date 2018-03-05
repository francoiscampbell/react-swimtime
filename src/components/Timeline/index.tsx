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
	position: relative;
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
						<TimelineInternal
                            data={props.data}
                            renderBar={props.renderBar}
                            startTime={scaledStartTime}
                            timeInterval={scaledTimeInterval}
                        />
						<DateContainer>
							<span>{new Date(scaledStartTime).toLocaleString()}</span>
							<span>{new Date(scaledStartTime + scaledTimeInterval).toLocaleString()}</span>
						</DateContainer>
						<DateContainer>
							<span>{scaledStartTime}</span>
							<span>{scaledStartTime + scaledTimeInterval}</span>
						</DateContainer>
					</React.Fragment>
				)
			}}
		</WithZoom>
	)
}

export default Timeline


const ZoomArea = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	background-color: #cccccc60;
	border-left: 1px solid red;
	border-right: 1px solid red;
`

const TimelineInternalContainer = styled.div`
    position: relative;
`

class TimelineInternal extends React.PureComponent {
    state = {
        mouseDownX: null,
        mouseMoveX: null
    }

    ref = null

    render() {
        return (
            <TimelineInternalContainer
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
            >
                <TimelineContainer>
                    {this.props.data.map((laneData, i) => (
                        <Lane
                            key={i}
                            laneData={laneData}
                            renderBar={this.props.renderBar}
                            startTime={this.props.startTime}
                            timeInterval={this.props.timeInterval}
                        />
                    ))}
                </TimelineContainer>
                {this.zoomArea}
            </TimelineInternalContainer>

        )
    }

    get zoomArea() {
        if (
            this.state.mouseDownX &&
            this.state.mouseMoveX
        ) {
            const left = this.state.mouseDownX
            const width = this.state.mouseMoveX - this.state.mouseDownX
            return (
                <ZoomArea
                    style={{
                        left: `${left + Math.min(width, 0)}px`,
                        width: `${Math.abs(width)}px`,
                    }}
                />
            )
        }
    }

    onMouseDown = e => {
        this.setState({
            mouseDownX: e.clientX - e.currentTarget.getBoundingClientRect().x
        })
    }

    onMouseMove = e => {
        if (this.state.mouseDownX) {
            this.setState({
                mouseMoveX: e.clientX - e.currentTarget.getBoundingClientRect().x
            })
        }
    }

    onMouseUp = () => {
        this.setState({
            mouseDownX: null,
            mouseMoveX: null
        })
    }
}
