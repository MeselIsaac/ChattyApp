import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: {count: 0}
    };

    this.addMessage = this.addMessage.bind(this);
    // this.receiveMessageFromServer = this.receiveMessageFromServer.bind(this);
    this.addUser = this.addUser.bind(this);
  
  }

  addUser(username) {
    this.setState({currentUser: {name: username}})

    const usernameObj = {
      type: "postNotification",
      content: `User has change their name to ${username}`
    }
    this.socket.send(JSON.stringify(usernameObj))

  }

  addMessage(message) {
    const messageObj = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: message,
    }
    this.socket.send(JSON.stringify(messageObj));
    
  }

  receiveMessageFromServer  = (data) => {
    const message = data;
    const messages = this.state.messages.concat(message);
    this.setState({messages: messages})

  }

  receiveNotificationFromServer  = (data) => {
    const notification = data;
    const notifications = this.state.messages.concat(notification);
    this.setState({messages: notifications})

  }
  

  componentDidMount() {
    //connecting react app to websocket
    this.socket = new WebSocket ("ws://localhost:3001");
    this.socket.onopen = () => {console.log("Connected");
    }
    // this.socket.onmessage = this.receiveMessageFromServer;

    this.socket.onmessage = (event) => {
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      // console.log(event)
      const data = JSON.parse(event.data);
      switch(data.type) {

        case "userCountChange":


        
        this.setState({userCount: {count: data.userCount}})

        break;

        case "incomingMessage":
        this.receiveMessageFromServer(data);
          // handle incoming message
          break;
        case "incomingNotification":
        this.receiveNotificationFromServer(data);
        // handle incoming notification
        break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    };
  
    
    
    

  }
  
  render() {
    console.log(this.state)
   
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span>USER COUNT: {this.state.userCount.count}</span>
        </nav>
        <MessageList messages  = {this.state.messages} />
        <ChatBar addUser = {this.addUser} addMessage = {this.addMessage} currentUser = {this.state.currentUser.name} />
      </div>
     
    );
  }
}
export default App;
