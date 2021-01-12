import React from 'react'

import GameComponents from './GameComponents'
import { NUM_COLUMNS, NUM_ROWS, PLAYERS } from './GameConstants'


class Game extends React.Component {
    state = {
        scores: { P1: 0, P2: 0 },
        ...this.defaultState(),
    }

    defaultState() {
        return {
            turnCounter: 0,
            grid: Array.from(Array(NUM_COLUMNS), () => new Array(NUM_ROWS).fill(null)),
            winSequences: [],
            winningPlayerID: null,
        }
    }

    get activePlayer() {
        return PLAYERS[this.state.turnCounter % 2]
    }

    placeTokenAtX = (x) => {
        const y = this.state.grid[x].indexOf(null)

        // Ignore if column already full
        // Bail early, don't count as turn
        if (y === -1) return

        const grid = this.state.grid
        grid[x][y] = this.activePlayer

        this.checkWinCondition(grid, x, y)

        this.setState({
            turnCounter: this.state.turnCounter + 1,
            grid,
        })
    }

    handleClick = x => () => {
        if (this.activePlayer === 'P2') {
            return
        }
        this.placeTokenAtX(x)
        setTimeout(this.placeRandomToken, 2000)
    }

    checkWinCondition = (grid, x, y) => {
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

        const column = grid[x]
        const columnBoundaries = getBoundariesForVector(column, y)

        if (columnBoundaries.length >= 4) {
            this.setState({
                winSequences: [{
                    length: columnBoundaries.length,
                    origin: { x, y: columnBoundaries.leftBoundary },
                    rotation: 0,
                }],
            })
        }

        const row = grid.map(column => column[y])
        const rowBoundaries = getBoundariesForVector(row, x)

        if (rowBoundaries.length >= 4) {
            this.setState({
                winSequences: [{
                    length: rowBoundaries.length,
                    origin: { y, x: rowBoundaries.leftBoundary },
                    rotation: Math.PI / 2,
                }],
            })
        }

        // Diagonal that looks like a '/'
        const diagonalForwardSlash = grid
            .map((column, i) => column[y - x + i])
        const diagonalForwardSlashBoundaries =
            getBoundariesForVector(diagonalForwardSlash, x)

        if (diagonalForwardSlashBoundaries.length >= 4) {
            this.setState({
                winSequences: [{
                    length: diagonalForwardSlashBoundaries.length,
                    origin: {
                        x: diagonalForwardSlashBoundaries.leftBoundary,
                        y: y - x + diagonalForwardSlashBoundaries.leftBoundary,
                    },
                    rotation: Math.PI / 4,
                }],
            })
        }

        // Diagonal that looks like a '\'
        const diagonalBackSlash = grid
            .map((column, i) => column[y + x - i])
        const diagonalBackSlashBoundaries =
            getBoundariesForVector(diagonalBackSlash, x)

        if (diagonalBackSlashBoundaries.length >= 4) {
            this.setState({
                winSequences: [{
                    length: diagonalBackSlashBoundaries.length,
                    origin: {
                        x: diagonalBackSlashBoundaries.rightBoundary,
                        y: y + x - diagonalBackSlashBoundaries.rightBoundary,
                    },
                    rotation: -Math.PI / 4,
                }],
            })
        }

        if (Math.max(rowBoundaries.length,
            columnBoundaries.length,
            diagonalForwardSlashBoundaries.length,
            diagonalBackSlashBoundaries.length) >= 4) {
            const { scores } = this.state
            scores[this.activePlayer]++
            this.setState({ winningPlayerID: this.activePlayer, scores })
        }
    }

    placeRandomToken = () => {
        const nonFullColumns = this.state.grid
            .map((cells, i) => ({ cells, i }))
            .filter(({ cells }) => cells.includes(null))
        const randomX = nonFullColumns[Math.floor(Math.random() * nonFullColumns.length)].i
        this.placeTokenAtX(randomX)
    }

    handleNewGame = () => {
        this.setState(this.defaultState())
    }

    render() {
        const { ...rest } = this.props

        return <GameComponents
            grid={this.state.grid}
            winSequences={this.state.winSequences}
            onClick={this.handleClick}
            onNewGame={this.handleNewGame}
            winningPlayerID={this.state.winningPlayerID}
            scores={this.state.scores}
            onTimeOut={this.placeRandomToken}
            turnCounter={this.state.turnCounter}
            activePlayer={this.activePlayer}
            {...rest}
        />
    }
}

export default Game
