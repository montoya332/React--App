import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
export default class DialogExampleSimple extends Component {

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.props.onRequestClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.props.onRequestClose}
			/>,
		];

		return (
			<div>
				<Dialog
					title="Profile photo"
					actions={actions}
					modal={false}
					open={this.props.open}
					onRequestClose={this.props.onRequestClose}
				>
				The actions in this window were passed in as an array of React objects.
				</Dialog>
			</div>
		);
}
}