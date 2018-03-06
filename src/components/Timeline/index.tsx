import * as React from 'react'
import styled from 'styled-components'

import Lane from '../Lane'
import {
    LaneData,
    SublaneData,
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

export interface TimelineState {
    scaledStartTime: number,
    scaledTimeInterval: number,
}

export default class Timeline extends React.PureComponent<TimelineProps, TimelineState> {

    constructor(props) {
        super(props)
        const scaledStartTime = props.startDate.getTime()
        const scaledTimeInterval = props.endDate.getTime() - scaledStartTime
        this.state = {
            scaledStartTime,
            scaledTimeInterval,
        }
    }

    render() {
        const scaledStartTime = this.state.scaledStartTime
        const scaledTimeInterval = this.state.scaledTimeInterval
        return (
            <React.Fragment>
                <WithZoom onZoomChange={this.onZoomChange}>
                    <TimelineContainer>
                        {this.props.data.map((laneData, i) => (
                            <Lane
                                key={i}
                                laneData={laneData}
                                renderBar={this.props.renderBar}
                                startTime={scaledStartTime}
                                timeInterval={scaledTimeInterval}
                            />
                        ))}
                    </TimelineContainer>
                </WithZoom>
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
    }

    onZoomChange = (leftRatio, rightRatio) => {
        const scaledStartTime = this.state.scaledStartTime + this.state.scaledTimeInterval * leftRatio
        const scaledEndTime = this.state.scaledStartTime + this.state.scaledTimeInterval * rightRatio
        const scaledTimeInterval = scaledEndTime - scaledStartTime

        this.setState({
            scaledStartTime,
            scaledTimeInterval,
        })
    }
}
