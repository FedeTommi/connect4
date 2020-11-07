import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'

import { NUM_ROWS } from './GameConstants'


const styles = {
    root: {
        height: 0,
        bottom: 0,
        width: '100%',
        position: 'absolute',
        transformOrigin: '25px calc(100% - 25px)',
        border: '2px solid #eee',
        zIndex: 1,
    },
}

const WinOutline = ({ classes, rotation, length, origin }) => {
    const aspectRatio = (1 + (length - 1) * (Math.abs(Math.sin(rotation)) + Math.abs(Math.cos(rotation))))

    return <div
        className={classes.root}
        style={{
            transform: `translate(${origin.x * 50}px, -${50 * origin.y}px) rotate(${rotation}rad)`,
            borderRadius: `100% / ${100 / aspectRatio}%`,
            paddingBottom: `calc(${100 * aspectRatio}% - 4px)`,
        }}
    />
}

WinOutline.propTypes = {
    classes: PropTypes.object.isRequired,
    rotation: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    origin: PropTypes.object.isRequired,
}

export default withStyles(styles)(WinOutline)