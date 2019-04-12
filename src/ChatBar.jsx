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

    //Event handler that sends username and adds type of message up to App.jsx on enter
    onUsernameSubmit = (e) => {
      //On Enter
      if (e.keyCode === 13) {
        const usernameObj = {
          type: "notificationToServer",
          username: e.target.value
        }
        this.props.sendMessageToServer(usernameObj)
      }
    }
  
    //Event handler that sends message and adds type of message up to App.jsx on enter
    onMessageSubmit = (e) => {
      //On Enter
      if (e.keyCode === 13) {
        const messageObj = {
          type: "messageToServer",
          message: e.target.value
        }
        this.props.sendMessageToServer(messageObj)
        e.target.value = ""
      }
    }
}

export default ChatBar;