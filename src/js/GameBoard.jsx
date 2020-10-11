import React from "react"
import PropTypes from 'prop-types'

import Token from "./Token.jsx"

class GameBoard extends React.Component {
    render() {
        const { grid, winSequences } = this.props

        return <div id="grid" className="grid">
            {grid.map((column, x) => <div className="column" key={x} onClick={this.props.onClick(x)}>
                {column.map((player, y) =>
                    <div className="cell" key={y}>
                        {player === null ? null : <Token player={player} y={y} />}
                    </div>
                )}
            </div>)}

            {winSequences.map(({ origin, length, rotation }) => <div
                key={`${origin.x}-${origin.y}-${rotation}`}
                className="win-outline"
                style={{
                    height: 50 + 50 * (length - 1) * (Math.abs(Math.sin(rotation)) + Math.abs(Math.cos(rotation))),
                    transform: `translate(${origin.x * 50}px, -${origin.y * 50}px) rotate(${rotation}rad)`,
                }}
            />)}
        </div>
    }
}

GameBoard.propTypes = {
    grid: PropTypes.array.isRequired,
    winSequences: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default GameBoard