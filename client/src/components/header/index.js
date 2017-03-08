import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';


export default class Navigation extends Component {
	render() {
		return (
			<AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
		);
	}
}
