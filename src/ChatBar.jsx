import React, {Component} from 'react';

class ChatBar extends Component {
 
 
  onUsernameSubmit = (e) => {
    if (e.keyCode === 13) {
      const usernameObj = {
        type: "notificationToServer",
        username: e.target.value
      }
      this.props.sendMessageToServer(usernameObj)
    }
  }

  onMessageSubmit = (e) => {
    if (e.keyCode === 13) {
      const messageObj = {
        type: "messageToServer",
        message: e.target.value
      }
      this.props.sendMessageToServer(messageObj)
      e.target.value = ""
    }
  }

    render() {
  
      
      return (
        <footer className="chatbar">
        
        
            <input className="chatbar-username" defaultValue= {this.props.currentUser} onKeyDown = {this.onUsernameSubmit} placeholder="Your Name (Optional)" />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER " onKeyDown = {this.onMessageSubmit} />
           
      
        
        </footer>

      );
    }
  }

  export default ChatBar;