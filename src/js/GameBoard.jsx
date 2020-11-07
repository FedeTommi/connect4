import React from "react"
import PropTypes from 'prop-types'
import withStyles from 'react-jss'

import Token from "./Token.jsx"


const GRID_PADDING = 5

const styles = {
    grid: {
        display: 'flex',
        margin: `0 ${GRID_PADDING}px`,
        position: 'relative',

        '&:before, &:after': {
            width: GRID_PADDING,
            backgroundColor: 'var(--tiffany)',
            content: '" "',
            display: 'block',
            top: 0,
            bottom: 0,
            position: 'absolute',
        },
        
        '&:before': {
            left: -GRID_PADDING,
        },
        
        '&:after': {
            right: -GRID_PADDING,
        },
    },

    column: {
        display: 'flex',
        flexDirection: 'column-reverse',
        cursor: 'pointer',
        borderTop: `var(--tiffany) ${GRID_PADDING}px solid`,
        borderBottom: `var(--tiffany) ${GRID_PADDING}px solid`,


        '&:hover': {
            borderTop: `var(--tiffany-hover) ${GRID_PADDING}px solid`,
            borderBottom: `var(--tiffany-hover) ${GRID_PADDING}px solid`,
        },
        
        '&:hover $cell': {
            background: '-webkit-radial-gradient(50% 50%, circle, transparent 57%, var(--tiffany-hover) 57%)',
            
        },
    },
    
    cell: {
        height: 50,
        width: 50,
        background: '-webkit-radial-gradient(50% 50%, circle, transparent 57%, var(--tiffany) 57%)',
        position: 'relative',
    },

    winOutline: {
        bottom: 5,
        width: 50,
        height: 200,
        position: 'absolute',
        borderRadius: 50,
        border: '2px solid #eee',
        transformOrigin: '25px calc(100% - 25px)',
    },
}

class GameBoard extends React.Component {
    render() {
        const { grid, winSequences, classes } = this.props

        return <div className={classes.grid}>
            {grid.map((column, x) => <div className={classes.column} key={x} onClick={this.props.onClick(x)}>
                {column.map((player, y) =>
                    <div className={classes.cell} key={y}>
                        {player === null ? null : <Token player={player} y={y} />}
                    </div>
                )}
            </div>)}

            {winSequences.map(({ origin, length, rotation }) => <div
                key={`${origin.x}-${origin.y}-${rotation}`}
                className={classes.winOutline}
                style={{
                    height: 50 + 50 * (length - 1) * (Math.abs(Math.sin(rotation)) + Math.abs(Math.cos(rotation))),
                    transform: `translate(${origin.x * 50}px, -${origin.y * 50}px) rotate(${rotation}rad)`,
                }}
            />)}
        </div>
    }
}

GameBoard.propTypes = {
    classes: PropTypes.object.isRequired,
    grid: PropTypes.array.isRequired,
    winSequences: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(GameBoard)