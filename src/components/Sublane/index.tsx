import * as React from 'react'
import styled from 'styled-components'

import { SublaneExtraData } from '../../types/LaneData'


const SublaneContainer = styled.div`
	align-items: center;
	display: flex;
	padding: 8px;
`

interface BarProps {
	widthPct: number
}

const Filler = styled.div`
	flex: 0 0 auto;
	width: ${(props: BarProps) => props.widthPct}%;
`

const BarContainer = styled.div`
	width: ${(props: BarProps) => props.widthPct}%;
`

export interface SublaneProps {
	data: SublaneExtraData,
	renderBar: (SublaneData) => new() => React.Component
	startPct: number,
	widthPct: number
}

const Sublane: React.SFC<SublaneProps> = props => {
	const data = props.data

	return (
		<SublaneContainer>
			<Filler widthPct={props.startPct}/>
			<BarContainer
				widthPct={props.widthPct}
			>
				{props.renderBar(data)}
			</BarContainer>
		</SublaneContainer>
	)
}

export default Sublane