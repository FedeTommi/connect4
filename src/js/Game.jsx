import React from "react"

import GameBoard from "./GameBoard"

export const NUM_COLUMNS = 7
export const NUM_ROWS = 6

const PLAYERS = ["P1", "P2"]


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
        return function() {
            const y = this.state.grid[x].indexOf(null)

            const player = PLAYERS[this.state.turnCounter % 2]

            // Ignore if column already full
            // Bail early, don't count as turn
            if (y === -1) return

            const grid = this.state.grid
            grid[x][y] = player
            
            this.setState({
                turnCounter: this.state.turnCounter + 1,
                grid,
            })
            
            this.checkWinCondition(player, x, y)

        }.bind(this)
    }

    checkWinCondition(player, x, y) {
        const getRightBoundary = (array, startPoint) => {
            for (let i = startPoint; i < array.length; i++) {
                if (array[i] !== array[startPoint]) return i - 1
            }
            return array.length - 1
        }

        const getLeftBoundary = (array, startPoint) => {
            for (let i = startPoint; i >= 0; i--) {
                if (array[i] !== array[startPoint]) return i + 1
            }
            return 0
        }

        const getBoundariesForVector = (vector, startIndex) => {
            const rightBoundary = getRightBoundary(vector, startIndex)
            const leftBoundary = getLeftBoundary(vector, startIndex)
            const length = rightBoundary - leftBoundary + 1

            return { rightBoundary, leftBoundary, length }
        }

        const column = this.state.grid[x]
        const columnBoundaries = getBoundariesForVector(column, y)
        console.log(column, columnBoundaries)

        const row = this.state.grid.map(column => column[y])
        const rowBoundaries = getBoundariesForVector(row, x)
        
        // Diagonal that looks like a '/'
        const diagonalForwardSlash = this.state.grid
            .map((column, i) => column[y - x + i])
        const diagonalForwardSlashBoundaries =
            getBoundariesForVector(diagonalForwardSlash, x)
            
        // Diagonal that looks like a '\'
        const diagonalBackSlash = this.state.grid
            .map((column, i) => column[y + x - i])
        const diagonalBackSlashBoundaries =
            getBoundariesForVector(diagonalBackSlash, x)

        if (Math.max(rowBoundaries.length,
                columnBoundaries.length,
                diagonalForwardSlashBoundaries.length,
                diagonalBackSlashBoundaries.length) >= 4) {
            alert(`${player} won`)
        }
    }

    render() {
        return <GameBoard state={this.state.grid} onClick={this.handleClick} />
    }
}

export default Game