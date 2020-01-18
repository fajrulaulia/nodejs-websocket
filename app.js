const express = require('express')
const WebSocket = require('ws')

const app = express()

const WebSocketServices = app.listen(2000, () => console.log("Running At Port 2000"))

const ws = new WebSocket.Server({ server: WebSocketServices })

app.get('/', (req, res) => res.json({ "message": "Hello Widia Sayang" }))

ws.on('connection', (ws, req) => {

  switch (req.url) {
    case '/count':
      let number = 1
      ws.on('open', () => ws.send('[Server] => Server Opened'))

      ws.on('message', (msg) => {
        ws.send('[Client] => ' + msg)
        const interval = setInterval(() => {

          ws.send('[Server] => this is a Interval Message no ' + (number++))
          process.env.LIMIT == undefined ? number > 10 && clearInterval(interval) : number > process.env.LIMIT && clearInterval(interval)
        }, 1000)
      })

      ws.on('close', () => {
        console.log(`[Client] => Client Disconnect`)
      })
      break;

      default:
        ws.on('open', () => ws.send('[Server] => Not data :('))
  }

})