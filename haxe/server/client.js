import WebSocket from 'ws'

const ws = new WebSocket('ws://127.0.0.1:8000/')

ws.on('open', function open () {
  ws.send('something (client)')
})

ws.on('message', function incoming (message) {
  console.log('client received: %s', message)
})
