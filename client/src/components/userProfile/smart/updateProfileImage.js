import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone'
export default class DialogExampleSimple extends Component {

	onDrop = (acceptedFiles, rejectedFiles) => {
		console.log('Accepted files: ', acceptedFiles);
		console.log('Rejected files: ', rejectedFiles);
	}
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
					<Dropzone onDrop={this.onDrop}>
						<div>Try dropping some files here, or click to select files to upload.</div>
					</Dropzone>
				</Dialog>
			</div>
		);
}
}