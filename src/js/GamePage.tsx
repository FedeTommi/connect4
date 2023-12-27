import React, { useCallback, useEffect, useRef } from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import Game from './Game'

const GamePage: React.FC<{}> = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const multiplayerCode = params.get("code")
    const nickname = params.get("nickname")
    const player = params.get("player")

    const wsRef = useRef<WebSocket>()

    useEffect(() => {
        const websocket = new WebSocket("ws://127.0.0.1:1234")
        wsRef.current = websocket
        
        websocket.onopen = () => {
            console.log("Ws open")
        }
        websocket.onclose = () => {
            console.log("Ws close")
        }
        websocket.onerror = () => {
            console.log("Ws error")

        }

        return () => websocket.close()
    })

    const handlePlaceToken = useCallback((x: number) => {
        if (!wsRef.current) {
            console.error("Websocket not connected")
            return
        }

        wsRef.current.send(JSON.stringify({
            x,
            player: player,
            eventType: "placed",
        }))
    }, [player])

    // const { players } = this.props.location
    const players = multiplayerCode
        ? { P1: "Foo", P2: "Bar" }
        : { P1: nickname, P2: 'Rob 🤖' }


    if (!players.P1) return <Redirect to='/' />

    return <Game players={{ P1: players.P1!, P2: players.P2 }} multiplayerCode={multiplayerCode} onPlaceToken={handlePlaceToken} />
}

export default GamePage