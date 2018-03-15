import * as React from 'react'
import styled from 'styled-components'


const ZoomArea = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	background-color: #cccccc60;
	border-left: 1px solid red;
	border-right: 1px solid red;
`

const ZoomAreaInner = styled.div`
    position: relative;
`

export interface WithZoomProps {
	onZoomChange: (leftRatio: number, rightRatio: number) => void
}

export interface WithZoomState {
    mouseDownRect: DOMRect,
    mouseDownX: number,
    mouseMoveX: number,
	scaleFactor: number
}

export default class WithZoom extends React.PureComponent<WithZoomProps, WithZoomState> {
	state = {
	    mouseDownRect: null,
        mouseDownX: null,
        mouseMoveX: null,
		scaleFactor: 1
	}

    private zoomAreaRef: any

	render() {
		return (
			<ZoomAreaInner
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                onWheel={this.onMouseWheel}
            >
                <React.Fragment>
				    {this.props.children}
                    {this.zoomArea}
                </React.Fragment>
			</ZoomAreaInner>
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
        const mouseDownRect = e.currentTarget.getBoundingClientRect()
        this.setState({
            mouseDownRect,
            mouseDownX: e.clientX - mouseDownRect.x,
        })
    }

    onMouseMove = e => {
        if (this.state.mouseDownX) {
            this.setState({
                mouseMoveX: e.clientX - this.state.mouseDownRect.x,
            })
        }
    }

    onMouseUp = e => {
        const mouseDownRect = this.state.mouseDownRect
        if (!mouseDownRect) {
            return
        }

	    const elementWidth = mouseDownRect.right - mouseDownRect.left
        const localX = e.clientX - mouseDownRect.x

        const leftPos = Math.min(this.state.mouseDownX, localX)
        const rightPos = Math.max(this.state.mouseDownX, localX)

        const leftRatio = leftPos / elementWidth
        const rightRatio = rightPos / elementWidth

        if (e.shiftKey) {
            const selectionWidth = rightPos - leftPos
            if (selectionWidth === 0) {
                return
            }
            const whitespaceScaleRatio = elementWidth / selectionWidth
            const leftWhitespaceRatio = leftRatio
            const rightWhitespaceRatio = 1 - rightRatio

            const leftRatioZoomOut = 0 - leftWhitespaceRatio * whitespaceScaleRatio
            const rightRatioZoomOut = 1 + rightWhitespaceRatio * whitespaceScaleRatio

            this.props.onZoomChange(leftRatioZoomOut, rightRatioZoomOut)
        } else {

            this.props.onZoomChange(leftRatio, rightRatio)
        }

        this.setState({
            mouseDownRect: null,
            mouseDownX: null,
            mouseMoveX: null,
        })
    }

	onMouseWheel = e => {
        const mouseDownRect = e.currentTarget.getBoundingClientRect()
        const localX = e.clientX - mouseDownRect.x
        const rectWidth = mouseDownRect.right - mouseDownRect.left
        const spreadCenterRatio = localX / rectWidth

		const scaleIncrement = -e.deltaY / 300
        const scaleFactor = 2**scaleIncrement

        const leftRatio = spreadCenterRatio * (scaleFactor - 1)
        const rightRatio = 1 - ((1 - spreadCenterRatio) * (scaleFactor - 1))

        this.props.onZoomChange(leftRatio, rightRatio)

		e.preventDefault()
	}
}