ChattyApp
=====================

A single-page-application (SPA) built with ReactJS, Webpack, Babel, Node.js, Web Sockets, and Express. Chatty allows users to communitcate with each other (without having to register for an account) in real-time. In addition to sending messages, users can also change their username through the chat-bar as many times as they like. The counter in the top-right corner of the app displays how many users are in the app at a given time. No persistent database is involved

!["ChattApp"] (https://github.com/MeselIsaac/react-simple-boilerplate/blob/master/Document/chatty-app.gif?raw=true)
### Usage
Clone the repo to your local machine. Install the dependencies and start the server.

1st server

```
npm install
npm start
open http://localhost:3000
```
2nd server

```
cd to `chatty_server`
npm install
npm start
open http://localhost:3000
```

### Dependencies

Root Dependencies 
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* React
* react-dom

Chatty-Server Dependencies
* express
* ws
* uuid

