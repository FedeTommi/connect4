import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './LandingPage'

class App extends React.Component {
    render() {
        return <Router>
            <Switch>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    }
}

export default App