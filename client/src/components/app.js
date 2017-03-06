import React, { Component } from 'react';
import Header from './header/index.js';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export default class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="application__content">
				{this.props.children}
				</div>
			</div>
		);
	}
}
