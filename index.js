const http = require('http')
const path = require('path')

const express = require('express')
const WebSocketServer = require('ws').Server

const port = 1234
const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server: server })

const games = {}

const generateCode = () => {
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

    ws.on("message", (data) => {
        console.log(data.toString())
    })

    ws.on("close", () => {
        console.log("client has disconnected")
    })
})



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/game-exists', (req, res) => {
    // TODO: Remove this when we're no longer using the webpack devserver
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    const code = req.query?.code
    res.json({ gameExists: code in games })
})

app.post('/new-game', (req, res) => {
    const code = generateCode()
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.json({code})
})

server.listen(port)