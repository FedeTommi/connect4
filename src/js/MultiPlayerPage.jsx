import React from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import {createUseStyles} from 'react-jss'
import MultiPlayerGuestForm from './components/MultiPlayerGuestForm'
import MultiPlayerHostForm from './components/MultiPlayerHostForm'

export const useStyles = createUseStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0',
    },
    input: {
        width: '80%',
        marginTop: 0,
    },
    button: {
        padding: '12px 60px',
    },
})

const styles = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        margin: '20px 0',
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 500,
        maxWidth: '100%',
        margin: 0,
        padding: 20,
        background: '#ECECEC',
        borderRadius: 5,
        boxShadow: '0px 1px 2px #0006',
    },
    separator: {
        fontFamily: '"Bubblegum Sans", cursive',
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
    }
}

class MultiPlayerPage extends React.Component {
    state = {
        nickname: '',
        code: '',
    }

    handleGameStart = ({ nickname, code, player }) => {
        this.props.history.push({
            pathname: "/game/",
            search: `?code=${code}&player=${player}&nickname=${nickname}`
        })
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <img
                        src={require('!file-loader!../svg/logo.svg').default}
                        className={classes.logo}
                    />
                    <MultiPlayerHostForm onGameStart={this.handleGameStart} />
                    <div className={classes.separator}>— OR —</div>
                    <MultiPlayerGuestForm onGameStart={this.handleGameStart} />
                </div>
            </div>
        )
    }
}

MultiPlayerPage.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(MultiPlayerPage))