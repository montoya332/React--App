import React, { Component } from 'react';
import Header from './header/index.js';

export default class App extends Component {
	render() {
		return (
			<div>
				<Header {...this.props} />
				<div className="application__content">
				{this.props.children}
				</div>
			</div>
		);
	}
}
