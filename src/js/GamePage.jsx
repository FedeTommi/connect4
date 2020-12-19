import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'

import Game from './Game'


class GamePage extends React.Component {
    render() { 
        const { players } = this.props.location

        if (!players) return <Redirect to='/' />

        return <Game players={players} />
    }
}

GamePage.propTypes = {
    location: PropTypes.object.isRequired,
}

export default  withRouter(GamePage)