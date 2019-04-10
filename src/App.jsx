import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(message, username) {
    const messageObj = {
      username: this.state.currentUser.name,
      content: message,
      id: Math.random()
    }
    const messages = this.state.messages.concat(messageObj)
    this.setState({messages: messages})
    this.socket.send(JSON.stringify(messageObj));
  }

  receiveMessageFromServer(event) {
    const message = (JSON.parse(event.data));

    console.log(message)

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
        <ChatBar addMessage = {this.addMessage} currentUser= {this.state.currentUser.name} />
      </div>
     
    );
  }
}
export default App;
