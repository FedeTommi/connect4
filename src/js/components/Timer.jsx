import React from 'react'
import PropTypes from 'prop-types'

// const styles = {

// }

class Timer extends React.Component {
    constructor() {
        super()
        this.state = {seconds: 10}
    }

    componentDidMount() {
        this.intervalHandle = setInterval(() => {
            const { seconds } = this.state
            if (seconds === 0) {
                clearInterval( this.intervalHandle )
                return 
            }
            if (this.props.isPaused === true) {
                return
            } 

            this.setState({ seconds: seconds - 1 })

        }, 1000)
    }

    componentWillUnmount() {
        clearInterval( this.intervalHandle )
    }
    
    render() {
        const { seconds } = this.state

        return (
            <div>{ seconds } s</div>
        )
    }

}

Timer.propTypes = {
    classes: PropTypes.object.isRequired,
    isPaused: PropTypes.bool,
}

export default Timer