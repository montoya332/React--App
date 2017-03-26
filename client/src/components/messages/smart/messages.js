import React, { Component } from 'react';

export class ComposeMessage extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '' }
		this.sendMessage = this.sendMessage.bind(this)
		this.updateText = this.updateText.bind(this)

	}
	updateText(ev) {
		this.setState({ text: ev.target.value });
	}

	sendMessage(ev) {
		// Get the messages service
		const messageService = app.service('messages');
		// Create a new message with the text from the input field
		messageService.create({
			text: this.state.text
		}).then(() => this.setState({ text: '' }));

		ev.preventDefault();
	}

	render() {
		return (
			<form className="flex flex-row flex-space-between" onSubmit={this.sendMessage}>
				<input type="text" name="text" className="flex flex-1"
				value={this.state.text} onChange={this.updateText} />
				<button className="button button-primary" type="submit">Send</button>
			</form>
		)
	}
}

export default ComposeMessage;