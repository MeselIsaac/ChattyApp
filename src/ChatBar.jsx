import React, {Component} from 'react';

class ChatBar extends Component {
 
 


  onMessageSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.addMessage(e.target.value)
      e.target.value = ""
    }
  }

    render() {
      return (
        <footer className="chatbar">
        
            <input className="chatbar-username" defaultValue= {this.props.currentUser}  placeholder="Your Name (Optional)" />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER " onKeyDown = {this.onMessageSubmit} />
           
      
        
        </footer>

      );
    }
  }

  export default ChatBar;