import React from "react"

import GameBoard from "./GameBoard"

export const NUM_COLUMNS = 7
export const NUM_ROWS = 6

const COLORS = ["red", "yellow"]


class Game extends React.Component {
    constructor() {
        super()

        this.state = {
            turnCounter: 0,
            grid: Array.from(Array(NUM_COLUMNS), () => new Array(NUM_ROWS).fill(null)),
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(x) {
        return function(event) {
            const y = this.state.grid[x].indexOf(null)

            // Ignore if column already full
            // Bail early, don't count as turn
            if (y === -1) return

            const grid = this.state.grid
            console.log({ x, y })
            grid[x][y] = COLORS[this.state.turnCounter % 2]
            
            this.setState({
                turnCounter: this.state.turnCounter + 1,
                grid,
            })
            
        }.bind(this)
    }

    render() {
        console.log(this.state)
        return <GameBoard state={this.state.grid} onClick={this.handleClick} />
    }
}

export default Game