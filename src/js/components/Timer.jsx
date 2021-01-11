import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'

import Hourglass from '../../svg/hourglass.svg'


const INITIAL_TIMER = 30

const styles = {
    hourglass: {
        height: 50,
    },
    root: {
        fontFamily: '"Bubblegum Sans", cursive',
        fontSize: 20,
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
}

class Timer extends React.Component {
    constructor() {
        super()
        this.state = { seconds: INITIAL_TIMER }
    }

    componentDidMount() {
        this.intervalHandle = setInterval(() => {
            const { seconds } = this.state
            if (seconds === 0) {
                this.setState({ seconds: INITIAL_TIMER })
                this.props.onTimeOut()
                return
            }
            if (this.props.isPaused === true) {
                return
            }

            this.setState({ seconds: seconds - 1 })

        }, 1000)
    }

    componentDidUpdate(prevProps) {
        if (this.props.turnCounter !== prevProps.turnCounter) {
            this.setState({ seconds: INITIAL_TIMER })
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandle)
    }

    render() {
        const { classes } = this.props
        const { seconds } = this.state

        return (
            <div className={classes.root}>
                <Hourglass className={classes.hourglass} />
                <div>{seconds} s</div>
            </div>
        )
    }

}

Timer.propTypes = {
    classes: PropTypes.object.isRequired,
    isPaused: PropTypes.bool,
    onTimeOut: PropTypes.func.isRequired,
    turnCounter: PropTypes.number.isRequired,
}

export default withStyles(styles)(Timer)