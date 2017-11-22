require('dotenv').config();
const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const http = require('http');
var compression = require('compression')

const app = express();
app.use(compression());
const server = http.createServer();
const wss = new WebSocket.Server({ server });

function serializeMessage(info) {
  let { type, name, message } = info;
  let timestamp = +new Date();
  return JSON.stringify({ type, name, message, timestamp });
}

function numberOnline() {
  return JSON.stringify({
    type: 'online',
    number: wss.clients.size,
  });
}

function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState !== WebSocket.OPEN) {
      return;
    }
    client.send(message);
  });
}

wss.on('connection', ws => {
  ws.on('message', data => {
    try {
      const message = JSON.parse(data);
      switch (message.type) {
        case 'message':
          broadcast(serializeMessage(message));
          break;
        case 'heartbeat':
          ws.send(numberOnline());
          break;
      }
    } catch (e) {
      // just skip messages that can't be parsed
    }
  });
});

app.use(express.static(path.join(__dirname, '/static')));
server.on('request', app);
server.listen(process.env.PORT, () => {
  console.log(`Started server on http://localhost:${process.env.PORT}`)
});
