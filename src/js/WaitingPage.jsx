import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
// import { withRouter } from 'react-router-dom'

// import YellowTokenSmiley from "../svg/yellow-token-smiley.svg"
// import RedTokenSmiley from "../svg/red-token-smiley.svg"

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    window: {
        backgroundColor: 'white',
        boxShadow: '0px 2px 2px #0006',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Bubblegum Sans',
        fontSize: 30,
        color: 'var(--tiffany-extra-dark)',
        padding: 10,
    },
    smiley: {
        height: 100,
    },
}

class WaitingPage extends React.Component {
    render() {
        const{ classes } = this.props
        // const { gameCode } = this.props.match.params
        // console.log(gameCode)

        return (
            <div className={classes.wrapper}>
                <div className={classes.window}>
                    Waiting for opponent on channel...
                    {/* <YellowTokenSmiley className={classes.smiley} />
                    <RedTokenSmiley className={classes.smiley} /> */}
                </div>
            </div>
        )
    }
}

WaitingPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default withStyles(styles)(WaitingPage)