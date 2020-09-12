import React from "react"

import Token from "./Token.jsx"

class GameBoard extends React.Component {
    render() {
        const grid = this.props.state

        return <div id="grid" className="grid">
            {grid.map((column, x) => <div className="column" key={x} onClick={this.props.onClick(x)}>
                {column.map((player, y) =>
                    <div className="cell" key={y}>
                        {player === null ? null : <Token player={player} y={y} />}
                    </div>
                )}
            </div>)}
        </div>
    }
}

export default GameBoard