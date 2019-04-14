import React, {Component} from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: {count: 0}
    };
  }

  componentDidMount() {
    //connecting react app to websocket
    this.socket = new WebSocket ("ws://localhost:3001");
    this.socket.onopen = () => {console.log("Connected");}

    //Receives and parses JSON data from server and sends to receiveData handler 
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.receiveDataFromServer(data);
    };
  }
  
  //HTML elements to be rendered
  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p id="userCount">USER COUNT: {this.state.userCount.count}</p>
      </nav>
        <MessageList messages  = {this.state.messages} />
        <ChatBar sendMessageToServer = {this.sendMessageToServer} currentUser = {this.state.currentUser.name} />
      </div>
    );
  };

//-------------------------------------------------------2 FUNCTIONS----------------------------------------------------------------------------
  /*Handler receives either a user created message or username and depending on the type constructs the appropriate object 
  and sends it to the server to be broadcast to all other clients. In the case of username the state is also set*/
  sendMessageToServer = (obj) => {
    switch(obj.type) {
      
      //bundles notification message into object, sends to server and sets state of currentUser to new username
      case "notificationToServer":
      this.setState({currentUser: {name: obj.username}});
      
      const notificationObj = {
        type: "notificationToServer",
        content: `User has change their name to ${obj.username}`
      };
      
      this.socket.send(JSON.stringify(notificationObj));
      break;
      
      //bundles message written by user into object and sends to server
      case "messageToServer":
      
      const messageObj = {
        type: "messageToServer",
        username: this.state.currentUser.name,
        content: obj.message
      };
      
      this.socket.send(JSON.stringify(messageObj));
      break;
      
      default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + data.type);
    };
  };
  
  /*Handler receives data broadcast from the server and depending on type of data sets the appropriate state*/
  receiveDataFromServer  = (data) => {
    switch(data.type) {
      // sets the state that counts the number of users on ChattyAp
      case "userCountChange":
      this.setState({userCount: {count: data.userCount}});
      break;
      
      //sets state of messages written by other users
      case "incomingMessage":
      const messages = this.state.messages.concat(data);
      this.setState({messages: messages});
      break;
      
      //sets state of notifications that other users changed their username
      case "incomingNotification":
      const notifications = this.state.messages.concat(data);
      this.setState({messages: notifications});
      break;
      
      default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + data.type);
    };
  };
};

export default App;