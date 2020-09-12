import React from "react"
import { NUM_ROWS } from "./Game.jsx"


// pixels / s / s
const GRAVITY = 800

class Token extends React.Component {
    constructor() {
        super()
        this.tokenRef = React.createRef()
    }

    componentDidMount() {
        const distanceToOffset =
            (NUM_ROWS - this.props.y) *
            this.tokenRef.current.getBoundingClientRect().height +
            10

        this.tokenRef.current.animate([
            { transform: `translateY(${-distanceToOffset}px)` },
            { transform: 'translateY(0)' },
        ], {
            duration: Math.sqrt(2 * distanceToOffset / GRAVITY) * 1000,
            easing: 'ease-in',
        })
    }

    render() {
        return <div
            ref={this.tokenRef}
            className={`token ${this.props.player}`}
        />
    }

}

export default Token