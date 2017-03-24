import React, { Component } from 'react';
import UserList from '../smart/UserList'
import MessageList from '../dumb/messageList'
import ComposeMessage from '../smart/messages'
export class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: []
    }
  }

  componentDidUpdate() {
    // Whenever something happened, scroll to the bottom of the chat window
    // const node = this.getDOMNode().querySelector('.chat');
    // node.scrollTop = node.scrollHeight - node.clientHeight;
  }

  componentDidMount() {
    const userService = app.service('users');
    const messageService = app.service('messages');

    // Find all users initially
    userService.find().then(page => this.setState({ users: page.data }));
    // Listen to new users so we can show them in real-time
    userService.on('created', user => this.setState({
      users: this.state.users.concat(user)
    }));

    // Find the last 10 messages
    messageService.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: this.props.limit || 10
      }
    }).then(page => this.setState({ messages: page.data.reverse() }));
    // Listen to newly created messages
    messageService.on('created', message => this.setState({
      messages: this.state.messages.concat(message)
    }));
  }

  render() {
    return <div className="flex flex-row flex-1 clear">
      <UserList users={this.state.users} />
      <div className="flex flex-column col col-9">
        <MessageList users={this.state.users} messages={this.state.messages} />
        <ComposeMessage />
      </div>
    </div>
  }
}

export default ChatApp;