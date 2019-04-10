import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    render() {

      const listMessages = this.props.messages.map(function(message) {
         return (<Message key = {message.id} message = {message}/>)
      }); 
        
        
      return (
        <div id= "messages-container">
        { listMessages }
        </div>
      );
    }
  }
  export default MessageList;





