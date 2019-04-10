import React, {Component} from 'react';

class Message extends Component {
    render() {
      return (
        <div>
            <main className="messages">
                <div className="message">
                     <span className="message-username">{this.props.message.username}</span>
                     <span className="message-content">{this.props.message.content}</span>
                </div>
                {/* <div className="message system">
                    Anonymous1 changed their name to nomnom.
                </div> */}
            </main>
        </div>
      );
    }
  }
  export default Message;