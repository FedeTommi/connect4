import React from 'react'
import withStyles from 'react-jss'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import LandingPage from './LandingPage'
import MultiPlayerPage from './MultiPlayerPage'
import SinglePlayerPage from './SinglePlayerPage'
import GamePage from './GamePage'
import FedePlays from './FedePlays'
import LogoPopup from './components/LogoPopup'
import backgroundPath from '!file-loader!../svg/abstract_background.svg'
import WaitingPage from './WaitingPage'


Modal.setAppElement('#react-root')

const styles = {
    background: {
        backgroundImage: `url(${backgroundPath})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflowY: 'auto',
    },
}



class App extends React.Component {
    render() {
        const { classes } = this.props

        return (
            <div className={classes.background}>
                <Router>
                    <LogoPopup />
                    <Switch>
                        <Route exact path='/'>
                            <LandingPage />
                        </Route>
                        <Route exact path='/multiplayer'>
                            <MultiPlayerPage />
                        </Route>
                        <Route exact path='/singleplayer'>
                            <SinglePlayerPage />
                        </Route>
                        <Route path='/game'>
                            <GamePage />
                        </Route>
                        <Route exact path='/fede'>
                            <FedePlays />
                        </Route>
                        <Route exact path='/connect/:gameCode'>
                            <WaitingPage />
                        </Route>
                        <Redirect to='/' />
                    </Switch>
                </Router>
            </div>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)