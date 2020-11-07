import React from 'react'
import withStyles from 'react-jss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import LandingPage from './LandingPage'
import MultiPlayerPage from './MultiPlayerPage'
import SinglePlayerPage from './SinglePlayerPage'
import GamePage from './GamePage'
import LogoPopup from './components/LogoPopup'


Modal.setAppElement('#react-root')

const styles = {

    }

class App extends React.Component {
    render() {
        const { classes } = this.props

        return <Router>
            <LogoPopup />
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
