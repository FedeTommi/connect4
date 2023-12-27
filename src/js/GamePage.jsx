import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'

import Game from './Game'


class GamePage extends React.Component {
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search)
        this.multiplayerCode = params.get("code")
        this.nickname = params.get("nickname")
        this.player = params.get("player")

        this.websocket = new WebSocket("ws://127.0.0.1:1234")
        
        this.websocket.onopen = () => {
            console.log("Ws open")
        }
        this.websocket.onclose = () => {
            console.log("Ws close")
        }
        this.websocket.onerror = () => {
            console.log("Ws error")

        }
    }

    handlePlaceToken = (x) => {
        this.websocket.send(JSON.stringify({x:x, player: this.player, eventType: "placed"}))
    }

    render() { 
        // const { players } = this.props.location
        const players = { P1: "Foo", P2: "Bar" }

        if (!players) return <Redirect to='/' />

        return <Game players={players} multiplayerCode={this.multiplayerCode} onPlaceToken={this.handlePlaceToken} />
    }
}

GamePage.propTypes = {
    location: PropTypes.object.isRequired,
}

export default  withRouter(GamePage)