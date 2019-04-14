import React, {Component} from 'react';

class ChatBar extends Component {
  
  render() {
    return (
    <footer className="chatbar">
      <input className="chatbar-username" defaultValue= {this.props.currentUser} onKeyDown = {this.onUsernameSubmit} placeholder="Your Name (Optional)" />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER " onKeyDown = {this.onMessageSubmit} />
    </footer>
    );
  }

//-------------------------------------------------------2 FUNCTIONS----------------------------------------------------------------------------

  
  //Event handler that sends username and adds type of message up to App.jsx on enter
  onUsernameSubmit = (event) => {
    if (event.key === "Enter") {
      const usernameObj = {
        type: "notificationToServer",
        username: event.target.value
      };
      this.props.sendMessageToServer(usernameObj)
    };
  };
  
  //Event handler that sends message and adds type of message up to App.jsx on enter and sets input field back to empty
  onMessageSubmit = (event) => {
    if (event.key === "Enter") {
      const messageObj = {
        type: "messageToServer",
        message: event.target.value
      };
      this.props.sendMessageToServer(messageObj)
      event.target.value = ""
    };
  };
}

export default ChatBar;