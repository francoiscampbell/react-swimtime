import * as React from 'react'
import styled from 'styled-components'

import { SublaneData } from '../../types/LaneData'


const SublaneContainer = styled.div`
	align-items: center;
	display: flex;
	padding: 8px;
`

interface BarProps {
	width: number
}

const Filler = styled.div`
	flex: 0 0 auto;
	width: ${(props: BarProps) => props.width}px;
`

const BarContainer = styled.div`
	width: ${(props: BarProps) => props.width}px;
`

function map(
	number: number,
	fromMin: number, 
	fromMax: number, 
	toMin: number, 
	toMax: number
) {
	return (toMax - toMin) * ((number - fromMin) / (fromMax - fromMin)) + toMin
}

export interface SublaneProps {
	data: SublaneData,
	renderBar: (SublaneData) => new() => React.Component
	startTime: number
}

const Sublane: React.SFC<SublaneProps> = props => {
	const data = props.data

	const startPx = map(data.start.getTime(), props.startTime, props.startTime + 5000000, 0, 1000)
	const endPx = map(data.end.getTime(), props.startTime, props.startTime + 5000000, 0, 1000)
	return (
		<SublaneContainer>
			<Filler width={startPx}/>
			<BarContainer
				width={endPx - startPx}
			>
				{props.renderBar(data)}
			</BarContainer>
		</SublaneContainer>
	)
}

export default Sublane