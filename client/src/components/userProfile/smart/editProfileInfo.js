import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class EditProfileInfo extends Component {

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
					title="Edit Profile"
					actions={actions}
					modal={false}
					open={this.props.open}
					onRequestClose={this.props.onRequestClose}
				>
				<div>
					<TextField floatingLabelText="First Name" />
					<br />
					<br />
					<TextField floatingLabelText="Last Name" />
					<br />
				</div>
				</Dialog>
			</div>
		);
}
}