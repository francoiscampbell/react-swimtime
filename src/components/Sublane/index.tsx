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

const FlexBar: React.SFC<BarProps> = props => (
	<div
		style={{
			flex: `0 0 ${props.widthPct}%`
		}}
	>
		{props.children}
	</div>
)

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
			<FlexBar widthPct={props.startPct}/>
			<FlexBar widthPct={props.widthPct}>
				{props.renderBar(data)}
			</FlexBar>
		</SublaneContainer>
	)
}

export default Sublane