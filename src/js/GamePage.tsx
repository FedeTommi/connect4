import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLocation, Redirect } from "react-router-dom"

import Game from "./Game"
import {
	MessageConnect,
	MessageOpponentConnected,
	MessageTokenPlaced,
} from "../.."

const parseUrlState = () => {
	const location = useLocation()
	return useMemo(() => {
		const params = new URLSearchParams(location.search)
		const multiplayerCode = params.get("code")
		const nickname = params.get("nickname")
		const player = params.get("player") ?? ""
		const gameMode: GameMode = multiplayerCode
			? "private_multiplayer"
			: "singleplayer"

		const isValid = ["P1", "P2"].includes(player) && nickname

		return isValid
			? ({
					isValid: true,
					player: player as "P1" | "P2",
					gameMode,
					nickname,
					multiplayerCode,
			  } as const)
			: ({
					isValid: false,
					player: null,
					gameMode: null,
					nickname: null,
					multiplayerCode: null,
			  } as const)
	}, [])
}

export type GameMode = "singleplayer" | "private_multiplayer" // "local_multiplayer" | "random/public_multiplayer"
type ConnectionState = "not_connected" | "opponent_not_connected" | "connected"

const GamePage: React.FC<{}> = () => {
	const wsRef = useRef<WebSocket>()
	const { isValid, player, gameMode, multiplayerCode, nickname } =
		parseUrlState()
	const [connectionState, setConnectionState] = useState<ConnectionState>(
		gameMode == "private_multiplayer" ? "not_connected" : "connected",
	)
	const [opponentInfo, setOpponentInfo] = useState<{ nickname: string } | null>(
		gameMode == "singleplayer" ? { nickname: "Rob 🤖" } : null,
	)

	const [tokenPlaced, setTokenPlaced] = useState<{ i: number; x: number }>({
		i: -1,
		x: -1,
	})

	useEffect(() => {
		if (!isValid || gameMode == "singleplayer") {
			return
		}

		const websocket = new WebSocket("ws://127.0.0.1:1234")
		wsRef.current = websocket

		websocket.onopen = () => {
			websocket.send(
				JSON.stringify({
					event: "connect",
					player: player,
					nickname: nickname,
					code: multiplayerCode!,
				} satisfies MessageConnect),
			)
			console.log("Ws open")
			setConnectionState("opponent_not_connected")
		}
		websocket.onclose = () => {
			console.log("Ws close")
		}
		websocket.onerror = () => {
			console.log("Ws error")
		}

		websocket.onmessage = (message) => {
			console.log(message)
			const data = JSON.parse(message.data) as
				| MessageOpponentConnected
				| MessageTokenPlaced
			switch (data.event) {
				case "opponentIsConnected": {
					setOpponentInfo({ nickname: data.opponent.nickname })
					setConnectionState("connected")
					break
				}
				case "tokenPlaced": {
					setTokenPlaced(({ i }) => ({ i: i + 1, x: data.x }))
					break
				}
				default: {
					console.log("Could not handle message", message)
				}
			}
		}

		return () => websocket.close()
	}, [])

	const handlePlaceToken = useCallback((x: number) => {
		if (!isValid || gameMode != "private_multiplayer") {
			return
		}

		if (!wsRef.current) {
			console.error("Websocket not connected")
			return
		}

		wsRef.current.send(
			JSON.stringify({
				x,
				player: player,
				event: "tokenPlaced",
				code: multiplayerCode!,
			} satisfies MessageTokenPlaced),
		)
	}, [])

	if (!isValid) return <Redirect to="/" />

	if (connectionState == "not_connected") {
		return "Establishing connection to server..."
	}

	if (connectionState == "opponent_not_connected") {
		return `Waiting for opponent to connect. Give them this code: ${multiplayerCode}`
	}

	const players =
		player === "P1"
			? { P1: nickname, P2: opponentInfo!.nickname }
			: { P2: nickname, P1: opponentInfo!.nickname }

	return (
		<Game
			player={player}
			players={players}
			gameMode={gameMode}
			tokenPlaced={tokenPlaced}
			onPlaceToken={handlePlaceToken}
		/>
	)
}

export default GamePage
