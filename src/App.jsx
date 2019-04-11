import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.addMessage = this.addMessage.bind(this);
    this.receiveMessageFromServer = this.receiveMessageFromServer.bind(this);
    this.addUser = this.addUser.bind(this);
  
  }

  addUser(username) {
    this.setState({currentUser: {name: username}})

  }

  addMessage(message) {
    const messageObj = {
      username: this.state.currentUser.name,
      content: message,
    }
    this.socket.send(JSON.stringify(messageObj));
    
  }

  receiveMessageFromServer (event) {
    const message = JSON.parse(event.data);
    const messages = this.state.messages.concat(message);
    this.setState({messages: messages})

  }
  

  componentDidMount() {
    //connecting react app to websocket
    this.socket = new WebSocket ("ws://localhost:3001");
    this.socket.onopen = () => console.log("Client connected here");
    this.socket.onmessage = this.receiveMessageFromServer;
    
    
    

  }
  
  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar addUser = {this.addUser} addMessage = {this.addMessage} currentUser = {this.state.currentUser.name} />
      </div>
     
    );
  }
}
export default App;
