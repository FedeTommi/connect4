import * as http from "http"
import * as path from "path"

import express from "express"
import { Server as WebSocketServer, WebSocket } from "ws"

const port = 1234
const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server: server })

export type MessageConnect = {
	event: "connect"
	code: string
	nickname: string
	player: "P1" | "P2"
}

export type MessageTokenPlaced = {
	player: "P1" | "P2"
	event: "tokenPlaced"
	code: string
	x: number
}

export type MessageOpponentConnected = {
	opponent: {
		nickname: string
		player: "P1" | "P2"
	}
	event: "opponentIsConnected"
}

type PlayerState = {
	nickname: string
	client: WebSocket
}
type GameState = {
	P1?: PlayerState
	P2?: PlayerState
}
const games: Record<string, GameState> = {}

const generateCode = (): string => {
	const code = Math.floor(1000 + Math.random() * 9000)
	if (code in games) {
		return generateCode()
	}
	return code.toString()
}

const opponentTo = (player: "P1" | "P2") => {
	return player === "P1" ? "P2" : "P1"
}

wss.on("connection", (ws) => {
	console.log("client connected")

	ws.on("message", (buf: Buffer) => {
		const data = JSON.parse(buf.toString()) as
			| MessageConnect
			| MessageTokenPlaced
		console.log(data)

		switch (data.event) {
			case "connect": {
				const { code, nickname, player } = data
				console.log("on connect", games)
				if (!(code in games)) {
					games[code] = {}
				}
				games[code][player] = { nickname, client: ws }

				const opponent = opponentTo(player)
				if (opponent in games[code]) {
					games[code][opponent]!.client.send(
						JSON.stringify({
							opponent: { nickname, player },
							event: "opponentIsConnected",
						} satisfies MessageOpponentConnected),
					)
					ws.send(
						JSON.stringify({
							opponent: {
								nickname: games[code][opponent]!.nickname,
								player: opponent,
							},
							event: "opponentIsConnected",
						} satisfies MessageOpponentConnected),
					)
				}

				break
			}
			case "tokenPlaced": {
				const { player, code } = data
				games[code][opponentTo(player)]?.client.send(buf.toString())
				break
			}
			default: {
				console.log("Could not handle message:", data)
				break
			}
		}
	})

	ws.on("close", () => {
		console.log("client has disconnected")
	})
})

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./index.html"))
})

export type GameExistsResponse = { gameExists: boolean }
app.get("/api/game-exists", (req, res) => {
	const code = req.query?.code as string
	console.log("game-exists", games, code, { gameExists: code in games })
	res.json({ gameExists: code in games } satisfies GameExistsResponse)
})

app.post("/api/new-game", (req, res) => {
	const code = generateCode()
	games[code] = {}
	console.log("new game", games)
	res.json({ code })
})

server.listen(port)
