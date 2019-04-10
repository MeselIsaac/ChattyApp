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

  componentDidMount() {
    //connecting react app to websocket
    this.socket = new WebSocket ("ws://localhost:3001");
    this.socket.onopen = () => {
    console.log("Client connected here");
   }

    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
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
