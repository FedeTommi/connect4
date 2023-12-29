import * as http from "http"
import * as path from "path"

import express from "express"
import { Server as WebSocketServer } from "ws"

const port = 1234
const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server: server })

const games = {}

const generateCode = (): number => {
    const code = Math.floor(1000 + Math.random() * 9000);
    if (code in games) {
        return generateCode()
    }
    return code
}

// {
//     '1111': {
//         p1: {
//             name: "",
//             client:,

//         },
//         p2: {
//             name: "",
//             client: ws,
//         },

//     }
// }

wss.on("connection", (ws) => {
    console.log("client connected")

    ws.on("message", (data: Buffer) => {
        console.log(data.toString())
    })

    ws.on("close", () => {
        console.log("client has disconnected")
    })
})



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get("/api/game-exists", (req, res) => {
	const code = req.query?.code as string
	res.json({ gameExists: code in games })
})

app.post("/api/new-game", (req, res) => {
	const code = generateCode()
	games[code] = {}
	res.json({ code })
})

server.listen(port)
