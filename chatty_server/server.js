const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    console.log("RUnnin")
    console.log(ws.readyState, WebSocket.OPEN)
    
    if (ws.readyState === WebSocket.OPEN) {
      
      console.log("INSIDE IF")
      ws.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected YAY');
  ws.on("message", message => {
    const messageObj = JSON.parse(message);

    const messageToBroadcast = {
      id: uuidv4(),
      content: messageObj.content,
      username: messageObj.username

    }
    console.log(JSON.stringify(messageToBroadcast))
    wss.broadcast(JSON.stringify(messageToBroadcast));
  })
 

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // ws.on('close', () => console.log('Client disconnected'));
});

// exampleSocket.onmessage = function (event) {
//   console.log(event.data);
// }