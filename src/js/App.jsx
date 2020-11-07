import React from 'react'
import withStyles from 'react-jss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import LandingPage from './LandingPage'
import MultiPlayerPage from './MultiPlayerPage'
import SinglePlayerPage from './SinglePlayerPage'
import GamePage from './GamePage'
import MFLogo from "../svg/maple-pizza-logo.svg"


Modal.setAppElement('#react-root')

const styles = {
    maplePizza: {
        width: 90,
        position: 'absolute',
        left: 10,
        bottom: 10,
    }
}

class App extends React.Component {
    render() {
        const { classes } = this.props

        return <Router>
            <MFLogo className={classes.maplePizza}/>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/multiplayer">
                    <MultiPlayerPage />
                </Route>
                <Route exact path="/singleplayer">
                    <SinglePlayerPage />
                </Route>
                <Route exact path="/game">
                    <GamePage />
                </Route>
            </Switch>
        </Router>
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)