import React from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { NUM_ROWS } from './GameConstants'


const styles = {
    token: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        borderRadius: '50%',
        position: 'absolute',
        zIndex: -1,
    }, 
    
    P2: {
        backgroundColor: 'var(--p2-color)',
    },

    P1: {
        backgroundColor: 'var(--p1-color)',
    },
}

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
        const { classes, player } = this.props

        return <div
            ref={this.tokenRef}
            className={classNames(classes.token, classes[player])}
        />
    }

}

Token.propTypes = {
    y: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    player: PropTypes.oneOf([ 'P1', 'P2' ]).isRequired,
}

export default withStyles(styles)(Token)