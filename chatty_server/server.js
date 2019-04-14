const express = require('express');
const WebSocket = require('ws');
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
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  const userCount = {
    type: "userCountChange",
    userCount: wss.clients.size
  };
  wss.broadcast(JSON.stringify(userCount));
  
  ws.on("message", message => {
    const data = JSON.parse(message);
    switch(data.type) {
      
      case "messageToServer":
      
      const messageToBroadcast = {
        type: "incomingMessage",
        id: uuidv4(),
        content: data.content,
        username: data.username
      };
      wss.broadcast(JSON.stringify(messageToBroadcast));
      break;
      
      case "notificationToServer":
      
      const usernameToBroadcast = {
        type: "incomingNotification",
        id: uuidv4(),
        content: data.content
      };
      wss.broadcast(JSON.stringify(usernameToBroadcast));
      break;
      
      default:
      throw new Error("Unknown event type " + data.type);

    } 
  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    const userCount = {
      type: "userCountChange",
      userCount: wss.clients.size
    };
    wss.broadcast(JSON.stringify(userCount));

    // At this point in time wss.clients no longer contains the ws object
    // of the client who disconnected
  });
  
});