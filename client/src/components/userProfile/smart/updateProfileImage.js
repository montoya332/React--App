import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';

export default class DialogExampleSimple extends Component {

	onDrop = (acceptedFiles, rejectedFiles) => {
		console.log('Accepted files: ', acceptedFiles);
		console.log('Rejected files: ', rejectedFiles);
	}
	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary
				onTouchTap={this.props.onRequestClose}
			/>,
			<FlatButton
				label="Submit"
				primary
				keyboardFocused
				onTouchTap={this.props.onRequestClose}
			/>,
		];
		const cloudUploadStyle = {
			fontSize: '48px',
			width: '48px',
			height: '48px',
			color: '#757575'
		};
		return (
			<div>
				<Dialog
					title="Profile photo"
					actions={actions}
					modal={false}
					open={this.props.open}
					onRequestClose={this.props.onRequestClose}
				>
					<Dropzone className="dropZone__wrapper" onDrop={this.onDrop} >
						<div className="dropZone__content">
							<CloudUpload style={cloudUploadStyle} />
							<p>Drag and Drop a file here or click.</p>
						</div>
					</Dropzone>
				</Dialog>
			</div>
		);
	}
}
