import React from 'react'
import withStyles from 'react-jss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import LandingPage from './LandingPage'
import MFLogo from "../svg/maple-pizza-logo.svg"

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
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)