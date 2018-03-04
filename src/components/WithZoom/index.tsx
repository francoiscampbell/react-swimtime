import * as React from 'react'


export interface WithZoomProps {
	children: (number) => new() => React.Component
}

export interface WithZoomState {
	scaleFactor: number
}

export default class WithZoom extends React.PureComponent<WithZoomProps, WithZoomState> {
	state = {
		scaleFactor: 1
	}

	render() {
		return (
			<div onWheel={this.onMouseWheel}>
				{this.props.children(this.state.scaleFactor)}
			</div>
		)
	}

	onMouseWheel = e => {
		const scaleIncrement = e.deltaY / 300
		if (scaleIncrement < 1 && scaleIncrement > -1) {
			this.setState({
				scaleFactor: this.state.scaleFactor * (1 + scaleIncrement)
			})
		}
		e.stopPropagation()
	}
}