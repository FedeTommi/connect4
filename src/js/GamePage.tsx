import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	CSSProperties,
} from "react"
import { useLocation, Navigate } from "react-router-dom"
import Modal from "react-modal"

import Game from "./Game"
import Message from "./components/Message"
import {
	MessageConnect,
	MessageOpponentConnected,
	MessageTokenPlaced,
} from "../.."

const connectingModalStyles = {
	content: {
		display: "flex",
		flexDirection: "column",
		position: "relative",
		inset: 0,
		padding: "20px 80px",
	} satisfies CSSProperties,
	overlay: {
		background: "#0004",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	} satisfies CSSProperties,
}

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

		console.log(`ws://${location.host}/ws`)
		const protocol = location.protocol == "https:" ? "wss" : "ws"
		const websocket = new WebSocket(`${protocol}://${location.host}/ws`)
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

	if (!isValid) return <Navigate to="/" />

	if (connectionState == "not_connected") {
		return (
			<Modal isOpen={true} style={connectingModalStyles}>
				<div>Establishing connection to server...</div>
			</Modal>
		)
	}

	if (connectionState == "opponent_not_connected") {
		return (
			<Modal isOpen={true} style={connectingModalStyles}>
				<div>{`Waiting for opponent to connect. Give them this code: ${multiplayerCode}`}</div>
			</Modal>
		)
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
